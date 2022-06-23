import { ethers } from 'ethers';
import { useState, useCallback, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUseENS {
  ENSAvatar?: string;
  ENSName: string;
}

export const useENS = (
  provider: ethers.providers.Web3Provider | null,
  address?: string
): IUseENS => {
  const [ENSName, setENSName] = useState('');
  const [ENSAvatar, setENSAvatar] = useState('');

  useEffect(() => {
    if (provider && address) getENS(provider, address);
  }, [provider, address]);

  const getENS = async (
    provider: ethers.providers.Web3Provider,
    address: string
  ) => {
    const currentChain = (await provider.getNetwork()).chainId;
    if (ethers.utils.isAddress(address) && currentChain === 1) {
      const ensName = (await provider.lookupAddress(address)) ?? '';
      setENSName(ensName);
      if (ensName) {
        const ensAvatar = (await provider.getAvatar(ensName)) ?? '';
        setENSAvatar(ensAvatar);
      }
    }
  };

  return { ENSName, ENSAvatar };
};

export default useENS;
