import { Core } from '@beoble/js-sdk';
import { ethers } from 'ethers';
import { Account } from '../contexts';
import {
  ProviderNotInitializedError,
  WalletNotConnectedError,
} from '../lib/Errors';
import { getSign } from '../utils/ethersUtil';
import { useQuery } from './commons';

export const useUserQuery = (
  Beoble: Core,
  provider: ethers.providers.Web3Provider | null,
  account: Account
) => {
  const [userState, userQuery] = useQuery([
    {
      key: 'get',
      reducer: async () => {
        if (!account.address || !account.address) throw new Error('');
        const { data } = await Beoble.user.get({
          wallet_address: account.address,
        });
        const user = data[0];
        if (!user.public_key) return await updatePublicKey(user.id);
        return user;
      },
    },
  ]);

  const updatePublicKey = async (user_id: string) => {
    const public_key = await login();
    const updated = await Beoble.user.update(user_id, {
      public_key,
    });
    return updated.data;
  };

  const login = async () => {
    if (!provider) throw new ProviderNotInitializedError();
    if (!account.address) throw new WalletNotConnectedError();
    const msgRes = await Beoble.auth.getMessage(account.address);
    const [signature, public_key] = await getSign(
      msgRes.data.message_to_sign,
      provider
    );
    const loginRes = await Beoble.auth.login({
      wallet_address: account.address,
      signature,
      chain_type: 'ETHEREUM',
    });
    return public_key;
  };

  const getUser = () => userQuery('get');

  return { userState, getUser, login };
};
