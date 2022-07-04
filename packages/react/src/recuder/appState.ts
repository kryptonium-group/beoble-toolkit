import { Core, IChatRoom, IUser } from '@beoble/js-sdk';

interface IAppState {
  beoble: Core;
  user: IUser | null;
  followers: IUser[];
  followings: IUser[];

  chatrooms: IChatRoom[];
  openedChatroom: string[];
}

const initialState = {};
