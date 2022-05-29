import { IChat, UpdateType } from '.';
import { IResponse } from './response';

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

export interface IChatRoomResponse extends IResponse {
  data: IChatRoom;
}

export interface IGetChatRoomResponse extends IResponse {
  data: IChatRoom[];
}

export interface IRecentChatResponse extends IResponse {
  data: IChat[];
}

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

export type MembershipAction = 'ADD' | 'REMOVE';
export type MembershipType = 'NORMAL' | 'ADMIN';

export interface IPutChatRoomMembershipBody {
  user_ids: string[];
  membership_type: MembershipType;
  membership_action: MembershipAction;
}
