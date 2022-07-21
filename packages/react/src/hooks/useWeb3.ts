import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Account } from '../contexts';
import { ProviderNotInitializedError } from '../lib/Errors';
import { getENSAvatar, getENSName } from '../utils/ethersUtil';

// ENS will be used as fallback if there is no beoble profile yet
export const useWeb3 = () => {
  const [provider, setProvider] =
    useState<null | ethers.providers.Web3Provider>(null);
  const [account, setAccount] = useState<Account>({
    address: null,
    ensName: null,
    ensAvatar: null,
  });

  // when provider is properly injected into window.ethereum,
  // create ethers provider and save it.
  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      ethereum.on('accountsChanged', (account: string[]) => {
        console.log(account);
      });
    }
    return () => {
      ethereum.removeListener('accountsChanged', initAccount);
    };
  }, []);

  // when ethers provider is created
  // get user information and store
  useEffect(() => {
    if (provider) {
      initAccount();
    }
  }, [provider]);

  const initProvider = () => {
    console.log('provider init');
    const browserProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(browserProvider);
  };

  const initAccount = async () => {
    if (!provider) throw new ProviderNotInitializedError();
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount((account) => ({
      ...account,
      address,
    }));
    const ensName = await getENSName(address, provider);
    setAccount((account) => ({
      ...account,
      ensName,
    }));
    const ensAvatar = await getENSAvatar(address, provider);
    setAccount((account) => ({
      ...account,
      ensAvatar,
    }));
  };
  return { provider, account };
};

export default useWeb3;
