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
  };

  const convertChatroomToConversation = (
    chatrooms: IChatRoom
  ): MessageConversationProps => {
    const { description, members, chatroom_type, latest_chat, update_time } =
      chatrooms;
    const audience = filterOutUser(members);
    const messageConversation: MessageConversationProps = {
      timestamp: new Date(update_time).getTime(),
      status: 'online',
      lastMessage:
        latest_chat.length > 0
          ? latest_chat[0].content_text
          : 'Type anything to start!',
      userName: filterOutUser(members)[0]?.display_name ?? 'empty',
      onClick: () => {
        console.log('hi');
      },
    };

    return messageConversation;
  };

  const filterOutUser = (members: IUser[]): IUser[] => {
    if (!user) throw new Error('user is not initialized yet');
    return members.filter((member) => member.user_id !== user.user_id);
  };

  return { chatrooms, conversations };
};
