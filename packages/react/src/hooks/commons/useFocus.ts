import { RefObject, useRef } from 'react';

export const useFocus = <
  T extends HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
>(): [RefObject<T>, () => void] => {
  const htmlElRef = useRef<T>(null);

  const setElFocus = () => {
    htmlElRef.current?.focus();
  };

  return [htmlElRef, setElFocus];
};
