export type WebScocketEvents = 'open' | 'message' | 'error' | 'close';

export type MessageType =
  | 'RETRIEVED_MESSAGE'
  | 'UPDATED_MESSAGE'
  | 'NEW_MESSAGE';

export type ActionType = 'RETRIEVE_MESSAGE' | 'SEND_MESSAGE';
