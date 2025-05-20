import { useContext } from 'react';
import { SocketContext } from '../provider/priceboard-socket';

export default function usePriceboardSocket() {
  const {
    socket,
    marketData,
    indexList,
    stockList,
    socketEmit,
    subscribeFunctWithControl,
  } = useContext(SocketContext);

  return {
    socket,
    marketData,
    indexList,
    stockList,
    socketEmit,
    subscribeFunctWithControl,
  }
}