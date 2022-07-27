import { ChangeEvent, FC, ReactNode } from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import { IUser } from '@beoble/js-sdk';
import { useSearch } from '../../hooks/useSearch';
import { Colors } from '../../styles';
import Button from '../Button';
import Divider from '../Divider';
import Input from '../Input';
import { ModalHeader } from '../MessageHeader';
import Spinner from '../Spinner';
import {
  ChatRoomModalCard,
  ChatRoomModalContainer,
  Container,
  FooterContainer,
  InputContainer,
  ScrollableSection,
  SpinnerContainer,
  TitleContainer,
  UserLabelContainer,
  UserTypeTitle,
} from './style';
import UserListItem from '../UserListItem';
import { useBeobleModal, useChat } from '../../hooks';
import { useUser } from '../../hooks/useUser';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children?: ReactNode;
  disabled?: boolean;
}

export const Modal: FC<ModalProps> = ({
  onClose,
  onConfirm,
  disabled = true,
  isOpen,
  children,
  title,
}) => {
  const { openRoute, closeSearchModal } = useBeobleModal();

  const handleBlockParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    onClose && onClose();
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  return (
    <Container {...{ isOpen }}>
      <ChatRoomModalContainer {...{ isOpen }} onClick={handleBlockParentClick}>
        <ChatRoomModalCard>
          <ModalHeader onClose={handleClose} title={title ?? ''} />
          {children}
          <FooterContainer>
            {onConfirm && (
              <Button
                style={{ marginRight: 5 }}
                disabled={disabled}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            )}
            <Button onClick={handleClose}>Close</Button>
          </FooterContainer>
        </ChatRoomModalCard>
      </ChatRoomModalContainer>
    </Container>
  );
};

export default Modal;
