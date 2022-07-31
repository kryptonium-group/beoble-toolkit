import { FC, ReactNode, useEffect, useState } from 'react';
import { Core } from '@beoble/js-sdk';
import { useWeb3 } from '../../hooks/useWeb3';
import { BeobleContext } from './BeobleContext';
import { ModalProvider } from '../ModalContext/ModalProvider';
import { ChatProvider } from '../ChatContext/ChatProvider';
import { useNotification } from '../../hooks/useNotification';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../theme';
import { useUserQuery } from '../../hooks/useUserQuery';
import { useChatroomsQuery } from '../../hooks/useChatroomsQuery';

export interface IBeobleProvider {
  Beoble: Core;
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ Beoble, children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { provider, account } = useWeb3();
  const { userState, getUser, login, updateUser, registerUser } = useUserQuery(
    Beoble,
    provider,
    account
  );
  const { chatroomState, getChatrooms, unshiftChatroom } = useChatroomsQuery(
    Beoble,
    userState.data
  );
  const { notification, hasNewMessage, shiftNoti } = useNotification(
    Beoble,
    userState.data?.id
  );

  useEffect(() => {
    const { address } = account;
    if (address) {
      Beoble.initialize(address);
      setInitialized(true);
      getUser();
      if (!Beoble.auth.checkAuthTokenValidity(address)) {
        setIsAuthenticated(false);
        login()
          .then(() => setIsAuthenticated(true))
          .catch(() => setIsAuthenticated(false));
      } else setIsAuthenticated(true);
    }
  }, [account.address]);

  useEffect(() => {
    if (userState.data) getChatrooms();
  }, [userState]);

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
          Beoble,
          user: userState.data ?? null,
          userState,
          updateUser,
          registerUser,
        }}
      >
        <ChatProvider
          core={Beoble}
          {...{ user: userState.data ?? null, notification }}
        >
          <ModalProvider>{children}</ModalProvider>
        </ChatProvider>
      </BeobleContext.Provider>
    </ThemeProvider>
  );
};

export default BeobleProvider;
