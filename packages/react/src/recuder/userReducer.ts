import { IUserState } from './appState';
import { Action } from './types';
import { UserActionTypes } from './userActions';

export const userReducer = (
  state: IUserState,
  action: Action<UserActionTypes, any>
) => {
  switch (action.type) {
    case 'SET_USER':
      state.user = action.payload;
      return;
    default:
      return;
  }
};
