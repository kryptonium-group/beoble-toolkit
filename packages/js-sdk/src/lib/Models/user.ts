/* eslint-disable @typescript-eslint/no-empty-interface */
import { UpdateType } from '.';
import { IResponse } from './response';

export interface IUserResponse extends IResponse<IUser[]> {}

export interface IUserPutResponse extends IResponse<IUser> {}

export interface IGetUserParams {
  user_id?: string;
  wallet_address?: string;
  alias?: string;
  alias_search?: string;
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
  update_type?: UpdateType[];
  alias?: string;
  display_name?: string;
  description?: string;
  representative_media_url?: string[];
}

export interface IUser {
  user_id: string;
  create_time: string; // date
  update_time: string; // date
  wallets: string[];
  alias: string;
  display_name: string;
  description?: string;
  representative_media_url: string[];
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
