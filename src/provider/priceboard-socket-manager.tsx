import { memo, useEffect, useRef } from "react";
import * as SocketIO from "socket.io-client";
import { Socket } from "socket.io-client";

import { convertMapToObject, convertObjectToMap, getLocalStorage, setLocalStorage } from "../utils";
import channels from "../utils/channels";
import { APP_CONSTANT, socketSubPath, socketURL } from "../utils/constant";
import type { KRXMDDSIDX } from "../utils/models/marketData";
import { usePriceboardSocketStore } from "./priceboard-socket-store";
import { flattenStockData } from "../interface/stock";

const io_1 = SocketIO.io;
const marketIndexMap: Map<string, any> = new Map();

const PriceboardSocketManager = () => {
  const socket_sv = useRef<Socket | null>(null);
  const token = getLocalStorage(APP_CONSTANT.ACCESS_TOKEN);
  const connectionFlag = useRef<boolean>(false);

  const setSocket = usePriceboardSocketStore((s) => s.setSocket);
  const setIndexList = usePriceboardSocketStore((s) => s.setIndexList);
  const setMarketData = usePriceboardSocketStore((s) => s.setMarketData);
  const setStockList = usePriceboardSocketStore((s) => s.setStockList);
  const setStockIndexData = usePriceboardSocketStore((s) => s.setStockIndexData);
  const reSubAllWhenReconnectMarket = usePriceboardSocketStore((s) => s.reSubAllWhenReconnectMarket);
  const setStock = usePriceboardSocketStore((s) => s.setStock);


  const handleSocketListener = (socket: Socket) => {
    socket.on("connect", () => {
      connectionFlag.current = true;
      setSocket(socket_sv.current);
      // * Reconnect lại các message bị miss
      reSubAllWhenReconnectMarket();
    });

    socket.on("connect_error", () => {
      connectionFlag.current = false;
      socket.disconnect();
      setSocket(socket_sv.current);
      setTimeout(initNewConnection, 1000);
    });

    socket.on("disconnect", () => {
      connectionFlag.current = false;
      setTimeout(initNewConnection, 1000);
    });

    socket.on(channels.onFOSStream, (data: any) => {
      if (!data || !data.topic) return;

      if (
        data.topic.includes("KRXMDDS|STKVER") ||
        data.topic.includes("KRXMDDS|IDX") ||
        data.topic.includes("KRXMDDS|IGS|") ||
        data.topic.includes("KRXMDDS|STKLST")
      ) {
        const currentMarketData = usePriceboardSocketStore.getState().marketData;
        const updatedMap = new Map(currentMarketData);
        updatedMap.set(data.topic, data);
        setMarketData(updatedMap);
        setLocalStorage(APP_CONSTANT.MARKET_DATA, JSON.stringify(convertMapToObject(updatedMap)));

        if (data.topic.includes("KRXMDDS|IDX")) {
          const _data = data.data as KRXMDDSIDX;
          const listIndex = _data["IDX"];
          for (let item of listIndex) {
            marketIndexMap.set(`${_data.t30001}|${item.t30167}`, item);
          }

          const indexList = listIndex.map((i) => ({
            indexCode: _data.t30001,
            code: i.t30167,
            nameVI: i.t30632,
            nameEN: i.t30633,
          }));

          setIndexList(indexList);
        }

        if (data.topic.includes("KRXMDDS|IGS|")) {
          const _stockData = {
            [data.data.t30001 + "|" + data.data.t30167]: data.data.STOCK,
          };
          setStockIndexData({
            ...usePriceboardSocketStore.getState().stockIndexData,
            ..._stockData,
          });
        }

        if (data.topic.includes("KRXMDDS|STKLST") && data?.STOCK?.length) {
          // Nếu bạn cần xử lý stockList ở đây, mở phần này ra
          // const _stockList = data.STOCK.map((item: any) => ({
          //   code: item.S,
          //   nameVI: item.N,
          // }));
          // setStockList(_stockList);
        }
      }

      if (data.topic.includes("KRXMDDS|SI|G1|") ||
        data.topic.includes("KRXMDDS|ST|G1|") ||
        // data.topic.includes("KRXMDDS|TP|G1|") ||
        data.topic.includes("KRXMDDS|MT|G1|") ||
        data.topic.includes("KRXMDDS|MD|G1|")) {
        const stockKey = data.topic.split("|").slice(-1)[0];
        setStock(stockKey, data.data)
      }

      if (data.topic.includes("KRXMDDS|TP|G1|")) {
        const stockKey = data.topic.split("|").slice(-1)[0];
        const dataTP = flattenStockData(data.data);
        setStock(stockKey, dataTP as any)
      }
    });
  };

  const initNewConnection = () => {
    if (connectionFlag.current) return;
    socket_sv.current = io_1(socketURL, {
      path: socketSubPath,
      secure: true,
      timeout: 2000,
      reconnection: false,
      transports: ["websocket"],
    });

    setSocket(socket_sv.current);
    handleSocketListener(socket_sv.current);
  };

  useEffect(() => {
    const marketDataLocalStr = getLocalStorage(APP_CONSTANT.MARKET_DATA);
    let marketDataLocal: { [key: string]: any } = {};
    try {
      marketDataLocal = JSON.parse(marketDataLocalStr ?? "{}");
    } catch (error) {
      console.error("Error parsing market data:", error);
    }

    const _indexList: any[] = [];
    Object.keys(marketDataLocal).forEach((key) => {
      if (key.includes("KRXMDDS|IDX")) {
        const _data = marketDataLocal[key]["data"] as KRXMDDSIDX;
        const listIndex = _data["IDX"];
        _indexList.push(
          ...listIndex.map((i) => ({
            indexCode: _data.t30001,
            code: i.t30167,
            nameVI: i.t30632,
            nameEN: i.t30633,
          }))
        );
        for (let item of listIndex) {
          marketIndexMap.set(`${_data.t30001}|${item.t30167}`, item);
        }
      }
    });

    setIndexList(_indexList);
    setMarketData(convertObjectToMap(marketDataLocal));
    initNewConnection();

    return () => {
      socket_sv.current?.disconnect();
      connectionFlag.current = false;
    };
  }, []);

  return null; // This component only sets up socket + Zustand, renders nothing
};

export default memo(PriceboardSocketManager);
