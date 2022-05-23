import { ethers } from 'ethers';
import React, { useState } from 'react';
import { WalletNotConnectedError } from '../lib/Errors';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUseWeb3 {
  initProvider: () => Promise<string>;
  provider: ethers.providers.Web3Provider | null;
  address: string | null;
  ENSAvatar: string | null;
  ENSName: string | null;
}

export const useWeb3 = (): IUseWeb3 => {
  const [provider, setProvider] =
    useState<null | ethers.providers.Web3Provider>(null);
  const [address, setAddress] = useState<null | string>(null);
  const [ENSName, setENSName] = useState<null | string>(null);
  const [ENSAvatar, setENSAvatar] = useState<null | string>(null);

  const initProvider = async () => {
    if (!window.ethereum) {
      throw new WalletNotConnectedError(
        `Brwoser wallet should be connected first!`
      );
    }
    const browserProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(browserProvider);

    const signer = browserProvider.getSigner();
    const address = await signer.getAddress();
    const name = await browserProvider.lookupAddress(address);
    const avatar = name ? await browserProvider.getAvatar(name) : null;
    setAddress(address);
    setENSName(name);
    setENSAvatar(avatar);

    return address;
  };

  return { provider, initProvider, address, ENSAvatar, ENSName };
};

export default useWeb3;
