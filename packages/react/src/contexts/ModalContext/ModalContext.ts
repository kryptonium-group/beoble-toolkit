import { createContext } from 'react';

export interface IModalContext {
  route: ModalPages[];
  isOpen: boolean;
}

export type ModalPages = 'default' | 'edit' | 'others';

const initialState: IModalContext = {
  route: ['default'],
  isOpen: false,
};

export const ModalContext = createContext<IModalContext>(initialState);
