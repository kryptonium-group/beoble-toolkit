import { ReactNode } from 'react';
import styled from 'styled-components';
import Identication from '../Identication';

/* eslint-disable-next-line */
export interface ButtonProps {
  children?: ReactNode;
}

const StyledButton = styled.button`
  color: pink;
  border: none;
  border-radius: 16px;
  padding: 0 12px;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;

export function Button({ children }: ButtonProps) {
  return (
    <StyledButton>
      <h2>{children}</h2>
      <IconWrapper>
        <Identication diameter={24} />
      </IconWrapper>
    </StyledButton>
  );
}

export default Button;
