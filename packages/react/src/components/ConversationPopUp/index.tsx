import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Picker from 'emoji-picker-react';
import { Colors } from '../../styles';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ChatHeader } from '../MessageHeader';
import { useChannel } from '../../hooks/useChannel';
import Spinner from '../Spinner';
import {
  useChatRoom,
  useChat,
  useBeobleModal,
  useFocus,
  useBeoble,
} from '../../hooks';

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

export const ConversationPopUp: FC<ConversationPopUpProps> = ({
  chatroomId,
}) => {
  const [messageFormRef, focusMessageForm] = useFocus<HTMLTextAreaElement>();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { sendMessage, messages, isLoading, markAsRead } =
    useChannel(chatroomId);
  const { closeChat, updateChatroomRead } = useChat();
  const { addRoute, open } = useBeobleModal();
  const {
    unreadMessages,
    chatroomAccount,
    chatroomName,
    otherMembers,
    chatroom,
  } = useChatRoom(chatroomId);

  // when user open conversaation
  // mark as read
  useEffect(() => {
    if (!isLoading && unreadMessages > 0) markAsRead();
  }, [isLoading, chatroom]);

  // whenever user focuses conversation
  // mark as read
  const handleFocus = async () => {
    console.log('focused');
    if (!isLoading && unreadMessages > 0) {
      const res = await markAsRead();
      updateChatroomRead(res.data);
      console.log(res);
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
  };

  const handleProfileClick = () => {
    if (otherMembers.length > 0) {
      addRoute(otherMembers[0].user.id);
      open();
    }
  };

  useEffect(() => {
    messageFormRef && focusMessageForm();
  }, [focusMessageForm, messageFormRef]);

  return (
    <Container
      {...{ isMinimized, isExpanded }}
      tabIndex={0}
      onClick={() => {
        focusMessageForm();
      }}
    >
      <ChatHeader
        status={'none'}
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
          <MessageListScrollable>
            {isLoading && (
              <SpinnerContainer>
                <Spinner color={Colors.background.messageTint} />
              </SpinnerContainer>
            )}
            {!isLoading &&
              messages.map((args) => <Message key={args.chatId} {...args} />)}
          </MessageListScrollable>
        </MessageDisplayContainer>
        <MessageForm
          onSend={sendMessage}
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
