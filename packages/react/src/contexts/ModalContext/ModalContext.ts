import { createContext } from 'react';

export interface IModalContext {
  route: ModalPages[];
  isOpen: boolean;
  addRoute: (page: ModalPages) => void;
  popRoute: () => void;
  toggle: () => void;
  render: boolean;
  close: () => void;
  open: () => void;
}

export type ModalPages = 'default' | 'edit' | 'others';

export const ModalContext = createContext<IModalContext | null>(null);
