import { HtmlProps } from 'next/dist/shared/lib/html-context';
import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
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
  color: rgb(53, 56, 64);
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
`;

const InputContainer = styled.div<{ isActive: boolean }>`
  cursor: text;
  display: flex;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 1px solid rgb(229, 232, 235);
  width: 100%;
  padding: 12px;
  box-sizing: border-box;

  ${({ isActive }) =>
    isActive && 'box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;'}

  &:active {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  }
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 26px;
  min-height: 26px;
  cursor: text;
`;

export function Input({ label, name, ...htmlInputProps }: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const { htmlElRef, setElFocus } = useFocus();

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
      <InputContainer isActive={isFocus}>
        <StyledInput
          ref={htmlElRef}
          id={name}
          {...htmlInputProps}
          onBlur={handleBlur}
        />
      </InputContainer>
    </Container>
  );
}

export default Input;
