import { useEffect, useState } from 'react';

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

const useFuncDebounce = (callback: (...args: any[]) => any, delay?: number) => {
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setIsDebouncing(false);
      callback();
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);

  return {};
};
