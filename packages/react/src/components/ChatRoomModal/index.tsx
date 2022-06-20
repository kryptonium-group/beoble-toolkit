import { ChangeEvent, FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { IUser } from '@beoble/js-sdk';
import { Colors, zIndex } from '../../styles';
import { Appear, flexStretch, noBorder } from '../../styles/commons';
import Input from '../Input';
import { CreateChatRoomHeader } from '../MessageHeader';
import UserListItem from '../UserListItem';
import Divider from '../Divider';
import Button from '../Button';
import Spinner from '../Spinner';
import { useChatRoomCreator } from '../../hooks/useChatRoomCreator';

/* eslint-disable-next-line */
export interface ChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Container = styled.div<{ isOpen: boolean }>`
  ${flexStretch}
  ${noBorder};
  position: fixed;
  inset: 0px;
  overflow: hidden;
  transition: all 300ms ease-in-out;
  backdrop-filter: ${({ isOpen }) => (isOpen ? 'blur(10px)' : 'none')};
  background-color: ${({ isOpen }) =>
    isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transperent'};
  z-index: ${zIndex.blur};
`;

const ChatRoomModalContainer = styled.div<{ isOpen: boolean }>`
  ${flexStretch}
  ${noBorder};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  height: 580px;
  width: 336px;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-duration: 300ms;
  animation-direction: ${({ isOpen }) => (isOpen ? 'normal' : 'reverse')};
  animation-name: ${Appear};
  z-index: ${zIndex.modal};
`;

const ChatRoomModalCard = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  height: 580px;
  width: 336px;
  background-color: ${Colors.background.white};
  display: flex;
  flex: 0 0 auto;
  max-height: calc(100vh - 100px);
  box-shadow: 0px 0px 0px 1px ${Colors.background.noneTintHover},
    0px 4px 4px ${Colors.background.shadow};
  flex-direction: column;

  transform: translateY(0);
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 167ms;

  border-radius: 0.8rem;

  margin-left: 16px;
  position: absolute;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 12px 20px 0px 20px;
  justify-content: center;
  align-items: center;
`;

const ScrollableSection = styled.section`
  display: block;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  overflow-y: auto;
  height: inherit;

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${Colors.background.shadow};
  }
`;

const TitleContainer = styled.div`
  padding: 12px 20px;
`;

const UserTypeTitle = styled.span`
  padding: 0;
  margin: 0;
  font-family: inherit;
  color: ${Colors.text.lowEmphasis};
`;

const FooterContainer = styled.footer`
  border-radius: 10px;
  border-top: solid 1px ${Colors.border.faint};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  background-color: inherit;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
`;

export const ChatRoomModal: FC<ChatRoomModalProps> = ({ onClose, isOpen }) => {
  const [searchValue, setSearchValue] = useState('');

  const { followings, friends, searchResult, reset, isLoading, searchUser } =
    useChatRoomCreator();

  const handleBlockParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const generateUserItem = (user: IUser) => {
    return (
      <UserListItem {...{ user }} padding="8px 20px " key={user.user_id} />
    );
  };

  const handleCancel = () => {
    reset();
    onClose && onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchUser(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <Container {...{ isOpen }} onClick={onClose}>
      <ChatRoomModalContainer {...{ isOpen }} onClick={handleBlockParentClick}>
        <ChatRoomModalCard>
          <CreateChatRoomHeader {...{ onClose }} />
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
            <Button style={{ marginRight: 5 }} disabled>
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
