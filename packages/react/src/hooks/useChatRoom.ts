import { IChatRoom, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import {
  getChatroomMemberAccount,
  getChatroomName,
  getChatroomUndreadCount,
} from '../utils/chatroomUtil';
import { useBeoble } from './useBeoble';

export const useChatRoom = (chatroom_id: string) => {
  const { Beoble, user } = useBeoble();
  const [chatroom, setChatroom] = useState<IChatRoom>();
  const [isLoading, setIsLoading] = useState(true);

  const chatroomAccount =
    chatroom && user ? getChatroomMemberAccount(chatroom, user.id) : '';

  const chatroomName =
    chatroom && user ? getChatroomName(chatroom, user.id) : 'Loading...';

  const otherMembers =
    chatroom && user
      ? chatroom?.members.filter((member) => member.user_id !== user?.id)
      : [];

  const unreadMessages =
    chatroom && user ? getChatroomUndreadCount(chatroom, user.id) : 0;

  useEffect(() => {
    updateChatroom();
  }, [Beoble]);

  const updateChatroom = async () => {
    setIsLoading(true);
    const res = await Beoble.chatroom.get({
      chatroom_id,
    });
    console.log(res);
    setChatroom(res.data.length > 0 ? res.data[0] : undefined);
    setIsLoading(false);
  };

  return {
    chatroom,
    isLoading,
    updateChatroom,
    chatroomAccount,
    chatroomName,
    otherMembers,
    unreadMessages,
    setChatroom,
  };
};
