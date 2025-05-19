import React, { createContext, useEffect, useRef, type FC } from "react";
import * as SocketIO from "socket.io-client";
import { Socket } from "socket.io-client";
import { getLocalStorage } from "../utils";
import { APP_CONSTANT, socketSubPath, socketURL } from "../utils/constant";
import requestInfo from "../utils/models/requestInfo";

type CheckSubMapParams = {
  topic: string[];
  value: string[];
  component?: string;
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
  socketEmit?: (key: string, value: any) => void;
  subscribe?: (value: any) => void;
  unsubscribe?: (value: any) => void;
  checkSubMapBeforeSub?: ({ topic, value, component }: CheckSubMapParams) => CheckSubMapParams[];
  addNewSub?: ({ topic, value, component }: CheckSubMapParams) => void;
  clearTimeOutRequest?: (controlTimeOutKey: string) => void;
  controlTimeOutObj?: { [key: string]: any };
  removeSubInfoFromMap?: ({ topic, value, component }: CheckSubMapParams) => CheckSubMapParams[];
  setReqInfoMapValue?: (key: any, val: any) => void;
  getRqSeq?: () => void;
  subFunction?: ({ topic, value }: CheckSubMapParams) => void
}

type PriceboardSocketProviderProps = {
  children: React.ReactNode;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  checkSubMapBeforeSub: ({ }) => [],
  addNewSub: ({ }) => [],
  clearTimeOutRequest: () => { },
  controlTimeOutObj: {},
  removeSubInfoFromMap: ({ }) => [],
  setReqInfoMapValue: () => { },
  getRqSeq: () => null,
  subFunction: () => null,
});

const PriceboardSocketProvider: FC<PriceboardSocketProviderProps> = ({ children }) => {
  const token = getLocalStorage(APP_CONSTANT.ACCESS_TOKEN);
  const connectionFlag = useRef<boolean>(false);

  const socket = useRef<Socket | null>(null);

  const socketEmit = (channel: string, option: any) => {
    if (!socket.current) return;
    socket.current.emit(channel, option, (error: any) => {
      if (error) {
        console.error("SOCKET SUBSCRIBE: ", error?.toString() || error);
      }
    });
  }

  const subscribe = (option: any) => {
    if (!socket.current) return;
    socket.current.emit("subscribe", JSON.stringify(option), (error: any) => {
      if (error) {
        console.error("SUBSCRIBE: ", error?.toString() || error);
      }
    });
  }

  const unsubscribe = (option: any) => {
    if (!socket.current) return;
    socket.current.emit("unsubscribe", JSON.stringify(option), (error: any) => {
      if (error) {
        console.error("UNSUBSCRIBE: ", error?.toString() || error);
      }
    });
  }

  const intNewConnection = () => {
    if (!!connectionFlag.current) return;
    socket.current = io_1(socketURL, {
      path: socketSubPath,
      secure: true,
      timeout: 2000,
      reconnection: false,
      // transports: ["websocket"],
      // extraHeaders: {
      //   Authorization: `Bearer ${token}`,
      // },
      // reconnectionAttempts: 5,
    })
    socketStartListener(socket.current);
  }

  const socketStartListener = (socket: Socket) => {
    // Xử lý connect
    socket.on('connect', (...data: any[]) => {
      connectionFlag.current = true;
      console.log("Socket connection >> ", data);
      // * Reconnect lại các message bị miss
      reSubAllWhenReconnectMarket();
    })

    // Xử lý connection error
    socket.on('connect_error', (...data: any[]) => {
      connectionFlag.current = false;
      // Disconnect
      socket.disconnect();
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
    socket.on("SUB_RES", (data: any) => {
      console.log('SUB_RES', data)
      const { inputParam, onSuccess, onFailed, ...reqInfoMap } = getReqInfoMapValue(data.ClientSeq)
      if (data.Result === 1) {
        if (inputParam.topic.includes('MDDS|SI')) {
          setTimeout(() => {
            onSuccess(data)
          }, 100)
        } else {
          setTimeout(() => {
            onSuccess(data)
          }, 100)
        }
        // Clear timeoutSub khi sub thành công
        if (inputParam.topic) {
          clearTimeOutRequest(reqInfoMap.key)
        }
      } else {
        onFailed(data)
      }
    })

    // Xử lý unsubcribe để không nhận data
    socket.on("UNSUB_RES", (data: any) => {
      const { inputParam, onSuccess, onFailed } = getReqInfoMapValue(data.ClientSeq)
      onSuccess(data)
      // Clear timeoutSub khi unsub thành công
      if (inputParam.topic) {
        const controlTimeOutKey = 'UNSUB' + '|' + JSON.stringify(inputParam.topic) + '|' + JSON.stringify(inputParam.value)
        clearTimeOutRequest(controlTimeOutKey)
      }
    })

    // Xử lý data realtime trả về
    socket.on("onFOSStream", (data: any) => {

    })
  }

  const subFunction = ({ topic = [], value = [] }: CheckSubMapParams) => {
    const arraySubInfo = checkSubMapBeforeSub({ topic, value, component: "default" })
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
      const controlTimeOutKey = 'SUB|' + JSON.stringify(subInfo.topic) + '|' + JSON.stringify(subInfo.value)
      // Clear timeout của UNSUB tương đương khi SUB => tránh trường hợp UNSUB đang timeout mà SUB đã thành công => 10s sau UNSUB thành công => sai
      clearTimeOutRequest(String("UN" + controlTimeOutKey))
      /**
       * Nếu trước đó hàm Sub đang đợi phản hồi thì return
       *
       */
      if (controlTimeOutObj[controlTimeOutKey]) {
        console.log(
          '[sendSubStream] sendSubStream đang được xử lý, vui lòng đợi! Thông tin Sub: ',
          'SUB',
          subInfo
        )
        return
      }

      const clientSeq = getRqSeq();
      const msgObj2 = {
        ClientSeq: clientSeq,
        TransId: '123-abc',
        topic,
        value,
      }
      const reqInfo = new requestInfo('SUB_REQ', msgObj2, () => null, '', '', () => { }, () => { }, '')
      setReqInfoMapValue(clientSeq, reqInfo)
      socketEmit("SUB_REQ", msgObj2);

      // SetTimeout cho subcribeFunctStream
      controlTimeOutObj[controlTimeOutKey] = setTimeout(
        handleTimeOut,
        6000,
        () => { },
        controlTimeOutKey,
        'SUB',
        subInfo.topic,
        subInfo.value,
        'default',
      )
    })
  }

  const unSubFunction = ({ topic = [], value = [] }: CheckSubMapParams) => {
    // arrayUnsubInfo (không còn thằng nào SUB thì mới có data)
    const arrayUnsubInfo = removeSubInfoFromMap({ topic, value, component: 'default' })
    // console.log('arrayUnsubInfo', arrayUnsubInfo)
    arrayUnsubInfo.map((unsubInfo) => {
      // Generate key subscribe
      const controlTimeOutKey = 'UNSUB|' + JSON.stringify(unsubInfo.topic) + '|' + JSON.stringify(unsubInfo.value)
      // Clear timeout của SUB tương đương khi UNSUB => tránh trường hợp SUB đang timeout mà UNSUB đã thành công => sau 10s SUB lại => vô nghĩa
      clearTimeOutRequest(controlTimeOutKey.slice(2))
      /**
       * Nếu trước đó hàm Sub đang đợi phản hồi thì return
       *
       */
      if (controlTimeOutObj[controlTimeOutKey]) {
        console.log('[sendSubStream] sendSubStream đang được xử lý, vui lòng đợi! Thông tin Sub: ', 'UNSUB', unsubInfo)
        return
      }

      const clientSeq = getRqSeq();
      const msgObj2 = {
        ClientSeq: clientSeq,
        TransId: '123-abc',
        topic,
        value,
      }
      const reqInfo = new requestInfo('UNSUB_REQ', msgObj2, () => null, '', '', () => { }, () => { }, '')
      setReqInfoMapValue(clientSeq, reqInfo)

      // SetTimeout cho subcribeFunctStream
      controlTimeOutObj[controlTimeOutKey] = setTimeout(
        handleTimeOut,
        6000,
        () => { },
        controlTimeOutKey,
        'UNSUB',
        unsubInfo.topic,
        unsubInfo.value,
        'default',
      )
    })
  }

  const handleTimeOut = (
    Command: string,
    topic: string[],
    value: string[],
    controlTimeOutKey: string,
    onTimeout?: Function,
    fromseq?: string,
    size?: string,
    type?: string,
    component?: string,
  ) => {
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

  const clearReqInfoMapRequest = (clientSeq: number) => {
    setReqInfoMapValue(clientSeq, null)
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
     * TODO {Dung} Viết lại document
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
    const arrayUnsubInfo = []
    for (const [arrTopicAsKey, arrValue] of Object.entries(objWithTopicAsKey)) {
      arrayUnsubInfo.push({
        topic: JSON.parse(arrTopicAsKey),
        value: arrValue,
      })
    }
    arrayUnsubInfo.map((subInfo) => {
      // subcribeFunctStream({
      //   Command: 'SUB',
      //   topic: subInfo.topic,
      //   value: subInfo.value,
      // })
    })
  }

  useEffect(() => {
    if (!!connectionFlag.current) return;
    intNewConnection();
    return () => {
      socket.current!.disconnect();
      connectionFlag.current = false;
      socket.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current || null,
        socketEmit,
        subscribe,
        unsubscribe,
        checkSubMapBeforeSub,
        addNewSub,
        clearTimeOutRequest,
        controlTimeOutObj,
        removeSubInfoFromMap,
        setReqInfoMapValue,
        getRqSeq,
        subFunction,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default PriceboardSocketProvider;
