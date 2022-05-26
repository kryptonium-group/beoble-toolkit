import { HtmlProps } from 'next/dist/shared/lib/html-context';
import { InputHTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { useFocus } from '../../hooks/useFocus';
import {
  Container,
  InputContainer,
  Title,
  TitleContainer,
  StyledInput,
} from './style';

/* eslint-disable-next-line */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

export function Input({ label, name, ...htmlInputProps }: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const { htmlElRef, setElFocus } = useFocus<HTMLInputElement>();

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
        <TitleContainer>
          <Title htmlFor={name}>{label}</Title>
        </TitleContainer>
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
