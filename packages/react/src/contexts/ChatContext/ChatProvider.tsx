import { useEffect } from 'react';
import { FC, ReactNode, useState } from 'react';
import { Core, IUser, Notification } from '@beoble/js-sdk';
import { useChatRooms } from '../../hooks/useChatRooms';
import useScreen from '../../hooks/useScreen';
import { ChatContext } from './ChatContext';

export interface IChatProvider {
  children?: ReactNode;
  core: Core | null;
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

  return (
    <ChatContext.Provider
      value={{
        openChat,
        openedChats,
        closeChat,
        updateChatrooms,
        conversations,
        isChatroomsLoading: isLoading,
        unreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
