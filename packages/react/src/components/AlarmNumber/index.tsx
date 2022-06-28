import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { Colors, SizeProps } from '../../styles';

/* eslint-disable-next-line */
export interface AlarmNumberProps extends SizeProps {
  count: number;
  style?: CSSProperties;
}

const StyledAlarmNumber = styled.div<SizeProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${Colors.background.notification};
  border-radius: 50%;
  color: ${Colors.text.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: ${({ size = 20 }) => size * (2 / 3)}px;
  line-height: 1.5rem;
`;

export const AlarmNumber: FC<AlarmNumberProps> = ({
  count,
  style,
  size = 20,
}) => {
  return <StyledAlarmNumber {...{ style, size }}>{count}</StyledAlarmNumber>;
};

export default AlarmNumber;
