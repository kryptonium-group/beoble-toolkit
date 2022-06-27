/* eslint-disable @typescript-eslint/no-empty-interface */
import { IChat } from '.';
import {
  AttachmentType,
  Capablity,
  ChannelRole,
  ChatRoomType,
  MemberRole,
  MembershipAction,
  MembershipType,
  MessageType,
} from '../types';
import { IUser } from './user';

/*
export interface IChatRoom {
  chatroom_id: string;
  create_time: string | number;
  update_time: string | number;
  latest_chat_time: number;
  alias: string;
  display_name: string;
  description: string;
  representative_media_url: string[];
  creator_id: string;
  chatroom_type: ChatRoomType;
  latest_chat: IChat[];
  members: IUser[];
}
*/
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

export interface IChannel {
  id: string;
  type: string;
  cid: string;
  created_at: string;
  updated_at: string;
  created_by: IUser;
  frozen: boolean;
  disabled: boolean;
  member_count: number;
  config: ChannelConfig;
  own_capabilities: Capablity[];
  hidden: boolean;
  display_name: string;
  chatroom_type: ChatRoomType;
  representative_media_url: null | string[];
  alias: string;
  description: null | string;
}

export interface IChannelCommand {
  name: string;
  description: string;
  args: string;
  set: string;
}
export interface ChannelConfig {
  created_at: string;
  updated_at: string;
  name: string;
  typing_events: boolean;
  read_events: boolean;
  connect_events: boolean;
  search: boolean;
  reactions: boolean;
  replies: boolean;
  quotes: boolean;
  mutes: boolean;
  uploads: boolean;
  url_enrichment: boolean;
  custom_events: boolean;
  push_notifications: boolean;
  reminders: boolean;
  message_retention: string; // type? 'infinite'
  max_message_length: number;
  automod: string; // type?: disabled
  automod_behavior: string; // type?: flag
  commands: IChannelCommand[];
}

export interface IRead {
  user: IUser;
  last_read: string;
  unread_messages: number;
}

export interface IMember {
  user_id: string;
  user: IUser;
  created_at: string;
  updated_at: string;
  banned: boolean;
  shadow_banned: boolean;
  role: MemberRole;
  channel_role: ChannelRole;
}

export interface IMember {
  user_id: string;
  user: IUser;
  created_at: string;
  updated_at: string;
  banned: boolean;
  shadow_banned: boolean;
  role: MemberRole;
  channel_role: ChannelRole;
}

export interface IMessage {
  id: string;
  text: string;
  html: string;
  type: MessageType;
  user: IUser;
  attachments: [];
  latest_reactions: IReaction[];
  own_reactions: IReaction[];
  reaction_counts: any;
  reaction_scores: any;
  reply_count: number;
  cid: string;
  created_at: string;
  updated_at: string;
  shadowed: boolean;
  mentioned_users: [];
  silent: boolean;
  pinned: boolean;
  pinned_at: null | string;
  pinned_by: null | string;
  pin_expires: null | string;
  chatroom_id: string;
  creator_user_id: string;
}

export interface IReaction {
  type: string;
  score: number;
}

export interface IAttachment {
  type?: AttachmentType;
  author_name?: string;
  title?: string;
  title_link?: string;
  text?: string;
  image_url?: string;
  asset_url?: string;
  thumb_url?: string;
  og_scrape_url?: string;
}
