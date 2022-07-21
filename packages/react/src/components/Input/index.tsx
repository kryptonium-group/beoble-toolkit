import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { useFocus } from '../../hooks/commons/useFocus';
import {
  Container,
  InputContainer,
  Title,
  TitleContainer,
  StyledInput,
  InputStyleProps,
} from './style';

/* eslint-disable-next-line */
export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputStyleProps {
  label?: string;
  name: string;
  Icon?: ReactNode;
}

export function Input({
  label,
  name,
  Icon,
  backgroundColor,
  hoverColor,
  disabledColor,
  borderRadius,
  borderColor,
  padding,
  ...htmlInputProps
}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [htmlElRef, setElFocus] = useFocus<HTMLInputElement>();

  const handleFocus = () => {
    setElFocus();
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <Container onClick={handleFocus}>
      {label && (
        <TitleContainer>
          <Title htmlFor={name}>{label}</Title>
        </TitleContainer>
      )}
      <InputContainer
        isActive={isFocus}
        disabled={htmlInputProps.disabled}
        {...{
          backgroundColor,
          hoverColor,
          disabledColor,
          borderRadius,
          borderColor,
          padding,
        }}
      >
        {Icon && Icon}
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
