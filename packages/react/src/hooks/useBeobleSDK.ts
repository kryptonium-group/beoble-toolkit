import { Core, IPutUserBody } from '@beoble/js-sdk';
import { useState } from 'react';
import useBeoble from './useBeoble/useBeoble';

export const useBeobleSDK = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(true);
  const [data, setData] = useState<any>(undefined);
  const { Beoble } = useBeoble();

  const getUser = async () => {
    return;
  };

  const updateUser = async (userId: string, body: IPutUserBody) => {
    if (!Beoble) throw new Error('Beoble is not initialized!');
    setIsFetching(true);
    const res = await Beoble.user.update(userId, body);
    setIsFetching(false);
    setIsFetched(true);
    setData(res);
  };

  const addUser = async () => {
    return;
  };

  return { getUser, updateUser, addUser, isFetched, isFetching, data };
};
