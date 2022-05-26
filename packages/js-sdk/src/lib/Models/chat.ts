import { UpdateType } from '.';

export interface IPostChatBody {
  parent_chat_id?: string;
  creator_user_id: string;
  chatroom_id: string;
  content_text: string;
  content_media_url: string[];
}

export interface IPutChatBody {
  content_text?: string;
  update_type?: UpdateType;
  content_media_url?: string[];
}

export interface IPostChatReactionBody {
  user_id: string;
  reaction: string;
}

export interface IPostChatReportBody {
  user_id: string;
  report_action_type: string;
  report_message: string;
}

export interface IPostChatRoomBody {
  alias: string;
  display_name: string;
  description?: string;
  representative_media_url?: string;
  creator_id: string;
  chatroom_type: string;
}

export interface IPutChatRoomBody {
  alias?: string;
  display_name?: string;
  description?: string;
  representative_media_url?: string;
  update_type?: UpdateType;
}
