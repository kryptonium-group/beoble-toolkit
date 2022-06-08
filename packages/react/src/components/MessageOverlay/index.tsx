import { useEffect } from 'react';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { useBeoble } from '../../hooks';
import { Colors } from '../../styles';
import MessageConversation from '../MessageConversation';
import MessageHeader from '../MessageHeader';
import { useChatRoom } from '../../hooks/useChatRoom';

/* eslint-disable-next-line */
export interface MessageOverlayProps {
  conversations: Conversation[];
}

/* eslint-disable-next-line */
export interface Conversation {}

const MessageOverlayBubble = styled.div<{
  isMinimized: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  box-shadow: 0px 0px 0px 1px ${Colors.background.noneTintHover},
    0px 4px 4px ${Colors.background.shadow};
  background-color: ${Colors.background.white};
  flex: 0 0 288px;
  width: 288px;
  transform: translateY(0);
  // animation: fade-in 167ms cubic-bezier(0.4, 0, 1, 1);

  border-radius: 0.8rem 0.8rem 0 0;
  margin-left: 16px !important;

  transition: transform;
  transition-duration: 167ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  ${({ isMinimized }) =>
    isMinimized &&
    css`
      transform: translateY(100%) translateY(-48px);
    `}
`;

const ScrollSection = styled.section`
  overflow-y: auto;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  display: block;
`;

const ConversationContainer = styled.div``;

export const MessageOverlay: FC<MessageOverlayProps> = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  const { account } = useBeoble();
  const { conversations } = useChatRoom();

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const openChatRoom = (chatId: string) => {
    return;
  };

  return (
    <MessageOverlayBubble isMinimized={isMinimized}>
      <MessageHeader
        status={'online'}
        {...{ isMinimized }}
        onMinimizeButtonClick={toggleMinimize}
        account={account?.address ?? ''}
      ></MessageHeader>
      <ConversationContainer>
        {conversations.map((args) => (
          <MessageConversation {...args} />
        ))}
      </ConversationContainer>
    </MessageOverlayBubble>
  );
};

export default MessageOverlay;