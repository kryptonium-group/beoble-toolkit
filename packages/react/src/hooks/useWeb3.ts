import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { WalletNotConnectedError } from '../lib/Errors';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUseWeb3 {
  provider: ethers.providers.Web3Provider | null;
  account?: Account;
  initProvider: () => void;
}

export interface Account {
  address: string;
  ensName: string | null;
  ensAvatar: string | null;
}

export const useWeb3 = (): IUseWeb3 => {
  const [provider, setProvider] =
    useState<null | ethers.providers.Web3Provider>(null);
  const [account, setAccount] = useState<Account>();

  // when provider is properly injected into window.ethereum,
  // create ethers provider and save it.
  useEffect(() => {
    if (window.ethereum) initProvider();
  }, []);

  // when ethers provider is created
  // get user information and store
  useEffect(() => {
    if (provider) initAccount();
  }, [provider]);

  const initProvider = () => {
    registerProviderEvent();
    const browserProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(browserProvider);
  };

  const registerProviderEvent = () => {
    window.ethereum.on('accountsChanged', () => {
      initAccount();
    });
  };

  const initAccount = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const chainId = (await provider.getNetwork()).chainId;
      const address = await signer.getAddress();
      const ensName =
        chainId === 1 ? await provider.lookupAddress(address) : null;
      const ensAvatar = ensName ? await provider.getAvatar(ensName) : null;
      setAccount({
        address,
        ensName,
        ensAvatar,
      });
    }
  };

  return { provider, account, initProvider };
};

export default useWeb3;
