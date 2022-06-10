import { IChatRoom, Core, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { MessageConversationProps } from '../components/MessageConversation';
import { useBeoble } from './useBeoble';

export const useChatRoom = () => {
  const { Beoble, user } = useBeoble();
  const [chatrooms, setChatrooms] = useState<IChatRoom[]>([]);
  const [conversations, setConversations] = useState<
    MessageConversationProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Beoble && user) getChatrooms(Beoble, user.user_id);
  }, [Beoble, user]);

  useEffect(() => {
    const converted = chatrooms.map((chatroom) =>
      convertChatroomToConversation(chatroom)
    );
    setConversations(converted);
  }, [chatrooms]);

  const getChatrooms = async (core: Core, user_id: string) => {
    const res = await core.user.chatroom.get({
      user_id,
    });
    setChatrooms(res.data);
    setIsLoading(false);
  };

  const convertChatroomToConversation = (
    chatroom: IChatRoom
  ): MessageConversationProps => {
    const {
      display_name,
      members,
      chatroom_type,
      representative_media_url,
      latest_chat,
      update_time,
      create_time,
      chatroom_id,
    } = chatroom;

    const conversation_name =
      chatroom_type === 'DIRECT_CHAT'
        ? filterOutUser(members)[0]?.display_name
        : display_name;

    const conversation_account =
      chatroom_type === 'DIRECT_CHAT'
        ? filterOutUser(members)[0].wallets[0]
        : '';

    return {
      timestamp: latest_chat[0]
        ? ~~latest_chat[0].create_time * 1000
        : ~~create_time,
      status: 'online',
      lastMessage:
        latest_chat.length > 0
          ? latest_chat[0].content_text
          : 'Type anything to start!',
      userName: conversation_name ?? 'empty',
      profilePhoto: representative_media_url[0] ?? '',
      account: conversation_account,
      chatroomId: chatroom_id,
    };
  };

  const filterOutUser = (members: IUser[]): IUser[] => {
    if (!user) throw new Error('user is not initialized yet');
    return members.filter((member) => member.user_id !== user.user_id);
  };

  return { chatrooms, conversations, isLoading };
};
