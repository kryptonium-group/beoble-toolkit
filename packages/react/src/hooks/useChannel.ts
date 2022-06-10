import { useEffect, useState } from 'react';
import { Channel, IChat } from '@beoble/js-sdk';
import { useBeoble } from './useBeoble';
import { MessageProps } from '../components/Message';
import { isMinEqual } from '../utils';
import { parse } from 'path';

export const useChannel = (chatroomId: string) => {
  const { Beoble, user } = useBeoble();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [channel, setChannel] = useState<Channel>();
  const [isLoading, setIsLoading] = useState(true);

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

      chat.on('message', (e: any) => {
        updateMessage(e.data);
      });

      await chat.open();
      setIsLoading(false);
      setChannel(chat);
    }
  };

  const convertChatToMessageProps = (
    chat: IChat,
    index: number,
    array: IChat[]
  ): MessageProps => {
    const { creator_user_id, create_time, content_text, chat_id } = chat;
    const isMine = user!.user_id === creator_user_id;
    const timestamp = ~~create_time * 1000;
    const previousTimestamp =
      index > 0 ? ~~array[index - 1].create_time * 1000 : 0;
    const isFollowing = isMinEqual(timestamp, previousTimestamp);
    return {
      isMine,
      isFollowing,
      content: content_text,
      timestamp,
      account: '',
      userName: isMine ? 'You' : '',
      chatId: chat_id,
    };
  };

  const updateMessage = (message: string) => {
    const parsed: IChat[] = JSON.parse(message);
    console.log(parsed);
    const converted = parsed.map(convertChatToMessageProps);
    setMessages((prev) => [...prev, ...converted]);
  };

  const sendMessage = (content: string) => {
    if (!user)
      throw new Error('user should be initialized before sending message!');
    if (channel)
      channel.sendMessage({
        creator_user_id: user.user_id,
        chatroom_id: chatroomId,
        content_text: content,
      });
  };

  return { sendMessage, openChannel, messages, isLoading };
};
