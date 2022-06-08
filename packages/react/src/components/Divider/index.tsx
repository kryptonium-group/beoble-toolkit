import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles';

export interface DividerProps {
  children?: ReactNode;
  lineColor?: string;
  color?: string;
  margin?: string;
}

const DivderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 auto;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Line = styled.div`
  height: 2px;
  background-color: ${Colors.background.noneTintHover};
  flex: 1;
`;

const TitleContainer = styled.div`
  margin: 0px 10px;
  color: ${Colors.text.normal};
`;

export const Divider: FC<DividerProps> = ({ children }) => {
  return (
    <DivderContainer>
      <Line />
      {children && <TitleContainer>{children}</TitleContainer>}
      <Line />
    </DivderContainer>
  );
};

export default Divider;
