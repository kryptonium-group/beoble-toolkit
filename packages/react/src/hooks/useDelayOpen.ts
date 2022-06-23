import { useState } from 'react';

export const useDelayOpen = (timeout: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [render, setRender] = useState(false);

  const open = () => {
    setIsOpen(true);
    setRender(true);
  };
  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setRender(false);
    }, timeout);
  };

  const toggle = () => {
    if (isOpen) close();
    else open();
  };

  return { open, close, toggle, isOpen, render };
};
