import { IChatRoomKey, IUser } from '../Models';
import { ChatRoomType, MembershipAction, MembershipType } from '../types';

export interface IPostMarkAsReadParam {
  chatroom_id: string;
  user_id: string;
  chat_id: string;
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
  members: string[];
  dapp_id?: string;
  keys: IChatRoomKey[];
}

export interface IAddChatRoomBody
  extends Omit<IPostChatRoomBody, 'keys' | 'members' | 'creator_id'> {
  creator: IUser;
  members: IUser[];
}

export interface IPutChatRoomBody {
  alias?: string;
  display_name?: string;
  description?: string;
  representative_media_url?: string;
}

export interface IPutChatRoomMembershipBody {
  user_ids: string[];
  membership_type: MembershipType;
  membership_action: MembershipAction;
}
