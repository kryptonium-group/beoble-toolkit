import { Core, IChatRoom, IUser } from '@beoble/js-sdk';
import { APIState, initialAPIState } from '../hooks';

export interface IUserState {
  user: APIState<IUser>;
  followers: APIState<IUser[]>;
  followings: APIState<IUser[]>;
  friends: APIState<IUser[]>;

  chatrooms: APIState<IChatRoom[]>;
}

export const initialUserState: IUserState = {
  user: initialAPIState,
  followers: initialAPIState,
  followings: initialAPIState,
  friends: initialAPIState,
  chatrooms: initialAPIState,
};

export interface IAppState {
  beoble: Core;
  userState: IUserState;
}

export const initialAppState: IAppState = {
  beoble: new Core({ appId: '' }),
  userState: initialUserState,
};
