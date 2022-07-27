import { FC, ReactNode, useState } from 'react';
import { INFT } from '../../../../../dist/packages/js-sdk/src';
import { useDelayOpen } from '../../hooks/commons/useDelayOpen';
import { ModalContext, ModalPages } from './ModalContext';

export interface ModalProvider {
  children?: ReactNode;
}

export const ModalProvider: FC<ModalProvider> = ({ children }) => {
  const [route, setRoute] = useState<(ModalPages | string)[]>(['default']);
  const [isOpen, render, open, close, toggle] = useDelayOpen(300);
  const [
    isSearchModalOpen,
    renderSearchModal,
    openSearchModal,
    closeSearchModal,
    toggleSearchModal,
  ] = useDelayOpen(300);
  const [isNftModalOpen, renderNftModal, openNftModal, closeNftModal] =
    useDelayOpen(300);
  const [selectedNft, setSelectedNft] = useState<INFT>();

  const addRoute = (page: ModalPages | string) => {
    setRoute([...route, page]);
  };

  const popRoute = () => {
    if (route.length <= 1)
      throw new Error(
        `you can't pop routes if there is less then ${route.length} routes exist.`
      );
    setRoute(route.slice(0, -1));
  };

  const openRoute = (page: ModalPages | string) => {
    open();
    addRoute(page);
  };

  return (
    <ModalContext.Provider
      value={{
        route,
        isOpen,
        render,
        addRoute,
        popRoute,
        toggle,
        open,
        close,
        openRoute,

        isSearchModalOpen,
        renderSearchModal,
        openSearchModal,
        closeSearchModal,
        toggleSearchModal,

        isNftModalOpen,
        renderNftModal,
        openNftModal,
        closeNftModal,

        selectedNft,
        setSelectedNft,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
