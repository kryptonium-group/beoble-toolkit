import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import ConversationPopUp from '../../components/ConversationPopUp';
import MessageOverlay, { Conversation } from '../../components/MessageOverlay';
import useChat from '../../hooks/useChat';
import { zIndex } from '../../styles';

/* eslint-disable-next-line */
export interface ChatProps {}

const ChatContainer = styled.div`
  box-sizing: border-box;
  height: 0;
  position: fixed;
  z-index: ${zIndex.messages};
  bottom: 0;
  right: 0;
  overflow: visible;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  align-items: flex-end;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const Chat: FC<ChatProps> = () => {
  const { openedChats } = useChat();
  useEffect(() => {
    console.log(openedChats);
  }, [openedChats]);

  return (
    <ChatContainer>
      <MessageOverlay />
      {openedChats.length > 0 &&
        openedChats.map((chat) => (
          <ConversationPopUp chatroomId={chat} key={chat} />
        ))}
    </ChatContainer>
  );
};

export default Chat;
