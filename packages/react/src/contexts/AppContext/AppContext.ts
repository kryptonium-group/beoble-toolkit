import { ethers } from 'ethers';
import { createContext } from 'react';
import { Core, IUser, Notification } from '@beoble/js-sdk';
import { initialUserState, IUserState } from '../../recuder/appState';

export interface IAppContext {
  userState: IUserState;
}

export const initialAppState: IAppContext = {
  userState: initialUserState,
};

export const AppContext = createContext<IAppContext>(initialAppState);
