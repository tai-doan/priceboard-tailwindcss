import React, { createContext, useEffect, useRef, type FC } from "react";
import * as SocketIO from "socket.io-client";
import { Socket } from "socket.io-client";
import { getLocalStorage } from "../utils";
import { APP_CONSTANT, socketSubPath, socketURL } from "../utils/constant";

// Khai báo số lượng socket cần xử lý
const io_1 = SocketIO.io;

// Khai báo các type sử dụng
type SocketContextProps = {
  socket: Socket | null;
  socketEmit?: (key: string, value: any) => void;
  subscribe?: (value: any) => void;
  unsubscribe?: (value: any) => void;
}

type PriceboardSocketProviderProps = {
  children: React.ReactNode;
}

const PriceboardSocketProvider: FC<PriceboardSocketProviderProps> = ({ children }) => {
  const token = getLocalStorage(APP_CONSTANT.ACCESS_TOKEN);
  const connectionFlag = useRef<boolean>(false);

  const socket = useRef<Socket | null>(null);

  const socketEmit = (channel: string, option: any) => {
    if (!socket.current) return;
    socket.current.emit(channel, JSON.stringify(option), (error: any) => {
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
      transports: ["websocket"],
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectionAttempts: 5,
    })
    socketStartListener(socket.current);
  }

  const socketStartListener = (socket: Socket) => {
    // Xử lý connect
    socket.on('connect', (...data: any[]) => {
      connectionFlag.current = true;
      console.log("Socket connection >> ", data);
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default PriceboardSocketProvider;

export const SocketContext = createContext<SocketContextProps>({ socket: null, });