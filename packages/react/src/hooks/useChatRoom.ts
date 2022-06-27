import { IChatRoom, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { useBeoble } from './useBeoble';
import {
  filterOutUser,
  getChatroomMemberAccount,
  getChatroomName,
} from './useChatRooms';

export const useChatRoom = (chatroom_id: string) => {
  const { Beoble, user } = useBeoble();
  const [chatroom, setChatroom] = useState<IChatRoom>();
  const [isLoading, setIsLoading] = useState(true);

  const chatroomAccount =
    chatroom && user ? getChatroomMemberAccount(chatroom, user.id) : '';

  const chatroomName =
    chatroom && user ? getChatroomName(chatroom, user.id) : '';

  const otherMembers =
    chatroom && user
      ? chatroom?.members.filter((member) => member.user_id === user?.id)
      : [];

  useEffect(() => {
    if (Beoble) updateChatroom(chatroom_id);
  }, [Beoble]);

  const updateChatroom = async (chatroom_id: string) => {
    if (!Beoble)
      throw new Error('Beoble core should be initialzed before calling API');
    const res = await Beoble.chatroom.get({
      chatroom_id,
    });
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
  };
};
