import {
  cloneElement,
  ComponentProps,
  ComponentPropsWithoutRef,
  HTMLProps,
  ReactElement,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import { JsxElement } from 'typescript';
import { SizeProps } from '../../styles';
import Button from '../Button';

/* eslint-disable-next-line */
export interface IconButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    SizeProps {
  children: ReactElement;
}

const StyledIconButton = styled(Button)<SizeProps>`
  color: #00000099;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;
  background: transparent;
  transition: background-color 0.2s ease-out;
  padding: 0 !important;

  &:hover {
    background-color: #00000014;
  }
`;

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  size,
  ...buttonProps
}) => {
  return (
    <StyledIconButton size={size} {...buttonProps}>
      {cloneElement(children, { size: size ? size / 2 : size })}
    </StyledIconButton>
  );
};

export default IconButton;
