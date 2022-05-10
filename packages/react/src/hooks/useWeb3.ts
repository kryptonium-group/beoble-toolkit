import { ethers } from 'ethers';
import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUseWeb3 {
  initProvider: () => void;
  provider: ethers.providers.Web3Provider | null;
}

export const useWeb3 = (): IUseWeb3 => {
  const [provider, setProvider] =
    useState<null | ethers.providers.Web3Provider>(null);

  const initProvider = async () => {
    if (!window.ethereum) {
      throw new Error(`Brwoser wallet should be connected first!`);
    }
    const browserProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(browserProvider);
  };

  return { provider, initProvider };
};

export default useWeb3;
