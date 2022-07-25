export type NotiMessageType =
  | ChatroomNotiMessageType
  | FriendNotiMessageType
  | UserNotiMessageType;

export type ChatroomNotiMessageType =
  | 'NEW_CHATROOM'
  | 'MODIFIED_CHATROOM'
  | 'NEW_MESSAGE';

export type FriendNotiMessageType =
  | 'NEW_FRIEND'
  | 'ONNLINE_FRIEND'
  | 'OFFLINE_FRIEND'
  | 'REMOVED_FRIEND';

export type UserNotiMessageType =
  | 'NEW_FRIEND_REQUEST'
  | 'MODIFIED_FRIEND_REQUEST'
  | 'REMOVED_FRIEND_REQUEST'
  | 'NEW_FOLLOWER'
  | 'MODIFIED_FOLLOWER'
  | 'REMOVED_FOLLOWER'
  | 'NEW_REPORTER'
  | 'MODIFIED_REPORTER'
  | 'REMOVED_REPORTER';
