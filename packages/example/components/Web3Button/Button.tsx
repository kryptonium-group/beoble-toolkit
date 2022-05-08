import React, { CSSProperties, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../../styles';

interface ButtonStyleProps {
  backgroundColor?: string;
  color?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  hover?: boolean;
}

const StyledButton = styled.button<ButtonStyleProps>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? Colors.neutral[2]};
  color: ${({ color }) => color ?? Colors.text.lighten};
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 12px;
  margin-right: 4px;
  cursor: pointer;
  ${({ hover, hoverBackgroundColor, hoverColor }) =>
    hover
      ? css`
          &:hover {
            background-color: ${hoverBackgroundColor ?? Colors.neutral[3]};
            color: ${hoverColor ?? Colors.text.highlight};
          }
        `
      : ''}
`;

interface ButtonProps extends ButtonStyleProps {
  icon?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  className,
  onClick,
  backgroundColor,
  color,
  hover,
  hoverBackgroundColor,
  hoverColor,
}) => {
  return (
    <StyledButton
      className={className}
      style={style}
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      hoverBackgroundColor={hoverBackgroundColor}
      hoverColor={hoverColor}
      hover={hover}
    >
      {children}
    </StyledButton>
  );
};
