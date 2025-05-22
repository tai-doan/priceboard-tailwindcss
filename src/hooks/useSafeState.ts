
import { useEffect, useRef, useState } from "react";

/**
 * Function tương tự useState của React tuy nhiên nó sẽ setState chỉ khi component chỉ đã mounted
 * @param initialState - The initial state of the component.
 * @returns A tuple containing the current state and a function to update it.
 *
 * @example
 * const [state, setState] = useSafeState(0);
 * setState(1);
 */

export default function useSafeState<T>(initialState: T): [T, (args: T) => void] {
  const mountedRef = useRef(false);
  const [state, setStateCurrent] = useState<T>(initialState);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setState = (args: T) => {
    if (mountedRef.current) {
      setStateCurrent(args);
    }
  };

  return [state, setState];
}
