import { UpdateType } from '.';
import { IResponse } from './response';

export interface IUserResponse extends IResponse {
  data: IUser[];
}

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
}
