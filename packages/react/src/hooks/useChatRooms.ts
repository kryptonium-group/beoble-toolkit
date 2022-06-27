import { IChatRoom, Core, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { MessageConversationProps } from '../components/MessageConversation';
import { getUTCTimeStamp } from '../utils';
import { useBeoble } from './useBeoble';

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
  if (!otherMembers[index])
    throw new Error(`member at index ${index} does not exist!`);
  return channel.chatroom_type === 'DIRECT_CHAT'
    ? otherMembers[index].user.wallets[0]
    : '';
};

export const getChatroomLatestMessage = (chatroom: IChatRoom) => {
  const { messages } = chatroom;
  return messages.length > 0 ? messages[0].text : 'Type anything to start!';
};

export const filterOutUser = (members: IUser[], user_id: string): IUser[] => {
  return members.filter((member) => member.user_id !== user_id);
};

export const useChatRooms = (Beoble: Core | null, user: IUser | null) => {
  const [chatrooms, setChatrooms] = useState<IChatRoom[]>([]);
  const [conversations, setConversations] = useState<
    MessageConversationProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Beoble && user) initChatrooms();
  }, [Beoble, user]);

  useEffect(() => {
    const converted = chatrooms.map((chatroom) =>
      convertChatroomToConversation(chatroom)
    );
    setConversations(converted);
  }, [chatrooms]);

  const initChatrooms = async () => {
    await updateChatrooms();
    setIsLoading(false);
  };

  const updateChatrooms = async () => {
    if (Beoble && user) {
      const res = await Beoble.user.chatroom.get({
        user_id: user.user_id,
      });

      setChatrooms(res?.data ?? []);
    }
  };

  const convertChatroomToConversation = (
    chatroom: IChatRoom
  ): MessageConversationProps => {
    const { channel } = chatroom;

    if (!user) throw new Error('user is not initialized yet');
    const conversation_name = getChatroomName(chatroom, user?.user_id);
    const conversation_account = getChatroomMemberAccount(
      chatroom,
      user?.user_id
    );
    const lastMessage = getChatroomLatestMessage(chatroom);
    const timestamp = getUTCTimeStamp(channel.updated_at);

    return {
      timestamp,
      status: 'online',
      lastMessage,
      userName: conversation_name,
      profilePhoto: channel.representative_media_url
        ? channel.representative_media_url[0]
        : '',
      account: conversation_account,
      chatroomId: channel.id,
    };
  };

  return { chatrooms, conversations, isLoading, updateChatrooms };
};
