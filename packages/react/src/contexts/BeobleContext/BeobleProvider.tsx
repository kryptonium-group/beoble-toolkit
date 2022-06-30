import { FC, ReactNode, useEffect, useState } from 'react';
import { Core, IUser } from '@beoble/js-sdk';
import useWeb3 from '../../hooks/useWeb3';
import { BeobleContext } from '.';
import { ModalProvider } from '../ModalContext/ModalProvider';
import { ChatProvider } from '../ChatContext/ChatProvider';
import { useNotification } from '../../hooks/useNotification';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../theme';

export interface IBeobleProvider {
  appId: string;
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ appId, children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Beoble, setBeoble] = useState<Core | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const { provider, account, initProvider } = useWeb3();
  const { notification, hasNewMessage, setHasNewMessage } = useNotification(
    appId,
    user?.id
  );

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

  const initUser = async (beoble: Core, wallet_address: string) => {
    const user = await beoble.user.get({
      wallet_address,
    });
    setUser(user.data[0]);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <BeobleContext.Provider
        value={{
          initialized,
          isAuthenticated,
          provider,
          account,
          notification,
          hasNewMessage,
          setHasNewMessage,
          Beoble,
          user,
          setUser,
          initProvider,
        }}
      >
        <ChatProvider core={Beoble} {...{ user, notification }}>
          <ModalProvider>{children}</ModalProvider>
        </ChatProvider>
      </BeobleContext.Provider>
    </ThemeProvider>
  );
};

export default BeobleProvider;
