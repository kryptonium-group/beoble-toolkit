import { IChatRoom, Core, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { MessageConversationProps } from '../components/MessageConversation';
import { Status } from '../components/OnlineStatus';
import { getUTCTimeStamp } from '../utils';
import {
  getChatroomLatestMessage,
  getChatroomMemberAccount,
  getChatroomName,
  getChatroomUndreadCount,
} from '../utils/chatroomUtil';
import { getUserOnlineStatus } from '../utils/userUtil';

export const useChatRooms = (Beoble: Core, user: IUser | null) => {
  const [chatrooms, setChatrooms] = useState<IChatRoom[]>([]);
  const [conversations, setConversations] = useState<
    MessageConversationProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (user) initChatrooms();
  }, [Beoble, user]);

  useEffect(() => {
    const converted = chatrooms.map((chatroom) =>
      convertChatroomToConversation(chatroom)
    );
    if (user) {
      const totalUnreadMessages = chatrooms.reduce(
        (prev, cur) => prev + getChatroomUndreadCount(cur, user.id),
        0
      );
      setUnreadMessages(totalUnreadMessages);
    }
    setConversations(converted);
  }, [chatrooms]);

  const initChatrooms = async () => {
    await updateChatrooms();
    setIsLoading(false);
  };

  const updateChatrooms = async () => {
    if (user) {
      const res = await Beoble.user.chatroom.get({
        user_id: user.id,
      });
      console.log(res);
      setChatrooms(res?.data ?? []);
    }
  };

  const addChatroom = (chatroomToAdd: IChatRoom) => {
    const filteredChatrooms = chatrooms.filter(
      (prevChatroom) => prevChatroom.channel.id === chatroomToAdd.channel.id
    );
    filteredChatrooms.unshift(chatroomToAdd);
    setChatrooms(filteredChatrooms);
  };

  const updateChatroomRead = (chatroom: IChatRoom) => {
    setChatrooms((prevs) =>
      prevs.map((prev) => {
        if (prev.channel.id === chatroom.channel.id) return chatroom;
        else return prev;
      })
    );
  };

  const convertChatroomToConversation = (
    chatroom: IChatRoom
  ): MessageConversationProps => {
    const { channel, members } = chatroom;

    if (!user) throw new Error('user is not initialized yet');
    const conversation_name = getChatroomName(chatroom, user?.id);
    const conversation_account = getChatroomMemberAccount(chatroom, user?.id);
    const lastMessage = getChatroomLatestMessage(chatroom);
    const timestamp = getUTCTimeStamp(
      channel.last_message_at ?? channel.created_at
    );
    const unreadMessages = getChatroomUndreadCount(chatroom, user?.id);
    const otherMember = members.filter(
      (member) => member.user_id !== user.id
    )[0];
    const status: Status =
      channel.chatroom_type === 'DIRECT_CHAT'
        ? otherMember.user.public_key
          ? getUserOnlineStatus(otherMember.user)
            ? 'online'
            : 'offline'
          : 'none'
        : 'none';

    return {
      timestamp,
      status,
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
    updateChatroomRead,
    unreadMessages,
  };
};
