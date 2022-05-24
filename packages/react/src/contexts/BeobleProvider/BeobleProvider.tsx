import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { BeobleSDK, Core, IUser } from '@beoble/js-sdk';
import useWeb3 from '../../hooks/useWeb3';
import { ProviderNotInitializedError } from '../../lib/Errors';
import { BeobleContext } from '../BeobleContext';
import { ModalProvider } from '../ModalContext/ModalProvider';

export interface IBeobleProvider {
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Beoble, setBeoble] = useState<Core | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const { provider, initProvider, address, ENSAvatar, ENSName } = useWeb3();

  const initialize = async () => {
    setIsInitialized(true);
    const initAddress = await initProvider();
    const beoble = new Core();
    setBeoble(beoble);
    const user = await beoble.user.get({
      wallet_address: initAddress,
    });
    console.log(user.data[0]);
    setUser(user.data[0]);
  };

  const initUser = async (beoble: Core, wallet_address: string) => {
    const user = await beoble.user.get({
      wallet_address,
    });
    console.log(user.data[0]);
    if (user.meta.count < 1) {
      const newUser = await beoble.user.add({
        wallet_address,
        alias: wallet_address,
        display_name: wallet_address,
      });
    } else setUser(user.data[0]);
  };

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
        Beoble,
        user,
      }}
    >
      <ModalProvider>{children}</ModalProvider>
    </BeobleContext.Provider>
  );
};

export default BeobleProvider;
