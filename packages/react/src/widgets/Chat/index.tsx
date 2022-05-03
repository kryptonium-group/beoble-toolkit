import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ChatProps {}

const StyledChat = styled.div`
  color: pink;
`;

export function Chat(props: ChatProps) {
  return (
    <StyledChat>
      <h1>Welcome to Chat!</h1>
    </StyledChat>
  );
}

export default Chat;
