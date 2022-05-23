import { useState } from 'react';
import { ModalContext } from './ModalContext';

const ModalProvider = () => {
  const [route, setRoute] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        route,
        isOpen,
      }}
    ></ModalContext.Provider>
  );
};
