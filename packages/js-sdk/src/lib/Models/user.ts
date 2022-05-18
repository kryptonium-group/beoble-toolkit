import { UpdateType } from '.';

export interface UserResponse {
  result: User[];
}

export interface UserUpdate {
  user_id: string;
  wallets?: string;
  update_type?: UpdateType[];
  alias?: string;
  display_name?: string;
  description?: string;
  representative_media_url?: string[];
}

export interface UserCreate {
  wallet_address: string;
  alias: string;
  display_name: string;
  description?: string;
  representative_media_url?: string[];
}

export interface User {
  user_id: string;
  create_time: string; // date
  update_time: string; // date
  wallets: string[];
  alias: string;
  display_name: string;
  description?: string;
  representative_media_url: string[];
}
