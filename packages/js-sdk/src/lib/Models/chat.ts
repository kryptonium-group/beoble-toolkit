/* eslint-disable @typescript-eslint/no-empty-interface */
import { IResponse } from './response';

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
  chat_id: string;
  chatroom_id: string;
  content_media_url: string[];
  content_text: string;
  create_time: string | number;
  creator_user_id: string;
  display_name: string;
  parent_chat_id?: string;
  reactions: any;
  representative_media_url: string[];
  update_time: string | number;
}
