import { InputHTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { useFocus } from '../../hooks/useFocus';

/* eslint-disable-next-line */
export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

const Container = styled.div`
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
`;

const InputTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

const InputTitle = styled.label`
  color: rgb(229, 232, 235);
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
`;

const disabledStyle = css`
  background-color: rgb(38, 41, 48);
  transition: all 100ms ease-out;
  color: #999;
`;

const StyledTextarea = styled.textarea<{
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

export function Textarea({ label, name, ...htmlTextAreaProps }: TextareaProps) {
  const [isFocus, setIsFocus] = useState(false);
  const { htmlElRef, setElFocus } = useFocus<HTMLTextAreaElement>();

  const handleFocus = () => {
    setElFocus();
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <Container onFocus={handleFocus}>
      {label && (
        <InputTitleContainer>
          <InputTitle htmlFor={name}>{label}</InputTitle>
        </InputTitleContainer>
      )}
      <StyledTextarea
        ref={htmlElRef}
        id={name}
        {...htmlTextAreaProps}
        onBlur={handleBlur}
        isActive={isFocus}
      />
    </Container>
  );
}

export default Textarea;
