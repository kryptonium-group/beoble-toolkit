import { createContext } from 'react';

export interface IBeobleContext {
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export const BeobleContext = createContext<null | IBeobleContext>(null);
