import { Core, IPutUserBody } from '@beoble/js-sdk';
import { useState } from 'react';
import useBeoble from './useBeoble';

export const useBeobleSDK = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(true);
  const [data, setData] = useState<any>(undefined);
  const { Beoble, setUser } = useBeoble();

  const getUser = async () => {
    return;
  };

  const updateUser = async (userId: string, body: IPutUserBody) => {
    if (!Beoble) throw new Error('Beoble is not initialized!');
    try {
      setIsFetching(true);
      const res = await Beoble.user.update(userId, body);
      console.log(res);
      setIsFetching(false);
      setIsFetched(true);
      setData(res);
      setUser(res.data);
    } catch (err) {
      console.log('unexpected error', err);
    }
  };

  const addUser = async () => {
    return;
  };

  return { getUser, updateUser, addUser, isFetched, isFetching, data };
};
