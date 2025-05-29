import { Socket } from "socket.io-client";
import { create } from "zustand";
import type { StockData } from "../interface/stock";
import channels from "../utils/channels";
import type { ISubInfo } from "../utils/models/subscribeInfo";
import SubscribeInfo from "../utils/models/subscribeInfo";

let controlTimeOutObj: { [key: string]: any } = {}
let subControlMap: { [key: string]: { [key: string]: string[] } } = {};
let reqSeq = 0;
const reqInfoMap = new Map();
// Lưu giữ socket để sử dụng gửi msg lên server
let _socket: any = null;

interface IStock {
  code: string;
  nameVI: string;
  nameEN?: string;
}

interface IIndex {
  indexCode: string;
  code: string;
  nameVI: string;
  nameEN?: string;
}

type CheckSubMapParams = {
  topic: string[];
  value: string[];
  component: string;
};

type PriceboardSocketState = {
  socket: Socket | null;
  marketData: Map<string, any>;
  indexList: IIndex[];
  stockList: IStock[];
  stockIndexData: Record<string, any>;

  setSocket: (socket: Socket | null) => void;
  setMarketData: (data: Map<string, any>) => void;
  setIndexList: (list: IIndex[]) => void;
  setStockList: (list: IStock[]) => void;
  setStockIndexData: (data: Record<string, any>) => void;
  subscribeFunctWithControl?: ({ }: ISubInfo) => void;
  reSubAllWhenReconnectMarket: () => void;

  stockMap: Map<string, StockData>;
  versionMap: Map<string, number>; // Giữ version/flag để thông báo cập nhật
  listeners: Set<(symbol: string) => void>;
  getStock: (symbol: string) => StockData | undefined;
  setStock(symbol: string, data: StockData): void;
  subscribeToStock(callback: (symbol: string) => void): () => void;
};

export const usePriceboardSocketStore = create<PriceboardSocketState>((set, get) => ({
  socket: null,
  marketData: new Map(),
  indexList: [],
  stockList: [],
  stockIndexData: {},

  setMarketData: (data) => set({ marketData: new Map(data) }),
  setIndexList: (list) => set({ indexList: [...list] }),
  setStockList: (list) => set({ stockList: [...list] }),
  setStockIndexData: (data) => set({ stockIndexData: { ...data } }),

  subscribeFunctWithControl: ({
    component,
    onTimeout,
    time = 6000,
    command,
    topic,
    value,
    onSuccess,
    onFailed,
  }: ISubInfo) => {
    /**
     * @param {String} controlTimeOutKey Là key giúp control biết SUB_REQ nào đang bị timeout
     */
    /**
     */
    /**
     * Kiểm tra các trường hợp SUB|UNSUB|GET_HIST và tiến hành
     * Control Timeout, Thông tin sub khác nhau
     */
    if (command === 'SUB') {
      const arraySubInfo = checkSubMapBeforeSub({ topic, value, component })
      console.log('Chuẩn bị Sub:', arraySubInfo)
      arraySubInfo.map((subInfo) => {
        if (subInfo['value'].length === 0 && subInfo['topic'].length === 0) return
        // if (subInfo['topic'].length === 0) return
        // Add info to subcontrol
        addNewSub({
          topic: subInfo['topic'],
          value: subInfo['value'],
          component: subInfo['component'],
        })
        console.log("sau khi addNewSub-> subControlMap: ", subControlMap);
        // Generate key subscribe
        const controlTimeOutKey = String(command) + '|' + JSON.stringify(subInfo.topic) + '|' + JSON.stringify(subInfo.value)
        // Clear timeout của UNSUB tương đương khi SUB => tránh trường hợp UNSUB đang timeout mà SUB đã thành công => 10s sau UNSUB thành công => sai
        clearTimeOutRequest(String("UN" + controlTimeOutKey))
        /**
         * Nếu trước đó hàm Sub đang đợi phản hồi thì return
         *
         */
        if (controlTimeOutObj[controlTimeOutKey]) {
          console.log('[sendSubStream] sendSubStream đang được xử lý, vui lòng đợi! Thông tin Sub: ', command, subInfo,)
          return
        }
        // Send subscribe
        subcribeFunctStream({
          command,
          topic: subInfo.topic,
          value: subInfo.value,
          onSuccess,
          onFailed,
        })
        // SetTimeout cho subcribeFunctStream
        controlTimeOutObj[controlTimeOutKey] = setTimeout(
          handleTimeOut,
          time,
          onTimeout,
          controlTimeOutKey,
          subInfo.topic,
          subInfo.value,
          subInfo.component,
        )
      })
    }
    if (command === 'UNSUB') {
      // arrayUnsubInfo (không còn thằng nào SUB thì mới có data)
      const arrayUnsubInfo = removeSubInfoFromMap({ topic, value, component })
      arrayUnsubInfo.map((unsubInfo) => {
        // Generate key subscribe
        const controlTimeOutKey = String(command) + '|' + JSON.stringify(unsubInfo.topic) + '|' + JSON.stringify(unsubInfo.value)
        // Clear timeout của SUB tương đương khi UNSUB => tránh trường hợp SUB đang timeout mà UNSUB đã thành công => sau 10s SUB lại => vô nghĩa
        clearTimeOutRequest(controlTimeOutKey.slice(2))
        /**
         * Nếu trước đó hàm Sub đang đợi phản hồi thì return
         *
         */
        if (controlTimeOutObj[controlTimeOutKey]) {
          console.log(
            '[sendSubStream] sendSubStream đang được xử lý, vui lòng đợi! Thông tin Sub: ',
            command,
            unsubInfo
          )
          return
        }
        // Send subscribe
        subcribeFunctStream({
          command,
          topic: unsubInfo.topic,
          value: unsubInfo.value,
          onSuccess,
          onFailed,
        })
        // SetTimeout cho subcribeFunctStream
        controlTimeOutObj[controlTimeOutKey] = setTimeout(
          handleTimeOut,
          time,
          onTimeout,
          controlTimeOutKey,
          unsubInfo.topic,
          unsubInfo.value,
          unsubInfo.component,
        )
      })
    }
    if (command === 'GET_HIST') {
      //
    }
  },
  reSubAllWhenReconnectMarket: () => {
    const currSubMap = { ...subControlMap }
    const objWithTopicAsKey: { [key: string]: any } = {}
    for (const [key, objTopic] of Object.entries(currSubMap)) {
      const keyNewObj = JSON.stringify(Object.keys(objTopic)) // Array
      if (objWithTopicAsKey.hasOwnProperty(keyNewObj)) {
        objWithTopicAsKey[keyNewObj].push(key)
      } else {
        objWithTopicAsKey[keyNewObj] = [key]
      }
    }
    for (const [arrTopicAsKey, arrValue] of Object.entries(objWithTopicAsKey)) {
      subcribeFunctStream({
        command: 'SUB',
        topic: JSON.parse(arrTopicAsKey),
        value: arrValue,
        onFailed: () => null,
        onSuccess: () => null,
      })
    }
  },

  stockMap: new Map(),
  versionMap: new Map(),
  listeners: new Set(),
  getStock: (symbol: string) => get().stockMap.get(symbol),
  setStock: (symbol, data) => {
    const { stockMap, versionMap, listeners } = get();
    // update stock data
    stockMap.set(symbol, data);
    // update version
    versionMap.set(symbol, Date.now());
    // notify listeners
    listeners.forEach((cb) => cb(symbol));
  },
  subscribeToStock: (cb) => {
    const listeners = get().listeners;
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
  setSocket: (socket) => {
    _socket = socket;
    set({ socket })
  },
}));

const clearTimeOutRequest = (controlTimeOutKey: string) => {
  console.log("clearTimeOutRequest: ", controlTimeOutKey);

  if (controlTimeOutObj[controlTimeOutKey]) clearTimeout(controlTimeOutObj[controlTimeOutKey])
  controlTimeOutObj[controlTimeOutKey] = null;
  return
}

export const setReqInfoMapValue = (key: any = 0, val: any = {}): void => {
  reqInfoMap.set(key, val)
}

export const getReqInfoMapValue = (key: string) => {
  return reqInfoMap.get(key)
}

const checkSubMapBeforeSub = ({ topic, value, component }: CheckSubMapParams) => {
  if (!Array.isArray(value) || !Array.isArray(value) || typeof component !== 'string') {
    console.warn('Kiểu dữ liệu không đúng checkSubMapBeforeSub:', topic, value, component)
    return []
  }
  /**
   * @returns Mảng thông tin SUB (value, topic, component)
   *
   * @var {Object} diffResultObject Object có key là Mã CK/Mã Index, value là Object valueOfValAsKey (key: topic, value: component)
   */
  const diffResultObject: { [key: string]: any } = {}
  value.map((val) => {
    // Mỗi value tương ứng với một key
    if (subControlMap.hasOwnProperty(val)) {
      // Nếu đã tồn tại key thì xét tiếp topic
      const valueOfValAsKey: { [key: string]: string[] } = {}
      topic.map((t) => {
        if (subControlMap[val].hasOwnProperty(t)) {

          // Nếu tại Value Sub đã tồn tại topic thì kiểm tra
          // Nếu đã tồn tại component rồi thì bỏ qua
          // Nếu chưa thì push component mới vào, rồi thì bỏ qua
          const topicArrComponent = subControlMap[val][t] || []
          if (!topicArrComponent.includes(component)) {
            if (topicArrComponent.length === 0) {
              valueOfValAsKey[t] = [component]
            } else {
              valueOfValAsKey[t] = [...topicArrComponent, component]
              subControlMap[val][t] = [...topicArrComponent, component]
            }
            // Nếu chưa tồn tại component push compon
          }
        } else {
          // Nếu tại Value Sub chưa tồn tại topic thì tạo topic
          // Và thêm component
          valueOfValAsKey[t] = [component]
        }
      })
      diffResultObject[val] = { ...valueOfValAsKey }
    } else {
      // Chưa tồn tại key đang xét
      const valueOfValAsKey: { [key: string]: string[] } = {}
      topic.map((t) => {
        // Push/Set value vào object mới
        valueOfValAsKey[t] = [component]
      })
      diffResultObject[val] = { ...valueOfValAsKey }
    }
  })
  const objWithTopicAsKey: { [key: string]: string[] } = {}
  for (const [key, objTopic] of Object.entries(diffResultObject)) {
    const keyNewObj = JSON.stringify(Object.keys(objTopic)) // Array
    if (objWithTopicAsKey.hasOwnProperty(keyNewObj)) {
      objWithTopicAsKey[keyNewObj].push(key)
    } else {
      objWithTopicAsKey[keyNewObj] = [key]
    }
  }
  const arraySubInfo = []
  for (const [arrTopicAsKey, arrValue] of Object.entries(objWithTopicAsKey)) {
    arraySubInfo.push({
      topic: JSON.parse(arrTopicAsKey),
      value: arrValue,
      component: component,
    })
  }
  return arraySubInfo
}

const addNewSub = ({ topic, value, component }: CheckSubMapParams) => {
  console.log("addNewSub ", topic, value, component);

  if (!Array.isArray(value) || !Array.isArray(value) || typeof component !== 'string') {
    console.warn('Kiểu dữ liệu không đúng addNewSub:', topic, value, component)
    return
  }
  value.map((val) => {
    if (subControlMap.hasOwnProperty(val)) {
      topic.map((t) => {
        if (subControlMap[val].hasOwnProperty(t)) {
          subControlMap[val][t].concat([component])
        } else {
          subControlMap[val][t] = [component]
        }
      })
    } else {
      // Nếu chưa tồn tại key
      subControlMap[val] = {}
      topic.map((t) => {
        Object.defineProperty(subControlMap[val], t, {
          value: [component],
          configurable: true,
          writable: true,
          enumerable: true,
        })
      })
    }
  })
  console.log("addNewSub done ", subControlMap);
}

const removeSubInfoFromMap = ({ topic, value, component }: CheckSubMapParams) => {
  if (!Array.isArray(value) || !Array.isArray(value) || typeof (component) !== 'string') {
    console.warn('Kiểu dữ liệu không đúng removeSubInfoFromMap:', topic, value, component)
    return []
  }

  /**
   * @returns Mảng thông tin UNSUB (value, topic, component)
   *
   * @var {Object} diffResultObject Object có key là Mã CK/Mã Index, value là Object valueOfValAsKey (key: topic, value: component)
   */
  const diffResultObject: { [key: string]: any } = {}

  value.map((val) => {
    if (subControlMap.hasOwnProperty(val)) {
      // Nếu đã tồn tại key thì xét tiếp topic
      const valueOfValAsKey: { [key: string]: string[] } = {}
      topic.map((t) => {
        if (subControlMap[val]?.hasOwnProperty(t)) {
          const arrCpnOfTopic = subControlMap[val][t]
          if (arrCpnOfTopic.includes(component)) {
            // Nếu tồn tại component thì mới push vào để tí nữa UNSUB
            // Xong thì remove component đó đi
            const removed = arrCpnOfTopic.filter((cpn) => cpn !== component)
            if (removed.length === 0) {
              // Nếu không còn component nào dùng nữa thì mới UNSUB
              valueOfValAsKey[t] = [component]
              delete subControlMap[val][t]
              if (Object.keys(subControlMap[val]).length === 0) {
                delete subControlMap[val]
              }
            } else {
              subControlMap[val][t] = removed
            }
          }
        }
      })
      diffResultObject[val] = { ...valueOfValAsKey }
    }
  })
  const objWithTopicAsKey: { [key: string]: any[] } = {}
  for (const [key, objTopic] of Object.entries(diffResultObject)) {
    const keyNewObj = JSON.stringify(Object.keys(objTopic)) // Array
    if (objWithTopicAsKey.hasOwnProperty(keyNewObj)) {
      objWithTopicAsKey[keyNewObj].push(key)
    } else {
      objWithTopicAsKey[keyNewObj] = [key]
    }
  }
  const arrayUnsubInfo = []
  for (const [arrTopicAsKey, arrValue] of Object.entries(objWithTopicAsKey)) {
    let topic = JSON.parse(arrTopicAsKey)
    if (arrValue.length === 0 && topic.length === 0) {
      // Không làm gì
    } else {
      arrayUnsubInfo.push({
        topic: topic,
        value: arrValue,
        component: component,
      })
    }
  }
  return arrayUnsubInfo
}

const getRqSeq = () => {
  return ++reqSeq;
}

const subcribeFunctStream = ({
  command = '',
  topic = [],
  value = [],
  onSuccess = () => null,
  onFailed = () => null,
}: {
  command: 'SUB' | 'UNSUB' | 'GET_HIST' | ''
  topic: string[]
  value: string[]
  fromseq?: string
  size?: number[]
  type?: string
  onSuccess?: Function
  onFailed?: Function
  key?: string
}) => {
  if (command === 'SUB') {
    const clientSeq = getRqSeq()
    const msgObj2 = {
      ClientSeq: clientSeq,
      TransId: '123-abc',
      topic,
      value,
    }
    const constrolTimeoutKey = 'SUB' + '|' + JSON.stringify(topic) + '|' + JSON.stringify(value);
    const reqInfo = new SubscribeInfo('SUBSCRIBE_INFO', onSuccess, onFailed, topic, value, constrolTimeoutKey)

    setReqInfoMapValue(clientSeq, reqInfo)
    send2Sv(channels.SUB_REQ, msgObj2)
  }
  if (command === 'UNSUB') {
    const clientSeq = getRqSeq()
    const msgObj2 = {
      ClientSeq: clientSeq,
      TransId: '123-abc',
      topic,
      value,
    }
    const constrolTimeoutKey = 'UNSUB' + '|' + JSON.stringify(topic) + '|' + JSON.stringify(value);
    const reqInfo = new SubscribeInfo('UNSUBSCRIBE_INFO', onSuccess, onFailed, topic, value, constrolTimeoutKey)
    setReqInfoMapValue(clientSeq, reqInfo)
    send2Sv(channels.UNSUB_REQ, msgObj2)
  }
  if (command === 'GET_HIST') {
  }
}

const send2Sv = (key: string, message: any) => {
  if (_socket?.connected) {
    console.log('send2Sv', key, message)
    _socket.emit(key, message);
    console.log('send2Sv after emit', key, message)
  } else {
    console.warn("socket chưa được connect đến server ", key, message);
  }
}

const handleTimeOut = (onTimeout: Function, controlTimeOutKey: string, topic: string[], value: string[], component: string) => {
  console.log('subcribeFunctStream bị timeout: ', controlTimeOutKey)
  removeSubInfoFromMap({ topic, value, component })
  clearTimeOutRequest(controlTimeOutKey)
  // Xử lý time out cho từng subcribeFunctStream nếu có
  onTimeout && onTimeout({ type: 'timeout', controlTimeOutKey })
};