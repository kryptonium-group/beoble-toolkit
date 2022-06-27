/* eslint-disable @typescript-eslint/no-empty-interface */
import { IResponse } from '../Responses/response';
import { MessageType } from '../types';
import { IChannel, IReaction } from './chatroom';
import { IUser } from './user';

export interface IChatResponse extends IResponse<IChat> {}

export interface IGetChatParams {
  chat_id: string | string[];
}

export interface IPostChatBody {
  parent_chat_id?: string;
  creator_user_id: string;
  chatroom_id: string;
  content_text: string;
  content_media_url?: string[];
}

export interface IPutChatBody {
  content_text?: string;
  content_media_url?: string[];
}

export interface IPutChatReactionBody {
  user_id: string;
  reaction: string;
}

export interface IPutChatReportBody {
  user_id: string;
  report_action_type: string;
  report_message: string;
}

export interface IChat {
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
  channel: IChannel;
}
