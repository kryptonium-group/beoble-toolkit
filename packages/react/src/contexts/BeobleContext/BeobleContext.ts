import { ethers } from 'ethers';
import { createContext } from 'react';
import { Core, IUser, Notification } from '@beoble/js-sdk';

interface Account {
  address?: string;
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
  setHasNewMessage: (data: boolean) => void;

  Beoble: Core;
  user: IUser | null;
  setUser: (user: IUser) => void;
  initProvider: () => void;
}

export const BeobleContext = createContext<IBeobleContext | null>(null);
