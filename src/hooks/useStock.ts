import { useEffect, useReducer } from 'react';
import type { StockData } from '../interface/stock';
import { usePriceboardSocketStore } from '../provider/priceboard-socket-store';

export const useStock = (symbol: string): StockData => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const unsubscribe = usePriceboardSocketStore.getState().subscribeToStock((changedSymbol) => {
      if (changedSymbol === symbol) {
        forceUpdate();
      }
    });

    return () => unsubscribe();
  }, [symbol]);

  return usePriceboardSocketStore.getState().getStock(symbol);
}
