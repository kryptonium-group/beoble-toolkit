import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUseENS {
  getENSAvatar: () => string;
  getENSName: () => string;
}

export const useENS = (): IUseENS => {
  const getENSAvatar = useCallback(() => {
    return '';
  }, []);

  const getENSName = useCallback(() => {
    return '';
  }, []);

  return { getENSAvatar, getENSName };
};

export default useENS;
