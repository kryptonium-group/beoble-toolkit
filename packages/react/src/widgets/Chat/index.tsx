import { useState } from 'react';
import styled from 'styled-components';
import ConversationPopUp from '../../components/ConversationPopUp';
import MessageOverlay, { Conversation } from '../../components/MessageOverlay';

/* eslint-disable-next-line */
export interface ChatProps {}

const ChatContainer = styled.div`
  box-sizing: border-box;
  height: 0;
  position: fixed;
  z-index: 1000;
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

export function Chat(props: ChatProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  return (
    <ChatContainer>
      <MessageOverlay {...{ conversations }} />
      <ConversationPopUp chatroomId={''} />
    </ChatContainer>
  );
}

export default Chat;
