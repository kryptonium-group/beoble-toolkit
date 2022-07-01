import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { WalletNotConnectedError } from '../lib/Errors';

export const useWeb3 = () => {
  const [provider, setProvider] =
    useState<null | ethers.providers.Web3Provider>(null);
  const [address, setAddress] = useState<string | undefined>();
  const [ensName, setEnsName] = useState<string | null>(null);
  const [ensAvatar, setEnsAvatar] = useState<string | null>(null);

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
      try {
        const address = await signer.getAddress();
        setAddress(address);
        const ensName =
          chainId === 1 ? await provider.lookupAddress(address) : null;
        setEnsName(ensName);
        const ensAvatar = ensName ? await provider.getAvatar(ensName) : null;
        setEnsAvatar(ensAvatar);
      } catch {
        setAddress(undefined);
      }
    }
  };

  /**
   *
   * @param msg message to sign
   * @returns [signature, public key]
   */
  const getSign = async (msg: string): Promise<[string, string]> => {
    if (provider) {
      const signer = provider.getSigner();
      const testHash = ethers.utils.id(msg);
      const sig = await signer.signMessage(msg);
      const pk = ethers.utils.recoverPublicKey(
        ethers.utils.arrayify(testHash),
        sig
      );
      console.log(pk);
      return [sig, pk];
    }
    return ['', ''];
  };

  return { provider, initProvider, address, ensAvatar, ensName, getSign };
};

export default useWeb3;
