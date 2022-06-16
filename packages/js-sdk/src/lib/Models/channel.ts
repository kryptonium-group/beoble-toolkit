export type WebScocketEvents = 'open' | 'message' | 'error' | 'close';

export interface IChannelConfig {
  chatroom_id: string;
  authToken?: string;
}

export interface IMessage {
  action_type: ActionType;
  data: any;
}

export type ActionType = 'RETRIEVED_MESSAGE' | 'UPDATED_MESSAGE';
