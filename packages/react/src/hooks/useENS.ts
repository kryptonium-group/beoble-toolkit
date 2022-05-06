import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUseENS {
  count: number;
  increment: () => void;
  getENSAvatar: () => string;
  getENSName: () => string;
}

export const useENS = (): IUseENS => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  const getENSAvatar = useCallback(() => {
    return '';
  }, []);
  const getENSName = useCallback(() => {
    return '';
  }, []);
  return { count, increment, getENSAvatar, getENSName };
};

export default useENS;
