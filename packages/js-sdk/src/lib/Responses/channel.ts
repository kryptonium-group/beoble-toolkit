import { MessageType } from '../types/channel';

export interface IMessage<T> {
  message_type: MessageType;
  data: T;
}
