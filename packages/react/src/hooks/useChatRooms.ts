import { IChatRoom, Core, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { MessageConversationProps } from '../components/MessageConversation';
import { getUTCTimeStamp } from '../utils';
import {
  getChatroomLatestMessage,
  getChatroomMemberAccount,
  getChatroomName,
  getChatroomUndreadCount,
} from '../utils/chatroomUtil';

export const useChatRooms = (Beoble: Core | null, user: IUser | null) => {
  const [chatrooms, setChatrooms] = useState<IChatRoom[]>([]);
  const [conversations, setConversations] = useState<
    MessageConversationProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (Beoble && user) initChatrooms();
  }, [Beoble, user]);

  useEffect(() => {
    const converted = chatrooms.map((chatroom) =>
      convertChatroomToConversation(chatroom)
    );
    if (user) {
      const totalUnreadMessages = chatrooms.reduce(
        (prev, cur) => prev + getChatroomUndreadCount(cur, user?.id),
        0
      );
      setUnreadMessages(totalUnreadMessages);
    }
    setConversations(converted);
  }, [chatrooms, user]);

  const initChatrooms = async () => {
    await updateChatrooms();
    setIsLoading(false);
  };

  const updateChatrooms = async () => {
    if (Beoble && user) {
      const res = await Beoble.user.chatroom.get({
        user_id: user.id,
      });
      console.log(res);
      setChatrooms(res?.data ?? []);
    }
  };

  const addChatroom = (chatroom: IChatRoom) => {
    const filteredChatrooms = chatrooms.filter(
      (obj) => obj.channel.id !== chatroom.channel.id
    );
    filteredChatrooms.unshift(chatroom);
    setChatrooms(filteredChatrooms);
  };

  const convertChatroomToConversation = (
    chatroom: IChatRoom
  ): MessageConversationProps => {
    const { channel } = chatroom;

    if (!user) throw new Error('user is not initialized yet');
    const conversation_name = getChatroomName(chatroom, user?.id);
    const conversation_account = getChatroomMemberAccount(chatroom, user?.id);
    const lastMessage = getChatroomLatestMessage(chatroom);
    const timestamp = getUTCTimeStamp(
      channel.last_message_at ?? channel.created_at
    );
    const unreadMessages = getChatroomUndreadCount(chatroom, user?.id);

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
      unreadMessages,
    };
  };

  return {
    chatrooms,
    conversations,
    isLoading,
    updateChatrooms,
    addChatroom,
    unreadMessages,
  };
};
