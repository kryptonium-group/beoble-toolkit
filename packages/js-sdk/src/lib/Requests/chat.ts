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
