import { useEffect, useState } from 'react';
import { Channel } from '@beoble/js-sdk';
import { useBeoble } from './useBeoble';

export const useChannel = (chatroomId: string) => {
  const { Beoble, user } = useBeoble();
  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (Beoble) openChannel();
    return () => {
      channel?.close();
    };
  }, [Beoble]);

  const openChannel = async () => {
    const channel = Beoble!.chat.channel({
      chatroom_id: chatroomId,
    });
    await channel.open();
    setChannel(channel);
  };

  const sendMessage = (content: string) => {
    if (channel && user)
      channel.sendMessage({
        creator_user_id: user.user_id,
        chatroom_id: chatroomId,
        content_text: content,
      });
  };

  return { channel, sendMessage, openChannel };
};
