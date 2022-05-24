import { useRef } from 'react';

export const useFocus = () => {
  const htmlElRef = useRef<HTMLInputElement>(null);

  const setElFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return { htmlElRef, setElFocus };
};
