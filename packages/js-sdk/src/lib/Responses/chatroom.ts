/* eslint-disable @typescript-eslint/no-empty-interface */
import { IChat, IUser, IChannel, IRead, IMember } from '../Models';
import { IResponse } from './response';

interface IMembership {
  ADMIN: IUser[];
  NORMAL: IUser[];
}

export interface IChatRoomMembershipResponse extends IResponse<IMembership> {}

export interface IChatRoomResponse extends IResponse<IChatRoom> {}

export interface IChatRoomsResponse extends IResponse<IChatRoom[]> {}

export interface IRecentChatResponse extends IResponse<IChat[]> {}

export interface IChatRoom {
  channel: IChannel;
  messages: IChat[];
  pinned_messages: IChat[];
  read: IRead[];
  members: IMember[];
  membership: null | any;
}
