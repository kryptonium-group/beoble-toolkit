/* eslint-disable @typescript-eslint/no-empty-interface */
import { SortngOrder } from '../../core/user';
import { IResponse } from '../Responses/response';
import { MembershipAction } from '../types';

export interface IUsersResponse extends IResponse<IUser[]> {}

export interface IUserResponse extends IResponse<IUser> {}

export interface IUserWithCountResponse extends IResponse<IUserWithCount> {}

export interface IGetUserParams {
  user_id?: string;
  wallet_address?: string;
  alias?: string;
  alias_search?: string;
  full_detail?: boolean;
  sort_key?: string;
  sort_order?: SortngOrder;
}

export interface IPostUserBody {
  wallet_address: string;
  alias: string;
  display_name: string;
  description?: string;
  representative_media_url?: string[];
}

export interface IPutUserBody {
  wallets?: string;
  alias?: string;
  display_name?: string;
  description?: string;
  representative_media_url?: string[];
  public_key?: string;
}

export interface IUserWithCount extends IUser, Partial<UserCounts> {}

export interface IUser {
  id: string;
  role: string; // need to be typed
  created_at: string;
  updated_at: string;
  wallets: string[];
  alias: string;
  banned: boolean;
  online: boolean;
  public_key: null | string;
  display_name: string;
  description: null | string;
  representative_media_url: null | string[];
}

interface UserCounts {
  wallets_count: number;
  chatrooms_count: number;
  friends_count: number;
  friend_requests_received_count: number;
  friend_requests_sent_count: number;
  followers_received_count: number;
  followers_sent_count: number;
  following_hashtags_count: number;
  groups_count: number;
  reporters_received_count: number;
  reporters_sent_count: number;
}

export interface IGetUserChatRoomParams {
  user_id: string;
}

export interface IPutUserChatRoomMembershipBody {
  target_id: string;
  membership_action: MembershipAction;
}
