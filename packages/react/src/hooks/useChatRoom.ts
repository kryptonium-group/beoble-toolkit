import { IChatRoom, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { Encrypter } from '../../../../dist/packages/js-sdk/src/core/encryption';
import {
  getChatroomMemberAccount,
  getChatroomName,
  getChatroomUndreadCount,
} from '../utils/chatroomUtil';
import { useBeoble } from './useBeoble';

export const useChatRoom = (chatroom_id: string) => {
  const { Beoble, user, account } = useBeoble();
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

  const decryptChatRoomKey = async () => {
    if (chatroom && user) {
      const key = chatroom.channel.keys.at(-1)?.user_id_to_key_map[user.id];
      if (key && account?.address) {
        const encrypter = new Encrypter();
        const chatroomKey = await encrypter.ethDecrypt(key, account.address);
        console.log(chatroomKey);
        return chatroomKey;
      } else {
        throw new Error(`user with id ${user.id} has no permission to access`);
      }
    } else {
      throw new Error(`chatroom and user should be initialized first`);
    }
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
    decryptChatRoomKey,
  };
};
