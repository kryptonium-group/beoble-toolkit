import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import Beoble from '@beoble/js-sdk';
import useWeb3 from '../../hooks/useWeb3';
import { ProviderNotInitializedError } from '../../lib/Errors';
import { BeobleContext } from '../BeobleContext';

export interface IBeobleProvider {
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState<null | string>(null);
  const [ENSName, setENSName] = useState<null | string>(null);
  const [ENSAvatar, setENSAvatar] = useState<null | string>(null);

  const { provider, initProvider } = useWeb3();

  const initialize = () => {
    setIsInitialized(true);
    initProvider();
  };

  const changeAddressInfo = async () => {
    if (!provider) throw new ProviderNotInitializedError();
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const name = await provider.lookupAddress(address);
    const avatar = name ? await provider.getAvatar(name) : null;
    setAddress(address);
    setENSName(name);
    setENSAvatar(avatar);
  };

  useEffect(() => {
    if (provider) {
      changeAddressInfo();
    }
  }, [provider]);

  return (
    <BeobleContext.Provider
      value={{
        initialize,
        isInitialized,
        isAuthenticated,
        provider,
        address,
        ENSName,
        ENSAvatar,
      }}
    >
      {children}
    </BeobleContext.Provider>
  );
};

export default BeobleProvider;
