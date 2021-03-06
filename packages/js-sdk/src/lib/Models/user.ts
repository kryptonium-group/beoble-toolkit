/* eslint-disable @typescript-eslint/no-empty-interface */
import { ChainType } from '../../types';
import { UserRole } from '../types/user';

export interface IUser {
  id: string;
  role: UserRole; // need to be typed
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
  registered_dapps: RegisteredDapp[];
}

interface RegisteredDapp {
  dapp: Dapp;
  is_online: boolean;
  last_online_at: string;
}

export interface UserCounts {
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

export interface Dapp extends IUser {}

export interface INFT {
  token_address: string;
  token_id: string | null;
  name: string;
  description: string;
  image_url: string;
  chain: ChainType;
}
