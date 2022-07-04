import { AttachmentType, MessageType } from '../types';
import { IChannel } from './chatroom';
import { IUser } from './user';

export interface IChat {
  id: string;
  text: string;
  html: string;
  type: MessageType;
  user: IUser;
  attachments: IAttachment[];
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
  channel: IChannel;
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
