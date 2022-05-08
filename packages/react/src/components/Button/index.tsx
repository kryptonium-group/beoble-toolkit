import { ReactNode } from 'react';
import styled from 'styled-components';
import Identication from '../Identication';

/* eslint-disable-next-line */
export interface ButtonProps {
  children?: ReactNode;
}

export const Button = styled.button`
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;

export default Button;
