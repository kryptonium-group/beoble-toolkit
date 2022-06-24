import { FC, ReactNode, useState } from 'react';
import { useDelayOpen } from '../../hooks/useDelayOpen';
import { ModalContext, ModalPages } from './ModalContext';

export interface ModalProvider {
  children?: ReactNode;
}

export const ModalProvider: FC<ModalProvider> = ({ children }) => {
  const [route, setRoute] = useState<(ModalPages | string)[]>(['default']);
  const { isOpen, toggle, render, close, open } = useDelayOpen(300);

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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
