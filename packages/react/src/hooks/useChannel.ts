import { useEffect, useState } from 'react';
import { Channel, IChat } from '@beoble/js-sdk';
import { useBeoble } from './useBeoble';
import { MessageProps } from '../components/Message';
import { isMinEqual } from '../utils';
import useChat from './useChat';

export const useChannel = (chatroomId: string) => {
  const { Beoble, user } = useBeoble();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [channel, setChannel] = useState<Channel>();
  const [isLoading, setIsLoading] = useState(true);
  const { updateChatrooms } = useChat();

  useEffect(() => {
    if (Beoble && user) openChannel();
    return () => {
      channel?.close();
    };
  }, [Beoble, user, channel]);

  const openChannel = async () => {
    if (!channel) {
      const chat = Beoble!.chat.channel({
        chatroom_id: chatroomId,
      });

      chat.onMessage('RETRIEVED_MESSAGE', (data: IChat[]) => {
        updateMessage(data);
        updateChatrooms();
      });

      await chat.open();
      setIsLoading(false);
      setChannel(chat);
    }
  };

  const convertChatToMessageProps = (
    chat: IChat,
    index: number,
    array: IChat[],
    lastChat?: MessageProps
  ): MessageProps => {
    const {
      creator_user_id,
      create_time,
      content_text,
      chat_id,
      display_name,
    } = chat;
    const isMine = user!.user_id === creator_user_id;

    const isSameUserWithPrevious = lastChat
      ? creator_user_id === lastChat.creator_user_id
      : index > 0 && creator_user_id === array[index - 1].creator_user_id;

    const timestamp = ~~create_time * 1000;

    const previousTimestamp =
      index > 0 ? ~~array[index - 1].create_time * 1000 : 0;

    const isFollowing =
      isSameUserWithPrevious && isMinEqual(timestamp, previousTimestamp);

    return {
      isMine,
      isFollowing,
      content: content_text,
      timestamp,
      account: '',
      userName: display_name,
      chatId: chat_id,
      creator_user_id,
    };
  };

  const concatMessages = (prev: MessageProps[], incoming: MessageProps[]) => {
    const lastPrevElem = prev.at(-1);
    const firstIncomingElem = incoming.at(0);
    if (!lastPrevElem) return incoming;
    if (!firstIncomingElem) return prev;
    if (checkIsFollowing(lastPrevElem, firstIncomingElem))
      incoming[0].isFollowing = true;
    return prev.concat(incoming);
  };

  const checkIsFollowing = (prev: MessageProps, incoming: MessageProps) => {
    const isSameUser = prev.creator_user_id === incoming.creator_user_id;
    return isSameUser && isMinEqual(prev.timestamp, incoming.timestamp);
  };

  const updateMessage = (message: IChat[]) => {
    setMessages((prev) =>
      concatMessages(
        prev,
        message.map((chat, index, array) =>
          convertChatToMessageProps(chat, index, array, prev.at(-1))
        )
      )
    );
  };

  const sendMessage = (content: string) => {
    if (!user)
      throw new Error('user should be initialized before sending message!');
    if (channel) {
      channel.sendMessage({
        creator_user_id: user.user_id,
        chatroom_id: chatroomId,
        content_text: content,
      });
    }
  };

  return { sendMessage, openChannel, messages, isLoading };
};
