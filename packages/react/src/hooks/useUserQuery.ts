import { Core, IPutUserBody } from '@beoble/js-sdk';
import { ethers } from 'ethers';
import { Account } from '../contexts';
import {
  ProviderNotInitializedError,
  WalletNotConnectedError,
} from '../lib/Errors';
import { getSign } from '../utils/ethersUtil';
import { useQuery } from './commons';
import { useGraphQuery } from './useGraphQuery';

export const useUserQuery = (
  Beoble: Core,
  provider: ethers.providers.Web3Provider | null,
  account: Account
) => {
  const [userState, userQuery] = useQuery([
    {
      key: 'fetch',
      reducer: async () => {
        if (!account.address) throw new Error('');
        const { data } = await Beoble.user.get({
          wallet_address: account.address,
        });
        const user = data[0];

        if (!user.public_key) {
          const updatedUser = await Beoble.updatePublicKey(
            account.address,
            user.id
          );
          return updatedUser ? updatedUser.data : user;
        }
        return user;
      },
    },
    {
      key: 'update',
      reducer: async (prev, body) => {
        if (!prev) throw new Error('User should be fetched before updated');
        const { data: user } = await Beoble.user.update(prev?.id, body);
        return user;
      },
    },
    {
      key: 'registerPubKey',
      reducer: async (prev) => {
        if (!account.address) throw new Error('');
        if (!prev) throw new Error('User should be fetched before registered');
        const res = await Beoble.updatePublicKey(account.address, prev.id);
        if (res) return res.data;
        else return prev;
      },
    },
  ]);

  const graph = useGraphQuery(Beoble, userState.data?.id);

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

  const getUser = () => userQuery('fetch');
  const updateUser = (user: IPutUserBody) => userQuery('update', user);
  const registerUser = () => userQuery('registerPubKey');

  return { userState, getUser, login, updateUser, registerUser };
};
