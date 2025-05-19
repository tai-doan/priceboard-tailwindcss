import { useContext } from 'react';
import { SocketContext } from '../provider/priceboard-socket';

export default function usePriceboardSocket() {
  const {
    socket,
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
  } = useContext(SocketContext);

  return {
    socket,
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
  }
}