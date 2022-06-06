import { useEffect } from 'react';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { useBeoble } from '../../hooks';
import { Colors } from '../../styles';
import MessageConversation from '../MessageConversation';
import MessageHeader from '../MessageHeader';

/* eslint-disable-next-line */
export interface MessageOverlayProps {
  conversations: Conversation[];
}

/* eslint-disable-next-line */
export interface Conversation {}

const MessageOverlayContainer = styled.aside`
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

  const { Beoble, user, initialize, isInitialized, address } = useBeoble();

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const test = async () => {
    if (Beoble && user) {
      const res = await Beoble.user.chatroom.get({
        user_id: user.user_id,
      });
      console.log(res);
    }
  };

  useEffect(() => {
    if (!isInitialized) initialize();
    if (isInitialized) test();
  }, [Beoble, user]);

  return (
    <MessageOverlayContainer>
      <MessageOverlayBubble isMinimized={isMinimized}>
        <MessageHeader
          status={'online'}
          {...{ isMinimized }}
          onMinimizeButtonClick={toggleMinimize}
          account={address ?? ''}
        ></MessageHeader>
        <ConversationContainer>
          <MessageConversation
            timestamp={1622801470000}
            profilePhoto=""
            status={'online'}
            lastMessage={'test'}
            userName={'Jungwoo Yun'}
            onClick={() => {
              console.log('hi');
            }}
          />
          <MessageConversation
            timestamp={1622801470000}
            status={'online'}
            lastMessage={'test'}
            userName={'Jungwoo Yun'}
            onClick={() => {
              console.log('hi');
            }}
          />
          <MessageConversation
            timestamp={1622801470000}
            status={'online'}
            lastMessage={'test'}
            userName={'Jungwoo Yun'}
            onClick={() => {
              console.log('hi');
            }}
          />
          <MessageConversation
            timestamp={1622801470000}
            status={'online'}
            lastMessage={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }
            userName={'Jungwoo Yun'}
            onClick={() => {
              console.log('hi');
            }}
          />
        </ConversationContainer>
      </MessageOverlayBubble>
    </MessageOverlayContainer>
  );
};

export default MessageOverlay;
