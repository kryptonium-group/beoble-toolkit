import styled from 'styled-components';
import Identication from '../Identication';

/* eslint-disable-next-line */
export interface ButtonProps {}

const StyledButton = styled.button`
  color: pink;
  border: none;
  border-radius: 16px;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Button(props: ButtonProps) {
  return (
    <StyledButton>
      <h1>Welcome to Button!</h1>
      <IconWrapper>
        <Identication diameter={24} />
      </IconWrapper>
    </StyledButton>
  );
}

export default Button;
