import styled, { css } from 'styled-components';

const disabledStyle = css`
  background-color: rgb(38, 41, 48);
  transition: all 100ms ease-out;
  color: #999;
`;

export const StyledTextarea = styled.textarea<{
  isActive: boolean;
}>`
  height: 76px;
  font-size: inherit;
  line-height: inherit;
  min-height: inherit;
  width: 100%;
  padding: 12px;
  resize: vertical;
  border: 1px solid #333333;
  background-color: rgb(29 31 34);
  border-radius: 10px;
  box-sizing: border-box;
  color: inherit;
  font: inherit;
  margin: 0px;

  ${({ isActive }) =>
    isActive && 'box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;'}
  ${({ disabled }) => disabled && disabledStyle}

  &:focus {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
    outline: none;
    background-color: rgb(38, 41, 48);
  }

  &:hover {
    background-color: rgb(38, 41, 48);
  }
`;
