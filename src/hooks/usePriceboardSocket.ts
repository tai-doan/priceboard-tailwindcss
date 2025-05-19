import { useContext } from 'react';
import { SocketContext } from '../provider/priceboard-socket';

export default function usePriceboardSocket() {
  const {
    socket,
    socketEmit,
    subscribeFunctWithControl,
  } = useContext(SocketContext);

  return {
    socket,
    socketEmit,
    subscribeFunctWithControl,
  }
}