import { FC, ReactNode, useState } from 'react';
import { ModalContext, ModalPages } from './ModalContext';

export interface ModalProvider {
  children?: ReactNode;
}

export const ModalProvider: FC<ModalProvider> = ({ children }) => {
  const [route, setRoute] = useState<ModalPages[]>(['default']);
  const [isOpen, setIsOpen] = useState(false);

  const addRoute = (page: ModalPages) => {
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
        addRoute,
        popRoute,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
