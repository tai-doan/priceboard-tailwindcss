import { useEffect } from 'react';

type Callback = () => Promise<any>;

type Deps = readonly any[];

/**
 * Hook that wraps a callback function inside
 * useEffect hook, triggered everytime dependencies change
 * @param callback - The callback function to be executed.
 * @param deps - The dependencies of the callback function.
 *
 * @example
 * useAsyncEffect(async () => {
 *   const res = await fetch('https://api.example.com/id');
 *   const data = await res.json();
 *   console.log(data);
 * }, [id]);
 */
export default function useAsyncEffect(callback: Callback, deps: Deps = []) {
  useEffect(() => {
    callback().catch(e => console.log('useAsyncEffect error:', e));
  }, deps);
}
