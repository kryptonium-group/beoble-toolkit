import styled, { css } from 'styled-components';
import { color, ColorProps } from 'styled-system';

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  flex: 1;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

export const Title = styled.label`
  color: rgb(229, 232, 235);
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
`;

export const hoverBackground = css<{
  hoverColor?: string;
  borderColor?: string;
}>`
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  outline: none;
  background-color: ${({ hoverColor }) => hoverColor ?? `rgb(38, 41, 48)`};

  ${({ borderColor }) => borderColor && `border: 1px solid ${borderColor}`};
`;

export const disabledStyle = css<{ disabledColor?: string }>`
  background-color: ${({ disabledColor }) =>
    disabledColor ?? `rgb(38, 41, 48)`};
  transition: all 100ms ease-out;
  color: #999;
  cursor: auto;
`;

interface ContainerProps extends InputStyleProps {
  isActive: boolean;
  disabled?: boolean;
}

export interface InputStyleProps {
  backgroundColor?: string;
  hoverColor?: string;
  disabledColor?: string;
  borderRadius?: number;
  borderColor?: string;
  padding?: number | string;
}

export const InputContainer = styled.div<ContainerProps>`
  cursor: text;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius ?? '10'}px;
  border: 1px solid
    ${({ backgroundColor }) => backgroundColor ?? `rgb(29 31 34)`};
  width: 100%;
  padding: ${({ padding }) =>
    padding
      ? typeof padding === 'number'
        ? `${padding}px`
        : padding
      : `12px`};
  box-sizing: border-box;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? `rgb(29 31 34)`};
  color: inherit;
  font: inherit;

  ${({ isActive }) => isActive && hoverBackground}
  ${({ disabled }) => disabled && disabledStyle}

  &:hover {
    ${hoverBackground}
  }
`;

export const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: inherit;
  line-height: inherit;
  min-height: inherit;
  cursor: text;
  color: inherit;
`;
