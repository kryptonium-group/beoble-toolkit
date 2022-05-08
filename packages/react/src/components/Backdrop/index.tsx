import { ReactNode } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface BackdropProps {
  children: ReactNode;
}

const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  position: absolute;
  top: 0;
  right: 0;
`;

export function Backdrop({ children }: BackdropProps) {
  return <StyledBackdrop>{children}</StyledBackdrop>;
}

export default Backdrop;
