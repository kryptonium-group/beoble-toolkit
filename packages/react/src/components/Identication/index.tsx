import styled from 'styled-components';
import jazzicon from '@metamask/jazzicon';
import { useEffect, useLayoutEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface IdenticationProps {
  diameter: number;
  account: string;
}

const StyledIdentication = styled.div<{ diameter: number }>`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  color: pink;
`;

export function Identication({ diameter, account }: IdenticationProps) {
  // const account = '0xb033fB14cF7Dc769488Ad34Ae90D4b3AD810BB25';
  const icon = jazzicon(diameter, parseInt(account.slice(2, 10), 16));
  const jazzconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const currentRef = jazzconRef.current;
    if (icon) {
      currentRef?.appendChild(icon);
      return () => {
        try {
          currentRef?.removeChild(icon);
        } catch (e) {
          console.error('Avatar icon not found');
        }
      };
    }
  }, [icon, jazzconRef]);

  return (
    <StyledIdentication diameter={diameter}>
      <span ref={jazzconRef} />
    </StyledIdentication>
  );
}

export default Identication;
