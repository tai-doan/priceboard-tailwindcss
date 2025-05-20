import { useContext } from 'react';
import { SocketContext } from '../provider/priceboard-socket';

export default function usePriceboardSocket() {
  const {
    socket,
    marketData,
    socketEmit,
    subscribeFunctWithControl,
  } = useContext(SocketContext);

  return {
    socket,
    marketData,
    socketEmit,
    subscribeFunctWithControl,
  }
}