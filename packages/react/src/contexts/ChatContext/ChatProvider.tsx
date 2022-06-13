import { useEffect } from 'react';
import { FC, ReactNode, useState } from 'react';
import { useChatRooms } from '../../hooks/useChatRooms';
import useScreen from '../../hooks/useScreen';
import { ChatContext } from './ChatContext';

export interface IChatProvider {
  children?: ReactNode;
}

export const ChatProvider: FC<IChatProvider> = ({ children }) => {
  const [openedChats, setOpenedChats] = useState<string[]>([]);
  const screen = useScreen();
  const { updateChatrooms, conversations, chatrooms, isLoading } =
    useChatRooms();

  const openChat = (chatroom_id: string) => {
    // console.log(screen?.width);
    setOpenedChats((prev) => [...prev, chatroom_id]);
  };

  const closeChat = (chatroom_id: string) => {
    console.log(
      chatroom_id,
      openedChats,
      openedChats.filter((chat) => chat !== chatroom_id)
    );
    setOpenedChats((prev) => prev.filter((chat) => chat !== chatroom_id));
  };

  useEffect(() => {
    console.log(openedChats);
  }, [openedChats]);

  return (
    <ChatContext.Provider
      value={{
        openChat,
        openedChats,
        closeChat,
        updateChatrooms,
        conversations,
        isChatroomsLoading: isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
