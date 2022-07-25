import { IChatRoom, IUser } from '../Models';
import {
  ChatroomNotiMessageType,
  FriendNotiMessageType,
  NotiMessageType,
  UserNotiMessageType,
} from '../types/notification';

// export interface INotiMessage<T extends NotiMessageType> {
//   message_type: T;
//   data: T extends ChatroomNotiMessageType ? IChatRoom : IUser;
// }

export type INotiMessage =
  | IChatroomNotiMessage
  | IUserNotiMessage
  | IFriendNotiMessage;

export interface IChatroomNotiMessage {
  message_type: ChatroomNotiMessageType;
  data: IChatRoom;
}

export interface IUserNotiMessage {
  message_type: UserNotiMessageType;
  data: IUser;
}

export interface IFriendNotiMessage {
  message_type: FriendNotiMessageType;
  data: IUser;
}
