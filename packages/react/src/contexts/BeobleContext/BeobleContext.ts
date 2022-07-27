import { ethers } from 'ethers';
import { createContext } from 'react';
import { Core, IPutUserBody, IUser, Notification } from '@beoble/js-sdk';
import { APIState } from '../../hooks';

export interface Account {
  address: string | null;
  ensName: string | null;
  ensAvatar: string | null;
}

export interface IBeobleContext {
  isAuthenticated: boolean;
  initialized: boolean;

  provider: ethers.providers.Web3Provider | null;
  account?: Account;
  notification?: Notification;
  hasNewMessage: boolean;

  Beoble: Core;
  user: IUser | null;
  userState: APIState<IUser>;
  updateUser: (body: IPutUserBody) => void;
}

export const BeobleContext = createContext<IBeobleContext | null>(null);
