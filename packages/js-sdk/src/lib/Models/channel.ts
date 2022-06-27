import { IUser } from './user';

export type WebScocketEvents = 'open' | 'message' | 'error' | 'close';

export interface IChannelConfig {
  chatroom_id: string;
  authToken?: string;
}

export type MessageType = 'SEND_MESSAGE' | 'RETRIEVE_MESSAGE';
export interface IMessage {
  type: MessageType;
  data: any;
}

export type ActionType =
  | 'RETRIEVED_MESSAGE'
  | 'UPDATED_MESSAGE'
  | 'NEW_MESSAGE';
