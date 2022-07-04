/* eslint-disable @typescript-eslint/no-empty-interface */
import { IChat } from './chat';
import { Capablity, ChannelRole, ChatRoomType, MemberRole } from '../types';
import { IUser } from './user';

export interface IChatRoom {
  channel: IChannel;
  messages: IChat[];
  pinned_messages: IChat[];
  read: IRead[];
  members: IMember[];
  membership: null | any;
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
  last_message_at: string;
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

export interface IChannelCommand {
  name: string;
  description: string;
  args: string;
  set: string;
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
