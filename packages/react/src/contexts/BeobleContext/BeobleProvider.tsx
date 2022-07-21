import { FC, ReactNode, useEffect, useState } from 'react';
import { Core, IUser } from '@beoble/js-sdk';
import useWeb3 from '../../hooks/useWeb3';
import { BeobleContext } from './BeobleContext';
import { ModalProvider } from '../ModalContext/ModalProvider';
import { ChatProvider } from '../ChatContext/ChatProvider';
import { useNotification } from '../../hooks/useNotification';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../theme';
import { isDateOver } from '../../utils';
import { getSign } from '../../utils/ethersUtil';
import { ProviderNotInitializedError } from '../../lib/Errors';

export interface IBeobleProvider {
  Beoble: Core;
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ Beoble, children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const { provider, account } = useWeb3();
  const { notification, hasNewMessage, setHasNewMessage } = useNotification(
    Beoble,
    user?.id
  );

  // when beoble sdk is created
  // and web account information is fetched successfully
  // mark initialized and fetch user from beoble sdk
  useEffect(() => {
    const { address } = account;
    if (address) {
      setInitialized(true);
      initUser(address);
      if (!checkAuthTokenValidity()) login(address);
    }
  }, [account.address]);

  useEffect(() => {
    const { address } = account;
    if (notification && address) {
      updateUser(address);
    }
  }, [notification, account.address]);

  const checkAuthTokenValidity = () => {
    const existingToken = Beoble.auth.retrieveAuthData();
    if (!existingToken) return false;
    else return !isDateOver(existingToken.expiry_date);
  };

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
        const updatedUser = await upadatePublicKey(wallet_address, user.id);
        setUser(updatedUser);
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
    return updated.data;
  };

  const login = async (wallet_address: string) => {
    if (!provider) throw new ProviderNotInitializedError();
    const msgRes = await Beoble.auth.getMessage(wallet_address);
    const [signature, public_key] = await getSign(
      msgRes.data.message_to_sign,
      provider
    );
    const loginRes = await Beoble.auth.login({
      wallet_address,
      signature,
      chain_type: 'ETHEREUM',
    });
    console.log(loginRes, public_key);
    return public_key;
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
