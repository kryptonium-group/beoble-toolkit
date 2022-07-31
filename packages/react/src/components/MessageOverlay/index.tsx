import { useCallback, useEffect } from 'react';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { useBeoble } from '../../hooks';
import { Colors } from '../../styles';
import MessageConversation from '../MessageConversation';
import MessageHeader from '../MessageHeader';
import Spinner from '../Spinner';
import useChat from '../../hooks/useChat';
import { Status } from '../OnlineStatus';
import { getUserOnlineStatus } from '../../utils/userUtil';
import { BiLock } from 'react-icons/bi';
import Button from '../Button';

/* eslint-disable-next-line */
export interface MessageOverlayProps {
  onNewChatRoomClick?: () => void;
}

const MessageOverlayBubble = styled.div<{
  isMinimized: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: calc(90vh - 100px);
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

const ConversationContainer = styled.div<{ blured: boolean }>`
  ${({ blured }) => (blured ? `filter: blur(4px)` : 'none')};
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  position: absolute;
`;

const LockContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
`;

const Locker = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  margin-bottom: 20px;
`;

export const MessageOverlay: FC<MessageOverlayProps> = ({
  onNewChatRoomClick,
}) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const { account, hasNewMessage, user, registerUser } = useBeoble();
  const { conversations, isChatroomsLoading, unreadMessages } = useChat();

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getUserStatus = useCallback((): Status => {
    if (!user) return 'none';
    return user.public_key
      ? getUserOnlineStatus(user)
        ? 'online'
        : 'offline'
      : 'none';
  }, [user]);

  return (
    <MessageOverlayBubble isMinimized={isMinimized}>
      <MessageHeader
        status={getUserStatus()}
        {...{ isMinimized }}
        onMinimizeButtonClick={toggleMinimize}
        onHeaderClick={toggleMinimize}
        account={account?.address ?? ''}
        {...{ onNewChatRoomClick, unreadMessages, hasNewMessage }}
      />

      <ScrollSection>
        {user?.public_key && isChatroomsLoading && (
          <SpinnerContainer>
            <Spinner color={Colors.background.messageTint} />
          </SpinnerContainer>
        )}
        {!user?.public_key && (
          <LockContainer>
            <Locker>
              <BiLock size={42} />
              <p style={{ marginBottom: 8, fontWeight: 'bold' }}>
                Register To See Messages
              </p>
              <Button onClick={registerUser}>Register</Button>
            </Locker>
          </LockContainer>
        )}
        <ConversationContainer blured={!user?.public_key}>
          {conversations.map((args) => (
            <MessageConversation {...args} key={args.chatroomId} />
          ))}
        </ConversationContainer>
      </ScrollSection>
    </MessageOverlayBubble>
  );
};

export default MessageOverlay;
