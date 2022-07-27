import { createContext } from 'react';
import { INFT } from '../../../../../dist/packages/js-sdk/src';

export interface IModalContext {
  route: (ModalPages | string)[];
  isOpen: boolean;
  addRoute: (page: ModalPages | string) => void;
  popRoute: () => void;
  toggle: () => void;
  render: boolean;
  close: () => void;
  open: () => void;
  openRoute: (route: ModalPages | string) => void;
  isSearchModalOpen: boolean;
  renderSearchModal: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleSearchModal: () => void;

  isNftModalOpen: boolean;
  renderNftModal: boolean;
  openNftModal: () => void;
  closeNftModal: () => void;
  selectedNft: INFT;
  setSelectedNft: (nft: INFT | undefined) => void;
}

export type ModalPages = 'default' | 'edit';

export const ModalContext = createContext<IModalContext | null>(null);
