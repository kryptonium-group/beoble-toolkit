import { useEffect, useState } from 'react';
import { BeobleSDK, Channel, IChat } from '@beoble/js-sdk';
import { useBeoble, useBeobleModal } from './useBeoble';
import { MessageProps } from '../components/Message';
import { getUTCTimeStamp, isMinEqual } from '../utils';
import { BeobleNotInitizliedError } from '../lib/Errors';
import { Status } from '../components/OnlineStatus';

export const useChannel = (chatroomId: string) => {
  const { Beoble, user } = useBeoble();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [channel, setChannel] = useState<Channel>();
  const [isLoading, setIsLoading] = useState(true);
  const { openRoute } = useBeobleModal();

  useEffect(() => {
    if (user) openChannel();
    return () => {
      channel?.close();
    };
  }, [user, channel]);

  const openChannel = async () => {
    if (!channel) {
      const chat = Beoble.chat.channel({
        chatroom_id: chatroomId,
      });

      chat.onMessage('RETRIEVED_MESSAGE', (data: IChat[]) => {
        updateMessage(data);
      });

      chat.onMessage('NEW_MESSAGE', (data: IChat) => {
        updateMessage(data);
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

    const { creator_user_id, created_at, text, id, user: creator } = chat;
    const previousChat = array[index - 1];
    const isMine = user.id === creator_user_id;

    const isSameUserWithPrevious = lastChat
      ? creator_user_id === lastChat.creator_user_id
      : creator_user_id === previousChat?.creator_user_id;

    const timestamp = getUTCTimeStamp(created_at);
    const previousTimestamp = getUTCTimeStamp(previousChat?.created_at) ?? 0;

    const isFollowing =
      isSameUserWithPrevious && isMinEqual(timestamp, previousTimestamp);

    const status: Status = creator.public_key
      ? creator.online
        ? 'online'
        : 'offline'
      : 'none';

    return {
      isMine,
      isFollowing,
      content: text,
      timestamp,
      account: creator.wallets[0],
      userName: creator.display_name,
      chatId: id,
      creator_user_id,
      onUserClick: () => {
        openRoute(creator_user_id);
      },
      status,
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
        creator_user_id: user.id,
        chatroom_id: chatroomId,
        text: content,
      });
    }
  };

  const markAsRead = async () => {
    if (!user) throw new BeobleNotInitizliedError();
    await BeobleSDK.utils.until(() => isLoading === false);
    const last_message = messages.at(0);
    if (!last_message) return;
    const res = await Beoble.chatroom.chat.markAsRead({
      chat_id: last_message.chatId,
      chatroom_id: chatroomId,
      user_id: user.id,
    });
    return res;
  };

  return { sendMessage, openChannel, messages, isLoading, markAsRead };
};
