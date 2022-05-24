import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';

/* eslint-disable-next-line */
export interface SpinnerProps {
  size?: number;
  color?: string;
}

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<SpinnerProps>`
  height: ${({ size = 30 }) => size}px;
  width: ${({ size = 30 }) => size}px;
  border: 1px solid ${({ color = '#333' }) => color};
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`;

export default Spinner;
