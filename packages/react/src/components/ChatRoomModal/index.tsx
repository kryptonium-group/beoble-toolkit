import { ChangeEvent, FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { IUser } from '@beoble/js-sdk';
import { Colors, zIndex } from '../../styles';
import { Appear, flexStretch, noBorder } from '../../styles/commons';
import Input from '../Input';
import { ModalHeader } from '../MessageHeader';
import UserListItem from '../UserListItem';
import Divider from '../Divider';
import Button from '../Button';
import Spinner from '../Spinner';
import { useChatRoomCreator } from '../../hooks/useChatRoomCreator';
import UserLabel from '../UserLabel';
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
} from '../Modal/style';

export interface ChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatRoomModal: FC<ChatRoomModalProps> = ({ onClose, isOpen }) => {
  const {
    followings,
    friends,
    searchResult,
    isLoading,
    members,
    searchValue,
    setSearchValue,
    reset,
    toggleMember,
    createChatRoom,
  } = useChatRoomCreator();

  const handleBlockParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const generateUserLabel = (user: IUser) => {
    return (
      <UserLabel
        display_context={user.display_name}
        key={user.user_id}
        onClose={() => {
          toggleMember(user);
        }}
      />
    );
  };

  const generateUserItem = (user: IUser) => {
    return (
      <UserListItem
        {...{ user }}
        padding="8px 20px "
        key={user.user_id}
        hasCheckBox
        onClick={() => {
          toggleMember(user);
        }}
        checked={members.some((member) => member.user_id === user.user_id)}
      />
    );
  };

  const handleCancel = () => {
    reset();
    onClose && onClose();
  };

  const handleConfirm = () => {
    createChatRoom();
    handleCancel();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Container {...{ isOpen }} onClick={handleCancel}>
      <ChatRoomModalContainer {...{ isOpen }} onClick={handleBlockParentClick}>
        <ChatRoomModalCard>
          <ModalHeader onClose={handleCancel} title="invite" />
          {members.length > 0 && (
            <UserLabelContainer>
              {members.map(generateUserLabel)}
            </UserLabelContainer>
          )}
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
            <Button
              style={{ marginRight: 5 }}
              disabled={members.length < 1}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </FooterContainer>
        </ChatRoomModalCard>
      </ChatRoomModalContainer>
    </Container>
  );
};

export default ChatRoomModal;
