import { IAttachment } from '../Models';
import { ActionType } from '../types/channel';

// think this is not proper
export interface ISendMessage {
  creator_user_id: string;
  chatroom_id: string;
  parent_id?: string;
  quoted_message_id?: string;
  text?: string;
  attachments?: IAttachment[];
  mentioned_users?: string[];
}

export interface IRetrieveMessage {
  chatroom_id: string;
}

export interface IAction {
  action_type: ActionType;
  data: any;
}
