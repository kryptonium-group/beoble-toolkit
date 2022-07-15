import { FC, ReactNode, useEffect, useState } from 'react';
import { Core, IUser } from '@beoble/js-sdk';
import useWeb3 from '../../hooks/useWeb3';
import { BeobleContext } from './BeobleContext';
import { ModalProvider } from '../ModalContext/ModalProvider';
import { ChatProvider } from '../ChatContext/ChatProvider';
import { useNotification } from '../../hooks/useNotification';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../theme';

export interface IBeobleProvider {
  children?: ReactNode;
  Beoble: Core;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ children, Beoble }) => {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const { provider, address, ensName, ensAvatar, initProvider, getSign } =
    useWeb3();

  const { notification, hasNewMessage, setHasNewMessage } = useNotification(
    Beoble,
    user?.id
  );

  // when beoble sdk is created
  // and web account information is fetched successfully
  // mark initialized and fetch user from beoble sdk
  useEffect(() => {
    if (address) {
      setInitialized(true);
      initUser(address);
      login(address);
    }
  }, [address]);

  useEffect(() => {
    if (notification && address) {
      updateUser(address);
    }
  }, [notification, address]);

  const updateUser = async (wallet_address: string) => {
    const res = await Beoble.user.get({
      wallet_address,
    });
    const user = res.data[0];
    setUser(user);
    return user;
  };

  const initUser = async (wallet_address: string) => {
    try {
      const user = await updateUser(wallet_address);
      if (!user.public_key) {
        await upadatePublicKey(wallet_address, user.id);
      }
    } catch (error) {
      console.log(error);
      await login(wallet_address);
      initUser(wallet_address);
    }
  };

  const upadatePublicKey = async (wallet_address: string, user_id: string) => {
    const public_key = await login(wallet_address);
    const updated = await Beoble.user.update(user_id, {
      public_key,
    });
    setUser(updated.data);
  };

  const login = async (wallet_address: string) => {
    const res = await Beoble.auth.getMessage(wallet_address);
    const [signature, public_key] = await getSign(res.data.message_to_sign);
    const res2 = await Beoble.auth.login({
      wallet_address,
      signature,
      chain_type: 'ETHEREUM',
    });
    console.log(res2, public_key);
    return public_key;
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <BeobleContext.Provider
        value={{
          initialized,
          isAuthenticated,
          provider,
          account: {
            address,
            ensName,
            ensAvatar,
          },
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
