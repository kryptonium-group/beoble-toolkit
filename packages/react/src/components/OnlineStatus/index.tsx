import styled from 'styled-components';
import { SizeProps } from '../../styles';

/* eslint-disable-next-line */
export interface OnlineStatusProps extends SizeProps {
  status: Status;
}

export const OnlineStatus = styled.div<OnlineStatusProps>`
  background-color: ${({ status }) =>
    status === 'online' ? '#057642' : '#fff'};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  transition: background-color 167ms ease-in-out;
  box-sizing: border-box;
  box-shadow: 0 0 0 2px #fff;
  border: 3px solid #057642;
  ${({ status }) => status === 'none' && 'display: none'}
`;

export type Status = 'online' | 'mobile' | 'offline' | 'none';

export default OnlineStatus;
