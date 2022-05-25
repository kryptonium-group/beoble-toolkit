import { HtmlProps } from 'next/dist/shared/lib/html-context';
import { InputHTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { useFocus } from '../../hooks/useFocus';

/* eslint-disable-next-line */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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

const hoverBackground = css`
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  outline: none;
  background-color: rgb(38, 41, 48);
`;

const disabledStyle = css`
  background-color: rgb(38, 41, 48);
  transition: all 100ms ease-out;
  color: #999;
  cursor: auto;
`;

const InputContainer = styled.div<{ isActive: boolean; disabled?: boolean }>`
  cursor: text;
  display: flex;
  background-color: rgb(29 31 34);
  border-radius: 10px;
  border: 1px solid #333333;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  color: inherit;
  font: inherit;

  ${({ isActive }) => isActive && hoverBackground}
  ${({ disabled }) => disabled && disabledStyle}

  &:hover {
    background-color: rgb(38, 41, 48);
  }
`;

const StyledInput = styled.input`
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

export function Input({ label, name, ...htmlInputProps }: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const { htmlElRef, setElFocus } = useFocus<HTMLInputElement>();

  const handleFocus = () => {
    setElFocus();
    setIsFocus(true);
  };

  const handleBlur = () => {
    console.log('blured');
    setIsFocus(false);
  };

  return (
    <Container onFocus={handleFocus}>
      {label && (
        <InputTitleContainer>
          <InputTitle htmlFor={name}>{label}</InputTitle>
        </InputTitleContainer>
      )}
      <InputContainer isActive={isFocus} disabled={htmlInputProps.disabled}>
        <StyledInput
          ref={htmlElRef}
          id={name}
          name={name}
          {...htmlInputProps}
          onBlur={handleBlur}
        />
      </InputContainer>
    </Container>
  );
}

export default Input;
