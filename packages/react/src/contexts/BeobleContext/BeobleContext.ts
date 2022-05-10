import { ethers } from 'ethers';
import { createContext } from 'react';

export interface IBeobleContext {
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: (address: string) => void;
  provider: ethers.providers.Web3Provider | null;
  initProvider: () => void;
}

export const BeobleContext = createContext<null | IBeobleContext>(null);
