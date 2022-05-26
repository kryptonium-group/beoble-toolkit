import { InputHTMLAttributes, useState } from 'react';
import { useFocus } from '../../hooks/useFocus';
import { Container, Title, TitleContainer } from '../Input/style';
import { StyledTextarea } from './style';

/* eslint-disable-next-line */
export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

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
        <TitleContainer>
          <Title htmlFor={name}>{label}</Title>
        </TitleContainer>
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
