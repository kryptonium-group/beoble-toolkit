/* eslint-disable @typescript-eslint/no-empty-interface */
import { SortngOrder } from '../../core/user';
import { ArrayUpdate } from '../Models/core';
import { MembershipAction } from '../types';
export interface IGetUserChatRoomParams {
  user_id: string;
}

export interface IPutUserChatRoomMembershipBody {
  target_id: string;
  membership_action: MembershipAction;
}

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
  representative_media_url?: ArrayUpdate<string>;
  public_key?: string;
}
