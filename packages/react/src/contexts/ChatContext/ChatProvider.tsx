import { FC, ReactNode, useState } from 'react';
import useScreen from '../../hooks/useScreen';
import { ChatContext } from './ChatContext';

export interface IChatProvider {
  children?: ReactNode;
}

export const ChatProvider: FC<IChatProvider> = ({ children }) => {
  const [chatRooms, setCharRoomst] = useState([]);
  const [openedChat, setOpenedChat] = useState<string[]>([]);
  const screen = useScreen();

  const openChat = (chatroom_id: string) => {
    console.log(screen?.width);
    setOpenedChat((prev) => [...prev, chatroom_id]);
  };

  const closeChat = (chatroom_id: string) => {
    setOpenedChat((prev) => prev.filter((chat) => chat !== chatroom_id));
  };

  return (
    <ChatContext.Provider
      value={{
        openChat,
        openedChat,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
