import { useCallback, useEffect, useRef, useState } from 'react';

function useDebounce<T>(value: T, delay?: number): [boolean, T] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setIsDebouncing(false);
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [isDebouncing, debouncedValue];
}

export default useDebounce;

export const useDebounceCallback = (
  callback: (...args: any[]) => void,
  delay?: number,
  dependencies = <any>[]
) => {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const timeout = useRef<number>();

  return useCallback(
    (...args: any[]) => {
      const later = () => {
        clearTimeout(timeout.current);
        callback(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = window.setTimeout(later, delay);
    },
    [callback, delay, ...dependencies]
  );
};
