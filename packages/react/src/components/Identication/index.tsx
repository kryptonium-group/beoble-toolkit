import styled from 'styled-components';
import jazzicon from '@metamask/jazzicon';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface IdenticationProps {
  diameter: number;
}

const StyledIdentication = styled.div<IdenticationProps>`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  color: pink;
`;

export function Identication({ diameter }: IdenticationProps) {
  const account = '0xb033fB14cF7Dc769488Ad34Ae90D4b3AD810BB25';
  const icon = jazzicon(diameter, parseInt(account.slice(2, 10), 16));
  const jazzconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    jazzconRef.current?.appendChild(icon);
  }, []);

  return (
    <StyledIdentication diameter={diameter}>
      <span ref={jazzconRef} />
    </StyledIdentication>
  );
}

export default Identication;
