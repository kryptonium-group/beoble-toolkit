import { IChatRoom, IUser } from '@beoble/js-sdk';

// TODO: need to handle group chat without display name
export const getChatroomName = (chatroom: IChatRoom, user_id: string) => {
  const { channel, members } = chatroom;
  const { chatroom_type, display_name } = channel;
  if (chatroom_type === 'GROUP_CHAT') return display_name;
  else {
    const otherMembers = members.filter((member) => member.user_id !== user_id);
    return otherMembers[0].user.display_name;
  }
};

export const getChatroomMemberAccount = (
  chatroom: IChatRoom,
  user_id: string,
  index = 0
) => {
  const { members, channel } = chatroom;
  const otherMembers = members.filter((member) => member.user_id !== user_id);
  /*
  if (!otherMembers[index])
    throw new Error(`member at index ${index} does not exist!`);
    */
  return channel.chatroom_type === 'DIRECT_CHAT'
    ? otherMembers[index].user.wallets[0]
    : '';
};

export const getChatroomLatestMessage = (chatroom: IChatRoom) => {
  const { messages } = chatroom;
  return messages.length > 0 ? messages[0].text : 'Type anything to start!';
};

export const filterOutUser = (members: IUser[], user_id: string): IUser[] => {
  return members.filter((member) => member.id !== user_id);
};

export const getChatroomUndreadCount = (
  chatroom: IChatRoom,
  user_id: string
) => {
  const { read } = chatroom;
  const userUnread = read.find((readObj) => readObj.user.id === user_id);
  return userUnread?.unread_messages ?? 0;
};
