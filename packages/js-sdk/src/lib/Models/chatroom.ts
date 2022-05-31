/* eslint-disable @typescript-eslint/no-empty-interface */
import { IChat, UpdateType } from '.';
import { IResponse } from './response';
import { IUser } from './user';

export type ChatRoomType = 'DIRECT_CHAT' | 'GROUP_CHAT' | 'CHANNEL';

export interface IChatRoom {
  chatroom_id: string;
  create_time: string;
  update_time: string;
  alias: string;
  display_name: string;
  description: string;
  representative_media_url: string[];
  creator_id: string;
  chatroom_type: ChatRoomType;
}

interface IMembership {
  ADMIN: IUser[];
  NORMAL: IUser[];
}

export type MembershipAction = 'ADD' | 'REMOVE';
export type MembershipType = 'NORMAL' | 'ADMIN';

export interface IChatRoomMembershipResponse extends IResponse<IMembership> {}

export interface IChatRoomResponse extends IResponse<IChatRoom> {}

export interface IChatRoomsResponse extends IResponse<IChatRoom[]> {}

export interface IRecentChatResponse extends IResponse<IChat[]> {}

export interface IGetChatRoomParams {
  chatroom_id: string;
}

export interface IPostChatRoomBody {
  alias: string;
  display_name: string;
  description?: string;
  representative_media_url?: string;
  creator_id: string;
  chatroom_type: ChatRoomType;
}

export interface IPutChatRoomBody {
  alias?: string;
  display_name?: string;
  description?: string;
  representative_media_url?: string;
  update_type?: UpdateType;
}

export interface IPutChatRoomMembershipBody {
  user_ids: string[];
  membership_type: MembershipType;
  membership_action: MembershipAction;
}
