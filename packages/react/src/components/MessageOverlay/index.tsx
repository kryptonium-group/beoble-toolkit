import { useEffect } from 'react';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { useBeoble } from '../../hooks';
import { Colors } from '../../styles';
import MessageConversation from '../MessageConversation';
import MessageHeader from '../MessageHeader';
import Spinner from '../Spinner';
import useChat from '../../hooks/useChat';

/* eslint-disable-next-line */
export interface MessageOverlayProps {
  onNewChatRoomClick?: () => void;
}

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
  display: block;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  overflow-y: auto;
  height: inherit;
`;

const ConversationContainer = styled.div``;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
`;

export const MessageOverlay: FC<MessageOverlayProps> = ({
  onNewChatRoomClick,
}) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const { account } = useBeoble();
  const { conversations, isChatroomsLoading } = useChat();

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <MessageOverlayBubble isMinimized={isMinimized}>
      <MessageHeader
        status={'online'}
        {...{ isMinimized }}
        onMinimizeButtonClick={toggleMinimize}
        onHeaderClick={toggleMinimize}
        account={account?.address ?? ''}
        {...{ onNewChatRoomClick }}
      />

      {isChatroomsLoading && (
        <SpinnerContainer>
          <Spinner color={Colors.background.messageTint} />
        </SpinnerContainer>
      )}
      <ScrollSection>
        <ConversationContainer>
          {conversations.map((args) => (
            <MessageConversation {...args} />
          ))}
        </ConversationContainer>
      </ScrollSection>
    </MessageOverlayBubble>
  );
};

export default MessageOverlay;
