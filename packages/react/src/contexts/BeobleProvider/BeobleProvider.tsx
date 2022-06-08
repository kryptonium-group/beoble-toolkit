import { FC, ReactNode, useEffect, useState } from 'react';
import { Core, IUser } from '@beoble/js-sdk';
import useWeb3 from '../../hooks/useWeb3';
import { BeobleContext } from '../BeobleContext';
import { ModalProvider } from '../ModalContext/ModalProvider';

export interface IBeobleProvider {
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Beoble, setBeoble] = useState<Core | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const { provider, account } = useWeb3();

  // create beoble sdk obj on mount
  // and store
  useEffect(() => {
    const beoble = new Core();
    setBeoble(beoble);
  }, []);

  // when beoble sdk is created
  // and web account information is fetched successfully
  // mark initialized and fetch user from beoble sdk
  useEffect(() => {
    if (Beoble && account) {
      setInitialized(true);
      initUser(Beoble, account.address);
    }
  }, [Beoble, account]);

  // fetch user with account address
  // create new and store if no user exist
  // else store it
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
      setUser(newUser);
    } else setUser(user.data[0]);
  };

  return (
    <BeobleContext.Provider
      value={{
        initialized,
        isAuthenticated,
        provider,
        account,
        Beoble,
        user,
        setUser,
      }}
    >
      <ModalProvider>{children}</ModalProvider>
    </BeobleContext.Provider>
  );
};

export default BeobleProvider;
