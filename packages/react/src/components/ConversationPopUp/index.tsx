import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ConversationPopUpProps {}

const StyledConversationPopUp = styled.div`
  color: pink;
`;

export function ConversationPopUp(props: ConversationPopUpProps) {
  return (
    <StyledConversationPopUp>
      <h1>Welcome to ConversationPopUp!</h1>
    </StyledConversationPopUp>
  );
}

export default ConversationPopUp;
