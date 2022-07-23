import { Core, IChatRoom, IUser } from '@beoble/js-sdk';
import { useQuery } from './commons';

export const useChatroomsQuery = (Beoble: Core, user?: IUser) => {
  const [chatroomState, chatroomQuery] = useQuery([
    {
      key: 'get',
      reducer: async () => {
        if (!user) throw new Error('');
        const { data } = await Beoble.user.chatroom.get({
          user_id: user.id,
        });
        return data;
      },
    },
    {
      key: 'unshift',
      reducer: (prev, arg: IChatRoom) => {
        if (!prev) return [arg];
        const filtered = prev.filter(
          (chatroom) => chatroom.channel.id !== arg.channel.id
        );
        filtered.unshift(arg);
        return filtered;
      },
    },
    {
      key: 'replace',
      reducer: (prev, arg: IChatRoom) => {
        if (!prev)
          throw new Error(
            "can't perform replacement if there is no prev state"
          );
        return prev.map((chatroom) => {
          if (chatroom.channel.id === arg.channel.id) return chatroom;
          else return chatroom;
        });
      },
    },
  ]);

  const getChatrooms = () => chatroomQuery('get');

  const unshiftChatroom = (chatroom: IChatRoom) =>
    chatroomQuery('unshift', chatroom);

  const replaceChatroom = (chatroom: IChatRoom) =>
    chatroomQuery('replace', chatroom);

  return { chatroomState, getChatrooms, unshiftChatroom, replaceChatroom };
};
