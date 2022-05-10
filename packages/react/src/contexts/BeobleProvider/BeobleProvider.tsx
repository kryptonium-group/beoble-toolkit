import { FC, ReactNode, useState } from 'react';
import useWeb3 from '../../hooks/useWeb3';
import { BeobleContext } from '../BeobleContext';

export interface IBeobleProvider {
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [address, setAddress] = useState<null | string>(null);
  const { provider, initProvider } = useWeb3();

  const initialize = (address: string) => {
    setAddress(address);
    setIsInitialized(true);
    initProvider();
    if (provider) console.log(provider.lookupAddress(address));
  };

  return (
    <BeobleContext.Provider
      value={{
        initialize,
        isInitialized,
        isAuthenticated: false,
        provider,
        initProvider,
      }}
    >
      {children}
    </BeobleContext.Provider>
  );
};

export default BeobleProvider;
