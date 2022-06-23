import { IChatRoom, Core, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { MessageConversationProps } from '../components/MessageConversation';
import { useBeoble } from './useBeoble';

// TODO: need to handle group chat without display name
export const getChatroomName = (chatroom: IChatRoom, user_id: string) => {
  const { display_name, members, chatroom_type } = chatroom;
  const otherMembers = filterOutUser(members, user_id);
  const fistMemberName = otherMembers[0]
    ? otherMembers[0].display_name ?? otherMembers[0].wallets[0]
    : 'empty';

  return chatroom_type === 'DIRECT_CHAT' ? fistMemberName : display_name;
};

export const getChatroomMemberAccount = (
  chatroom: IChatRoom,
  user_id: string,
  index = 0
) => {
  const { members, chatroom_type } = chatroom;
  const otherMembers = filterOutUser(members, user_id);
  if (!otherMembers[index])
    throw new Error(`member at index ${index} does not exist!`);
  return chatroom_type === 'DIRECT_CHAT' ? otherMembers[index].wallets[0] : '';
};

export const getChatroomLatestMessage = (chatroom: IChatRoom) => {
  const { latest_chat } = chatroom;
  return latest_chat.length > 0
    ? latest_chat[0].content_text
    : 'Type anything to start!';
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
    const { representative_media_url, chatroom_id, latest_chat_time } =
      chatroom;

    if (!user) throw new Error('user is not initialized yet');
    const conversation_name = getChatroomName(chatroom, user?.user_id);
    const conversation_account = getChatroomMemberAccount(
      chatroom,
      user?.user_id
    );
    const lastMessage = getChatroomLatestMessage(chatroom);

    return {
      timestamp: latest_chat_time * 1000,
      status: 'online',
      lastMessage,
      userName: conversation_name,
      profilePhoto: representative_media_url[0] ?? '',
      account: conversation_account,
      chatroomId: chatroom_id,
    };
  };

  return { chatrooms, conversations, isLoading, updateChatrooms };
};
