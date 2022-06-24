import { useState } from 'react';

/**
 *
 * @param timeout: time to delay
 * @returns [isOpen, render, open, close, toggle] in order
 */
export const useDelayOpen = (
  timeout: number
): [boolean, boolean, () => void, () => void, () => void] => {
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

  return [isOpen, render, open, close, toggle];
};
