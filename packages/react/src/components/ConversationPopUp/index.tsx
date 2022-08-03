import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { IUser } from '@beoble/js-sdk';
import { Colors } from '../../styles';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ChatHeader } from '../MessageHeader';
import { useChannel } from '../../hooks/useChannel';
import Spinner from '../Spinner';
import { useChatRoom, useChat, useBeobleModal, useFocus } from '../../hooks';
import { Status } from '../OnlineStatus';
import { useDebounceCallback } from '../../hooks/commons/useDebounce';
import { getUserOnlineStatus } from '../../utils/userUtil';
import { BiLock } from 'react-icons/bi';
import Button from '../Button';
import { channel } from 'diagnostics_channel';

export interface ConversationPopUpProps {
  chatroomId: string;
}

const Container = styled.div<{ isMinimized: boolean; isExpanded: boolean }>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  ${({ isExpanded }) => (isExpanded ? enlargedContainer : normalContainer)}

  background-color: ${Colors.background.white};
  display: flex;
  flex: 0 0 auto;
  max-height: calc(100vh - 100px);
  box-shadow: 0px 0px 0px 1px ${Colors.background.noneTintHover},
    0px 4px 4px ${Colors.background.shadow};
  flex-direction: column;

  transform: translateY(0);
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 167ms;

  border-radius: 0.8rem 0.8rem 0 0;

  margin-left: 16px;

  ${({ isMinimized }) => isMinimized && minimizedContainer}
`;

const minimizedContainer = css`
  width: 216px;
  transform: translateY(100%) translateY(-48px);
  transition-duration: 167ms;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
`;

const normalContainer = css`
  height: 400px;
  width: 336px;
`;

const enlargedContainer = css`
  height: 696px;
  width: 500px;
`;

const MessageDisplayContainer = styled.div`
  display: flex;
  margin-bottom: auto;
  position: relative;
  flex: 1 0 0px;
  overflow-y: hidden;
  flex-direction: column;
`;

const MessageListScrollable = styled.div`
  width: calc(100% - 16px);
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  justify-content: flex-start;
  overflow-y: auto;
  min-height: auto;
  padding: 0px 8px;
  box-sizing: content-box;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 0;
  position: relative;
`;

const SpinnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const LockContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ConversationPopUp: FC<ConversationPopUpProps> = ({
  chatroomId,
}) => {
  const [messageFormRef, focusMessageForm] = useFocus<HTMLTextAreaElement>();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    sendMessage,
    sendImage,
    retrieveMessages,
    messages,
    isLoading,
    markAsRead,
    setSecretKey,
  } = useChannel(chatroomId);
  const { closeChat, updateChatroomRead } = useChat();
  const { addRoute, open } = useBeobleModal();
  const {
    unreadMessages,
    chatroomAccount,
    chatroomName,
    otherMembers,
    chatroom,
    setChatroom,
    decryptChatRoomKey,
  } = useChatRoom(chatroomId);
  const scrollRef = useRef<HTMLDivElement>(null);

  // when user open conversaation
  // mark as read
  useEffect(() => {
    markAsReadAndUpdate();
  }, [isLoading, chatroom]);

  // whenever user focuses conversation
  // mark as read
  const handleFocus = async () => {
    markAsReadAndUpdate();
  };

  const markAsReadAndUpdate = async () => {
    if (!isLoading && unreadMessages > 0) {
      const res = await markAsRead();
      console.log('mark as read', res);
      updateChatroomRead(res.data);
      setChatroom(res.data);
    }
  };

  const handleCloseChat = useCallback(() => {
    closeChat(chatroomId);
  }, [chatroomId]);

  const handleHeaderClick = () => {
    setIsMinimized(!isMinimized);
  };

  const handleExpandChat = () => {
    setIsExpanded(!isExpanded);
    focusMessageForm();
  };

  const handleProfileClick = () => {
    if (otherMembers.length > 0) {
      addRoute(otherMembers[0].user.id);
      open();
    }
  };

  const handleScroll = useDebounceCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (scrollRef.current) {
        const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
        const scrollableHeight = scrollHeight - clientHeight;
        if (Math.abs(scrollTop / scrollableHeight) === 1) {
          if (messages.length > 0) {
            retrieveMessages(messages.at(-1)!.created_at);
          }
        }
      }
    },
    500,
    [messages, scrollRef.current]
  );

  // focus on mount
  useEffect(() => {
    messageFormRef && focusMessageForm();
  }, [focusMessageForm, messageFormRef]);

  const getChatroomUserStatus = (): Status => {
    if (chatroom?.channel.chatroom_type !== 'DIRECT_CHAT') return 'none';
    const otherUser = otherMembers[0].user;
    return otherUser.public_key
      ? getUserOnlineStatus(otherUser)
        ? 'online'
        : 'offline'
      : 'none';
  };

  const handleDecrypt = async () => {
    const chatroomKey = await decryptChatRoomKey();
    setSecretKey(chatroomKey);
  };

  return (
    <Container
      {...{ isMinimized, isExpanded }}
      tabIndex={0}
      onClick={() => {
        focusMessageForm();
      }}
    >
      <ChatHeader
        status={getChatroomUserStatus()}
        account={chatroomAccount}
        userName={chatroomName}
        onClose={handleCloseChat}
        onHeaderClick={handleHeaderClick}
        onExpand={handleExpandChat}
        onProfileClick={handleProfileClick}
        {...{ isMinimized, isExpanded, unreadMessages }}
      />
      <ContentContainer>
        <MessageDisplayContainer>
          <MessageListScrollable ref={scrollRef} onScroll={handleScroll}>
            {
              <LockContainer>
                <BiLock size={42} />
                <p style={{ marginBottom: 8 }}>Your content is secured</p>
                <Button onClick={handleDecrypt} disabled={isLoading}>
                  Decrypt
                </Button>
              </LockContainer>
            }
            {/* {isLoading ? (
              <SpinnerContainer>
                <Spinner color={Colors.background.messageTint} />
              </SpinnerContainer>
            ) : (
              messages.map((args) => <Message key={args.chatId} {...args} />)
            )} */}
          </MessageListScrollable>
        </MessageDisplayContainer>
        <MessageForm
          onSend={sendMessage}
          onImageSend={sendImage}
          disabled={isLoading}
          onFocus={handleFocus}
          ref={messageFormRef}
          autoFocus
        />
      </ContentContainer>
    </Container>
  );
};

export default ConversationPopUp;
