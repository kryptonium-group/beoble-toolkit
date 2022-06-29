import { ethers } from 'ethers';
import { createContext } from 'react';
import { Core, IUser, Notification } from '@beoble/js-sdk';
import { Account } from '../../hooks/useWeb3';

export interface IBeobleContext {
  isAuthenticated: boolean;
  initialized: boolean;

  provider: ethers.providers.Web3Provider | null;
  account?: Account;
  notification?: Notification;

  Beoble: Core | null;
  user: IUser | null;
  setUser: (user: IUser) => void;
  initProvider: () => void;
}

export const BeobleContext = createContext<IBeobleContext | null>(null);
