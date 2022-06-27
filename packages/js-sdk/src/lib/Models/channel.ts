import { IUser } from './user';

export type WebScocketEvents = 'open' | 'message' | 'error' | 'close';

export interface IChannelConfig {
  chatroom_id: string;
  authToken?: string;
}

export interface IMessage<T> {
  message_type: MessageType;
  data: T;
}

export type MessageType =
  | 'RETRIEVED_MESSAGE'
  | 'UPDATED_MESSAGE'
  | 'NEW_MESSAGE';

export type ActionType = 'RETREIVE_MESSAGE' | 'SEND_MESSAGE';

export interface IAction {
  action_type: ActionType;
  data: any;
}
