/* eslint-disable @typescript-eslint/no-empty-interface */
import { IChat, IUser, IChannel, IRead, IMember, IChatRoom } from '../Models';
import { IResponse } from './response';

interface IMembership {
  ADMIN: IUser[];
  NORMAL: IUser[];
}

export interface IChatRoomMembershipResponse extends IResponse<IMembership> {}

export interface IChatRoomResponse extends IResponse<IChatRoom> {}

export interface IChatRoomsResponse extends IResponse<IChatRoom[]> {}

export interface IRecentChatResponse extends IResponse<IChat[]> {}
