import { ChangeEvent, FC } from 'react';
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
}

export const Modal: FC<ModalProps> = ({ onClose, isOpen }) => {
  const {
    isSearching,
    isDebouncing,
    searchResult,
    searchValue,
    setSearchValue,
    restSearchValue,
  } = useSearch();

  const {
    friends,
    followings,
    getFriends,
    getFollowings,
    isFriendFetching,
    isFollowingFetching,
  } = useUser();

  const { openRoute, closeSearchModal } = useBeobleModal();

  const isLoading = isSearching || isDebouncing;

  const handleBlockParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const generateUserItem = (user: IUser) => {
    return (
      <UserListItem
        {...{ user }}
        padding="8px 20px "
        key={user.id}
        onClick={() => {
          openRoute(user.id);
          closeSearchModal();
        }}
      />
    );
  };

  const handleClose = () => {
    onClose && onClose();
    restSearchValue();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Container {...{ isOpen }}>
      <ChatRoomModalContainer {...{ isOpen }} onClick={handleBlockParentClick}>
        <ChatRoomModalCard>
          <ModalHeader onClose={handleClose} title="Search User" />
          <InputContainer>
            <Input
              name="user_search"
              backgroundColor={Colors.background.noneTintHover}
              hoverColor={Colors.background.white}
              borderRadius={23}
              padding="8px 12px"
              borderColor={Colors.border.faint}
              placeholder="Address/ENS/beoble search"
              Icon={
                <FiSearch
                  size={20}
                  color={Colors.text.lowEmphasis}
                  style={{ marginRight: 8 }}
                />
              }
              onChange={handleChange}
            />
          </InputContainer>
          {isLoading ? (
            <SpinnerContainer>
              <Spinner color={Colors.background.messageTint} />
            </SpinnerContainer>
          ) : (
            <ScrollableSection>
              {searchValue ? (
                <>
                  <TitleContainer>
                    <UserTypeTitle>{`Result (${searchResult.length})`}</UserTypeTitle>
                  </TitleContainer>
                  {searchResult.map(generateUserItem)}
                </>
              ) : (
                <>
                  <TitleContainer>
                    <UserTypeTitle>{`Friends (${friends.length})`}</UserTypeTitle>
                  </TitleContainer>
                  {friends && friends.map(generateUserItem)}
                  <TitleContainer>
                    <Divider />
                  </TitleContainer>
                  <TitleContainer>
                    <UserTypeTitle>
                      {`Followings (${followings.length})`}
                    </UserTypeTitle>
                  </TitleContainer>
                  {followings && followings.map(generateUserItem)}
                </>
              )}
            </ScrollableSection>
          )}
          <FooterContainer>
            <Button onClick={handleClose}>Close</Button>
          </FooterContainer>
        </ChatRoomModalCard>
      </ChatRoomModalContainer>
    </Container>
  );
};

export default Modal;
