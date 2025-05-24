import React, { createContext, useEffect, useRef, useState, type FC } from "react";
import * as SocketIO from "socket.io-client";
import { Socket } from "socket.io-client";
import { convertMapToObject, convertObjectToMap, getLocalStorage, setLocalStorage } from "../utils";
import channels from "../utils/channels";
import { APP_CONSTANT, socketSubPath, socketURL } from "../utils/constant";
import type { KRXMDDSIDX } from "../utils/models/marketData";
import SubscribeInfo, { type ISubInfo } from "../utils/models/subscribeInfo";

type CheckSubMapParams = {
  topic: string[];
  value: string[];
  component: string;
};

// Khai báo số lượng socket cần xử lý
const io_1 = SocketIO.io;

let controlTimeOutObj: { [key: string]: any } = {}
let subControlMap: { [key: string]: { [key: string]: string[] } } = {};
let reqSeq = 0;
const reqInfoMap = new Map();

// Khai báo các type sử dụng
type SocketContextProps = {
  socket: Socket | null;
  marketData: Map<string, any>,
  indexList: IIndex[],
  stockList: IStock[],
  socketEmit?: (key: string, value: any) => void;
  subscribeFunctWithControl?: ({ }: ISubInfo) => void,
  stockIndexData: {},
}

type PriceboardSocketProviderProps = {
  children: React.ReactNode;
}

interface IStock {
  code: string;
  nameVI: string;
  nameEN?: string;
}

interface IIndex {
  indexCode: string; // Code của sàn chính STO, TSX, UPX
  code: string; // Code định danh
  nameVI: string; // Tên tiếng việt
  nameEN?: string; // Tên tiếng anh
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  marketData: new Map(),
  indexList: [],
  stockList: [],
  stockIndexData: {},
});

const PriceboardSocketProvider: FC<PriceboardSocketProviderProps> = ({ children }) => {
  const token = getLocalStorage(APP_CONSTANT.ACCESS_TOKEN);
  const connectionFlag = useRef<boolean>(false);

  const [socketState, setSocketState] = useState<Socket | null>(null);

  const socket_sv = useRef<Socket | null>(null);

  // Chứa danh sách các thông tin data của sàn, mã chứng khoán, mã trong sàn,...
  // key là các topic subscribe - value là giá trị server trả
  let marketData: Map<string, any> = new Map();
  const marketIndexMap: Map<string, any> = new Map();

  // Danh sách tất cả các sàn có trên thị trường
  const [indexList, setIndexList] = useState<IIndex[]>([]);
  // Danh sách các mã chứng khoán có trên thị trường
  const [stockList, setStockList] = useState<IStock[]>([]);
  const [stockIndexData, setStockIndexData] = useState({});

  const socketEmit = (channel: string, option: any) => {
    if (!socket_sv.current) return;
    socket_sv.current.emit(channel, option, (error: any) => {
      if (error) {
        console.error("SOCKET SUBSCRIBE: ", error?.toString() || error);
      }
    });
  }

  const intNewConnection = () => {
    if (!!connectionFlag.current) return;
    socket_sv.current = io_1(socketURL, {
      path: socketSubPath,
      secure: true,
      timeout: 2000,
      reconnection: false,
      transports: ["websocket"],
      // extraHeaders: {
      //   Authorization: `Bearer ${token}`,
      // },
      // reconnectionAttempts: 5,
    })
    // Cập nhật state socket khi có kết nối mới
    setSocketState(socket_sv.current);
    handleSocketListener(socket_sv.current);
  }

  const handleSocketListener = (socket: Socket) => {
    // Xử lý connect
    socket.on('connect', () => {
      connectionFlag.current = true;
      console.log("Socket connection >> ", socket_sv.current);
      // * Reconnect lại các message bị miss
      reSubAllWhenReconnectMarket();
      // Cập nhật state socket khi kết nối thành công
      setSocketState(socket_sv.current);
    })

    // Xử lý connection error
    socket.on('connect_error', (...data: any[]) => {
      connectionFlag.current = false;
      // Disconnect
      socket.disconnect();
      // Cập nhật state socket khi kết nối thành công
      setSocketState(socket_sv.current);
      console.log("Socket connect_error >> ", data);
      setTimeout(intNewConnection, 1000);
    })

    // Xử lý connection disconnect
    socket.on('disconnect', (...data: any[]) => {
      connectionFlag.current = false;
      console.log("Socket disconnect >> ", data);
      setTimeout(intNewConnection, 1000);
    })

    // Xử lý subcribe để lấy data mới
    socket.on(channels.SUB_RES, (data: any) => {
      // console.log('SUB_RES', data)
      const { onSuccess, onFailed, ...reqMap } = getReqInfoMapValue(data.ClientSeq)
      console.log('SUB_RES reqMap', reqMap)
      if (data.Result === 1) {
        setTimeout(() => {
          onSuccess(data)
        }, 100)
        if (reqMap.controlTimeOutKey.includes("KRXMDDS|IDX")) {
          const data = convertMapToObject(marketData)
          let _indexList: IIndex[] = []
          Object.keys(data).forEach(key => {
            if (key.includes("KRXMDDS|IDX")) {
              const _data = data[key]['data'] as KRXMDDSIDX;
              const listIndex = _data['IDX'];
              _indexList = _indexList.concat(listIndex.map((i) => ({
                indexCode: _data.t30001,
                code: i.t30167,
                nameVI: i.t30632,
                nameEN: i.t30633,
              })))
              for (let i = 0; i < listIndex.length; i++) {
                const item = listIndex[i];
                marketIndexMap.set(`${_data.t30001}|${item.t30167}`, item);
              }
            }
          });
          setIndexList(_indexList);
        }
        // if (reqMap.topic.includes('MDDS|SI')) {
        //   setTimeout(() => {
        //     onSuccess(data)
        //   }, 100)
        // } else {
        //   setTimeout(() => {
        //     onSuccess(data)
        //   }, 100)
        // }
        // Clear timeoutSub khi sub thành công
        if (reqMap.topic) {
          clearTimeOutRequest(reqMap.controlTimeOutKey)
        }
      } else {
        onFailed(data)
      }
    })

    // Xử lý unsubcribe để không nhận data
    socket.on(channels.UNSUB_RES, (data: any) => {
      const { onSuccess, onFailed, ...reqInfoMap } = getReqInfoMapValue(data.ClientSeq)
      onSuccess(data)
      // Clear timeoutSub khi unsub thành công
      if (reqInfoMap.topic) {
        const controlTimeOutKey = 'UNSUB' + '|' + JSON.stringify(reqInfoMap.topic) + '|' + JSON.stringify(reqInfoMap.value)
        clearTimeOutRequest(controlTimeOutKey)
      }
    })

    // Xử lý data realtime trả về
    socket.on(channels.onFOSStream, (data: any) => {
      if (!data || !data.topic) return

      if (
        data.topic.includes("KRXMDDS|STKVER") ||
        data.topic.includes("KRXMDDS|IDX") ||
        data.topic.includes("KRXMDDS|IGS|") || // Danh sách mã chứng khoán của sàn
        data.topic.includes("KRXMDDS|STKLST")
      ) {
        // Cache lại data dữ liệu để tái sử dụng
        marketData.set(data.topic, data);
        setLocalStorage(APP_CONSTANT.MARKET_DATA, JSON.stringify(convertMapToObject(marketData)));
        console.log("marketData: ", marketData);

        if (data.topic.includes("KRXMDDS|IDX")) {
          const _data = data.data as KRXMDDSIDX;
          const listIndex = _data['IDX'];
          for (let i = 0; i < listIndex.length; i++) {
            const item = listIndex[i];
            marketIndexMap.set(`${_data.t30001}|${item.t30167}`, item);
          }
        }

        if (data.topic.includes("KRXMDDS|IGS|")) {
          const _stockData = {
            [data.data.t30001 + "|" + data.data.t30167]: data.data.STOCK
          }
          setStockIndexData({ ...stockIndexData, _stockData })
        }

        if (data.topic.includes("KRXMDDS|STKLST") && data?.STOCK?.length) {
          // const _stockList: IStock[] = data.STOCK.map((item: any) => ({
          //   code: item.S,
          //   nameVI: item.N,
          // }))
          // setStockList(_stockList);
        }
      }
    })
  }

  const handleTimeOut = (onTimeout: Function, controlTimeOutKey: string, Command: string, topic: string[], value: string[], fromseq: any, size: number[], type: any, component: string) => {
    console.log('subcribeFunctStream bị timeout: ', controlTimeOutKey)
    console.log(Command, topic, value, fromseq, size, type)
    removeSubInfoFromMap({ topic, value, component })
    clearTimeOutRequest(controlTimeOutKey)
    // Xử lý time out cho từng subcribeFunctStream nếu có
    onTimeout && onTimeout({ type: 'timeout', controlTimeOutKey })
  }

  const getRqSeq = () => {
    return ++reqSeq;
  }

  const clearTimeOutRequest = (controlTimeOutKey: string) => {
    if (controlTimeOutObj[controlTimeOutKey]) clearTimeout(controlTimeOutObj[controlTimeOutKey])
    controlTimeOutObj[controlTimeOutKey] = null;
    return
  }

  const setReqInfoMapValue = (key: any = 0, val: any = {}): void => {
    reqInfoMap.set(key, val)
  }

  const getReqInfoMapValue = (key: string) => {
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
      if (arrValue.length === 0 || topic.length === 0) {
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

  const subscribeFunctWithControl = ({
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
    let controlTimeOutKey = ''
    /**
     * Kiểm tra các trường hợp SUB|UNSUB|GET_HIST và tiến hành
     * Control Timeout, Thông tin sub khác nhau
     */
    if (command === 'SUB') {
      const arraySubInfo = checkSubMapBeforeSub({ topic, value, component })
      console.log('Chuẩn bị Sub:', arraySubInfo)
      arraySubInfo.map((subInfo) => {
        if (subInfo['value'].length === 0) return
        if (subInfo['topic'].length === 0) return
        // Add info to subcontrol
        addNewSub({
          topic: subInfo['topic'],
          value: subInfo['value'],
          component: subInfo['component'],
        })
        // Generate key subscribe
        controlTimeOutKey = String(command) + '|' + JSON.stringify(subInfo.topic) + '|' + JSON.stringify(subInfo.value)
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
          key: controlTimeOutKey,
        })
        // SetTimeout cho subcribeFunctStream
        controlTimeOutObj[controlTimeOutKey] = setTimeout(
          handleTimeOut,
          time,
          onTimeout,
          controlTimeOutKey,
          command,
          subInfo.topic,
          subInfo.value,
          component,
        )
      })
    }
    if (command === 'UNSUB') {
      // arrayUnsubInfo (không còn thằng nào SUB thì mới có data)
      const arrayUnsubInfo = removeSubInfoFromMap({ topic, value, component })
      arrayUnsubInfo.map((unsubInfo) => {
        // Generate key subscribe
        controlTimeOutKey = String(command) + '|' + JSON.stringify(unsubInfo.topic) + '|' + JSON.stringify(unsubInfo.value)
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
          key: controlTimeOutKey,
        })
        // SetTimeout cho subcribeFunctStream
        controlTimeOutObj[controlTimeOutKey] = setTimeout(
          handleTimeOut,
          time,
          onTimeout,
          controlTimeOutKey,
          command,
          unsubInfo.topic,
          unsubInfo.value,
          component,
        )
      })
    }
    if (command === 'GET_HIST') {
      //
    }
  }

  const subcribeFunctStream = ({
    command = '',
    topic = [],
    value = [],
    fromseq = '',
    size = [0],
    type = '',
    onSuccess = () => null,
    onFailed = () => null,
    key,
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
    if (socket_sv.current?.connected) {
      console.log('send2Sv', key, message)
      socket_sv.current.emit(key, message);
      console.log('send2Sv after emit', key, message)
    }
  }

  const reSubAllWhenReconnectMarket = () => {
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
      })
    }
  }

  useEffect(() => {
    const marketDataLocalStr = getLocalStorage(APP_CONSTANT.MARKET_DATA);
    let marketDataLocal: { [key: string]: any } = {};
    try {
      marketDataLocal = JSON.parse(marketDataLocalStr ?? "{}");
    } catch (error) {
      console.error("Error parsing market data:", error);
    }
    let _indexList: IIndex[] = []
    Object.keys(marketDataLocal).forEach(key => {
      if (key.includes("KRXMDDS|IDX")) {
        // Lấy từ local để gán vào marketIndexMap
        const _data = marketDataLocal[key]['data'] as KRXMDDSIDX;
        const listIndex = _data['IDX'];
        _indexList = _indexList.concat(listIndex.map((i) => ({
          indexCode: _data.t30001,
          code: i.t30167,
          nameVI: i.t30632,
          nameEN: i.t30633,
        })))
        for (let i = 0; i < listIndex.length; i++) {
          const item = listIndex[i];
          marketIndexMap.set(`${_data.t30001}|${item.t30167}`, item);
        }
      }
    });
    console.log("_indexList ", _indexList);
    setIndexList(_indexList);

    marketData = convertObjectToMap(marketDataLocal);
    intNewConnection();
    return () => {
      socket_sv.current?.disconnect();
      connectionFlag.current = false;
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketState || null,
        marketData: marketData,
        indexList: indexList,
        stockList: stockList,
        socketEmit,
        subscribeFunctWithControl,
        stockIndexData,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default PriceboardSocketProvider;
