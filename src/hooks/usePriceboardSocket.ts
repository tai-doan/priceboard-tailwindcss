import { useContext } from 'react';
import { SocketContext } from '../provider/priceboard-socket';

export default function usePriceboardSocket() {
  const { socket, socketEmit, subscribe, unsubscribe } = useContext(SocketContext);

  return { socket, socketEmit, subscribe, unsubscribe }
}