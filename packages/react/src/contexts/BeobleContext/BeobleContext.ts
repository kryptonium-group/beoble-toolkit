import { ethers } from 'ethers';
import { createContext } from 'react';
import { Core, IUser, Notification } from '@beoble/js-sdk';

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
}

export const BeobleContext = createContext<IBeobleContext | null>(null);
