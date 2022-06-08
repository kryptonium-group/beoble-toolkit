import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Channel } from '@beoble/js-sdk';
import { useBeoble } from '../../hooks';
import { Colors } from '../../styles';
import Divider from '../Divider';
import Message from '../Message';
import MessageForm from '../MessageForm';
import { ChatHeader } from '../MessageHeader';
import { useChannel } from '../../hooks/useChannel';

export interface ConversationPopUpProps {
  chatroomId: string;
}

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  height: 400px;
  width: 336px;
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
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 0;
  position: relative;
`;

export const ConversationPopUp: FC<ConversationPopUpProps> = ({
  chatroomId,
}) => {
  const { channel, sendMessage } = useChannel(chatroomId);

  return (
    <Container>
      <ChatHeader status={'online'} account={''} />
      <ContentContainer>
        <MessageDisplayContainer>
          <MessageListScrollable>
            <Message isMine={true} isFollowing={true} content="hi" />
            <Message isMine={true} isFollowing={false} content="hi" />
            <Divider>Today</Divider>
            <Message isMine={false} isFollowing={true} content="hi" />
            <Message isMine={false} isFollowing={true} content="hi" />
            <Message isMine={false} isFollowing={false} content="hi" />
          </MessageListScrollable>
        </MessageDisplayContainer>
        <MessageForm onSend={sendMessage} />
      </ContentContainer>
    </Container>
  );
};

export default ConversationPopUp;
