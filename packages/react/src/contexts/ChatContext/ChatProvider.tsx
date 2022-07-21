import { useEffect } from 'react';
import { FC, ReactNode, useState } from 'react';
import { Core, IChatRoom, IUser, Notification } from '@beoble/js-sdk';
import { useChatRooms } from '../../hooks/useChatRooms';
import useScreen from '../../hooks/commons/useScreen';
import { ChatContext } from './ChatContext';

export interface IChatProvider {
  children?: ReactNode;
  core: Core;
  user: IUser | null;
  notification?: Notification;
}

export const ChatProvider: FC<IChatProvider> = ({
  children,
  core,
  user,
  notification,
}) => {
  const [openedChats, setOpenedChats] = useState<string[]>([]);
  const screen = useScreen();
  const {
    updateChatrooms,
    addChatroom,
    updateChatroomRead,
    conversations,
    chatrooms,
    isLoading,
    unreadMessages,
  } = useChatRooms(core, user);

  const openChat = (chatroom_id: string) => {
    // console.log(screen?.width);
    if (!openedChats.includes(chatroom_id))
      setOpenedChats((prev) => [...prev, chatroom_id]);
  };

  const closeChat = (chatroom_id: string) => {
    setOpenedChats((prev) => prev.filter((chat) => chat !== chatroom_id));
  };

  useEffect(() => {
    if (notification) {
      notification.onMessage('NEW_MESSAGE', (data: IChatRoom) => {
        addChatroom(data);
      });
    }
  }, [notification]);

  return (
    <ChatContext.Provider
      value={{
        openChat,
        openedChats,
        closeChat,
        addChatroom,
        updateChatrooms,
        updateChatroomRead,
        conversations,
        isChatroomsLoading: isLoading,
        unreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
