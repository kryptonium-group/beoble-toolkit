import { useEffect, useState } from 'react';
import { Channel, IChat } from '@beoble/js-sdk';
import { useBeoble, useBeobleModal } from './useBeoble';
import { MessageProps } from '../components/Message';
import { isMinEqual } from '../utils';
import useChat from './useChat';
import {
  BeobleNotInitizliedError,
  ProviderNotInitializedError,
} from '../lib/Errors';

export const useChannel = (chatroomId: string) => {
  const { Beoble, user } = useBeoble();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [channel, setChannel] = useState<Channel>();
  const [isLoading, setIsLoading] = useState(true);
  const { updateChatrooms } = useChat();
  const { openRoute } = useBeobleModal();

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
      });

      chat.onMessage('NEW_MESSAGE', (data: IChat) => {
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
    if (!user) throw new BeobleNotInitizliedError();

    const { creator_user, create_time, content_text, chat_id } = chat;
    const previousChat = array[index - 1];

    const isMine = user.user_id === creator_user.user_id;

    const isSameUserWithPrevious = lastChat
      ? creator_user.user_id === lastChat.creator_user_id
      : creator_user.user_id === previousChat?.creator_user.user_id;

    const timestamp = create_time * 1000;
    const previousTimestamp = previousChat?.create_time * 1000 ?? 0;

    const isFollowing =
      isSameUserWithPrevious && isMinEqual(timestamp, previousTimestamp);

    return {
      isMine,
      isFollowing,
      content: content_text,
      timestamp,
      account: creator_user.wallets[0],
      userName: creator_user.display_name,
      chatId: chat_id,
      creator_user_id: creator_user.user_id,
      onUserClick: () => {
        openRoute(creator_user.user_id);
      },
    };
  };

  const concatMessages = (prev: MessageProps[], incoming: MessageProps[]) => {
    const firstPrevElem = prev.at(0);
    const lastIncomingElem = incoming.at(-1);
    if (!firstPrevElem) return incoming;
    if (!lastIncomingElem) return prev;
    if (checkIsFollowing(firstPrevElem, lastIncomingElem))
      lastIncomingElem.isFollowing = true;
    return incoming.concat(prev);
  };

  const checkIsFollowing = (prev: MessageProps, incoming: MessageProps) => {
    const isSameUser = prev.creator_user_id === incoming.creator_user_id;
    return isSameUser && isMinEqual(prev.timestamp, incoming.timestamp);
  };

  const updateMessage = (data: IChat[] | IChat) => {
    const messages = Array.isArray(data) ? data : [data];
    setMessages((prev) =>
      concatMessages(
        prev,
        messages.map((chat, index, array) =>
          convertChatToMessageProps(chat, index, array, prev.at(-1))
        )
      )
    );
  };

  const retrieveMessages = () => {
    const res: MessageProps[] = [];
    setMessages((prev) => concatMessages(res, prev));
  };

  const sendMessage = (content: string) => {
    if (!user)
      throw new Error('user should be initialized before sending message!');
    if (!content) return;
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
