import { ethers } from 'ethers';
import { createContext } from 'react';
import { Core, IUser } from '@beoble/js-sdk';

export interface IBeobleContext {
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: () => void;
  provider: ethers.providers.Web3Provider | null;
  address: string | null;
  ENSName: string | null;
  ENSAvatar: string | null;
  Beoble: Core | null;
  user: IUser | null;
}

export const BeobleContext = createContext<IBeobleContext | null>(null);
