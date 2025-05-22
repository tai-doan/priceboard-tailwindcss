import { useEffect, useRef } from 'react';

/**
 * @param value - The value to store in the ref object.
 * @returns previous value stored in ref object
 *
 * @example
 * const [state, setState] = useState(0);
 * const previousState = usePrevious(state);
 *
 * setState(1);
 * console.log(previousState); // 0
 *
 */
export default function usePrevious<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
