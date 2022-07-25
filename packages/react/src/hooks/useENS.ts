import { ethers } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import { getENSAvatar, getENSName } from '../utils/ethersUtil';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUseENS {
  ENSAvatar: string | null;
  ENSName: string | null;
}

export const useENS = (
  provider: ethers.providers.Web3Provider | null,
  address?: string
): IUseENS => {
  const [ENSName, setENSName] = useState<string | null>(null);
  const [ENSAvatar, setENSAvatar] = useState<string | null>(null);

  useEffect(() => {
    const setENS = async () => {
      if (address) {
        setENSName(await getENSName(address, provider));
        setENSAvatar(await getENSAvatar(address, provider));
      }
    };
    if (provider && address) setENS();
  }, [address, provider]);

  return { ENSName, ENSAvatar };
};

export default useENS;
