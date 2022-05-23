import React, { useContext } from 'react';
import { IModalContext, ModalContext } from '../../contexts';

export const useBeobleModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error();
  }

  return modalContext as IModalContext;
};

export default useBeobleModal;
