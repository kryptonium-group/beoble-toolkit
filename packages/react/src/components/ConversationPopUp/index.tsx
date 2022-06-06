import styled from 'styled-components';
import { Colors } from '../../styles';
import MessageForm from '../MessageForm';
import { ChatHeader } from '../MessageHeader';

/* eslint-disable-next-line */
export interface ConversationPopUpProps {}

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 0;
  position: relative;
`;

export function ConversationPopUp(props: ConversationPopUpProps) {
  return (
    <Container>
      <ChatHeader status={'online'} account={''} />
      <ContentContainer>
        <MessageDisplayContainer></MessageDisplayContainer>
        <MessageForm />
      </ContentContainer>
    </Container>
  );
}

export default ConversationPopUp;
