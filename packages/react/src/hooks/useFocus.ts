import { useRef } from 'react';

export const useFocus = <
  T extends HTMLInputElement | HTMLTextAreaElement
>() => {
  const htmlElRef = useRef<T>(null);

  const setElFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return { htmlElRef, setElFocus };
};
