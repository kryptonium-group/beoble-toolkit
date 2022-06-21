import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  RiUserReceived2Line,
  RiUserShared2Line,
  RiArrowDownSLine,
  RiUserHeartLine,
} from 'react-icons/ri';
import { BeobleSDK, IPutUserBody, IUser } from '@beoble/js-sdk';
import Button from '../Button';
import Identication from '../Identication';
import useBeoble from '../../hooks/useBeoble/useBeoble';
import Input from '../Input';
import Textarea from '../Textarea';
import useBeobleModal from '../../hooks/useBeoble/useBeobleModal';
import { useBeobleSDK } from '../../hooks/useBeoble/useBeobleSDK';
import Spinner from '../Spinner';
import NftPicker from '../NftPicker';
import UserListItem from '../UserListItem';
import { useUser } from '../../hooks/useUser';
import { Colors } from '../../styles';
import { Appear } from '../../styles/commons';

const OutlinedButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.08);
  line-height: 48px;
  height: 48px;
  padding-left: 26px;
  padding-right: 26px;
  min-width: 192px;
  border: 1px solid transparent;
  border-radius: 48px;
  border-color: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  font-weight: 900;
  font-family: inherit;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;
  cursor: pointer;
  color: rgb(255, 255, 255);
  appearance: button;
  background: transparent;

  :hover {
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  margin-bottom: 24px;
  padding: 0 12px;
  font-size: 13px;
  color: rgb(255, 255, 255);
`;

const ProfileImageContainer = styled(InputContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EditProfileTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 0px;
  color: rgb(255, 255, 255);
`;

const TitleContainer = styled.div`
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 24px;
`;

const SaveButton = styled(OutlinedButton)`
  background-color: rgb(32, 129, 226);
  border: 1px solid rgb(32, 129, 226);

  &:hover {
    background-color: rgb(66, 160, 255);
    border: 1px solid rgb(66, 160, 255);
    color: rgb(255, 255, 255);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #575757;
      border: 1px solid #575757;
      cursor: auto;

      &:hover {
        background-color: #575757;
        border: 1px solid #575757;
      }
    `}
`;

const InputTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

const InputTitle = styled.label`
  color: rgb(229, 232, 235);
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
`;

export const EditProfile = () => {
  const [inputs, setInputs] = useState<IPutUserBody>({});
  const { user } = useBeoble();
  const { updateUser, data, isFetching } = useBeobleSDK();
  const disableInput = isFetching || !user;

  const handleSave = async () => {
    if (!user) throw new Error('user is not initialized!');
    updateUser(user.user_id, inputs);
  };

  const handleInputChage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (data) {
      setInputs({
        alias: data.data.alias,
        description: data.data.description,
        display_name: data.data.display_name,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(user);
    if (user) {
      setInputs({
        alias: user.alias,
        display_name: user.display_name,
        description: user.description,
      });
    }
  }, [user]);

  return (
    <ModalContent>
      <TitleContainer>
        <EditProfileTitle>Profile Settings</EditProfileTitle>
      </TitleContainer>
      <ProfileImageContainer>
        <InputTitleContainer>
          <InputTitle>Profile Image</InputTitle>
        </InputTitleContainer>
        <NftPicker size={100} />
      </ProfileImageContainer>
      <InputContainer>
        <Input
          name="alias"
          label="Alias"
          placeholder="Enter username"
          value={inputs?.alias}
          onChange={handleInputChage}
          disabled={disableInput}
        />
      </InputContainer>
      <InputContainer>
        <Input
          name="display_name"
          label="Username"
          placeholder="Enter username"
          value={inputs?.display_name}
          onChange={handleInputChage}
          disabled={isFetching || !user}
        />
      </InputContainer>
      <InputContainer>
        <Textarea
          name="description"
          label="Description"
          placeholder="Describe yourself on web3!"
          value={inputs?.description}
          onChange={handleInputChage}
          disabled={isFetching || !user}
        />
      </InputContainer>
      <Footer>
        <SaveButton onClick={handleSave} disabled={isFetching || !user}>
          {isFetching ? <Spinner size={20} color="#ffffff" /> : 'Save'}
        </SaveButton>
      </Footer>
    </ModalContent>
  );
};

const flexStretch = css`
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  flex-shrink: 0;
  flex-direction: column;
  flex-basis: auto;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
`;

const noBorder = css`
  border-width: 0px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
`;

const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-bottom: 20px;
  vertical-align: inherit;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const ProfileInfoContainer = styled.div`
  ${noBorder}
  ${flexStretch}
  padding-left: 12px;
  padding-right: 12px;
`;
const MenuContainer = styled.div`
  ${noBorder}
  ${flexStretch}
  margin-top: 16px;
`;
const Footer = styled.div`
  margin-top: auto;
  ${noBorder}
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  ${flexStretch};
`;

const MenuButton = styled(Button)`
  cursor: pointer;
  color: rgb(255, 255, 255);
  transition: all 0.15s ease-in-out 0s;
  text-align: left;
  min-height: 35px;
  padding: 12px 16px;
  margin: 0px 12px;
  border-radius: 8px;
  background: transparent;
  border: none;
  line-height: normal;
  vertical-align: inherit;
  overflow: visible;

  :hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: rgb(255, 255, 255);
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
`;

const MEnuItemName = styled.span`
  font-family: inherit;
  font-weight: 700;
  margin-left: 12px;
  margin-right: 4px;
  font-size: 15px;
  vertical-align: inherit;
`;

const AddressContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  flex-shrink: 0;
  flex-direction: column;
  flex-basis: auto;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  ${noBorder}
`;

const AddressProfileButton = styled(Button)`
  vertical-align: inherit;
  color: inherit;
  overflow: visible;
  background: transparent;
  border: none;
  cursor: pointer;
  line-height: normal;

  padding: 12px;
`;

const AddressProfileDiv = styled.div`
  ${noBorder}
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 0 auto;
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  display: flex;
`;

const AddressDiv = styled.div`
  ${noBorder}
  justify-content: stretch;
  ${flexStretch}
  flex-shrink: 1;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-left: 12px;
  text-align: start;
`;

const AddressSpan = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
  vertical-align: inherit;
`;

const ProfileSpan = styled.span`
  font-family: inherit;
  font-weight: inherit;
  font-size: 13px;
  vertical-align: inherit;
  margin-top: 2px;
  color: rgba(140, 140, 140, 0.6);
`;

const WalletInfoContainer = styled.div`
  ${flexStretch}
  ${noBorder}
  margin-top: 16px;
  padding-left: 8px;
  padding-right: 8px;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const WalletConnectStatus = styled.span`
  font-family: inherit;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  vertical-align: inherit;
`;

const ManageWalletLink = styled.a`
  font-family: inherit;
  font-weight: 700;
  font-size: 15px;
  vertical-align: inherit;
  transition: all 0.15s ease-in-out 0s;
  text-decoration: none;
  color: rgb(45, 129, 255);
  cursor: pointer;

  :hover {
    color: rgb(255, 255, 255);
  }
`;

const MenuArrow = styled(RiArrowDownSLine)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 150ms ease;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 12px;
  padding: 0px;
`;

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 8px;
  animation: ${Appear};
`;

const NoResultText = styled.span`
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export interface ContentProps {
  userAddress?: string;
  userId?: string;
}

export const ProfileContent: FC<ContentProps> = ({ userAddress, userId }) => {
  const [isFriendsMenuOpen, setIsFriendsMenuOpen] = useState(false);
  const [isFollowersMenuOpen, setIsFollowersMenuOpen] = useState(false);
  const [isFollowingMenuOpen, setIsFollowingMenuOpen] = useState(false);

  const { initialized, account, user } = useBeoble();
  const { addRoute } = useBeobleModal();
  const {
    friends,
    followers,
    followings,
    isFollowerFetching,
    isFollowingFetching,
    isFriendFetching,
    getFollowers,
    getFollowings,
    getFriends,
  } = useUser();

  const handleClickFriendsMenu = () => {
    const nextState = !isFriendsMenuOpen;
    nextState && getFriends();
    setIsFriendsMenuOpen(nextState);
  };

  const handleClickFollowersMenu = () => {
    const nextState = !isFollowersMenuOpen;
    nextState && getFollowers();
    setIsFollowersMenuOpen(nextState);
  };

  const handleClickFollowingMenu = () => {
    const nextState = !isFollowingMenuOpen;
    nextState && getFollowings();
    setIsFollowingMenuOpen(nextState);
  };

  const generateUserListItem = (user: IUser) => {
    return (
      <UserListItem
        {...{ user }}
        padding="8px 28px"
        size={'sm'}
        key={user.user_id}
      />
    );
  };

  return (
    <ModalContent>
      <ProfileInfoContainer>
        <AddressContainer>
          <AddressProfileButton>
            <AddressProfileDiv>
              <Identication diameter={36} account={account?.address ?? ''} />
              <AddressDiv>
                <AddressSpan>
                  {user?.display_name ??
                    account?.ensName ??
                    account?.address ??
                    'undefined'}
                </AddressSpan>
                <ProfileSpan>
                  {BeobleSDK.utils.truncateString(
                    account?.address ?? ' ',
                    16,
                    4,
                    4
                  )}
                </ProfileSpan>
              </AddressDiv>
            </AddressProfileDiv>
          </AddressProfileButton>
          <WalletInfoContainer>
            <WalletConnectStatus>Connected</WalletConnectStatus>
            <ManageWalletLink
              onClick={() => {
                addRoute('edit');
              }}
            >
              Edit Profile
            </ManageWalletLink>
          </WalletInfoContainer>
        </AddressContainer>
      </ProfileInfoContainer>
      <MenuContainer>
        <MenuButton
          type="button"
          onClick={handleClickFollowersMenu}
          disabled={!initialized}
        >
          <MenuItemContainer>
            <RiUserReceived2Line size={20} />
            <MEnuItemName>Followers</MEnuItemName>
            <MenuArrow isOpen={isFollowersMenuOpen} size={16} />
          </MenuItemContainer>
        </MenuButton>

        {isFollowersMenuOpen && (
          <ListContainer>
            {isFollowerFetching ? (
              <Spinner color={Colors.background.white} size={20} />
            ) : followers.length > 0 ? (
              followers.map(generateUserListItem)
            ) : (
              <NoResultContainer>
                <NoResultText>No Followers Yet</NoResultText>
              </NoResultContainer>
            )}
          </ListContainer>
        )}
        <MenuButton
          type="button"
          onClick={handleClickFollowingMenu}
          disabled={!initialized}
        >
          <MenuItemContainer>
            <RiUserShared2Line size={20} />
            <MEnuItemName>Following</MEnuItemName>
            <MenuArrow isOpen={isFollowingMenuOpen} size={16} />
          </MenuItemContainer>
        </MenuButton>
        {isFollowingMenuOpen && (
          <ListContainer>
            {isFollowingFetching ? (
              <Spinner color={Colors.background.white} size={20} />
            ) : followings.length > 0 ? (
              followings.map(generateUserListItem)
            ) : (
              <NoResultContainer>
                <NoResultText>No Followings Yet</NoResultText>
              </NoResultContainer>
            )}
          </ListContainer>
        )}
        <MenuButton
          type="button"
          onClick={handleClickFriendsMenu}
          disabled={!initialized}
        >
          <MenuItemContainer>
            <RiUserHeartLine size={20} />
            <MEnuItemName>Friends</MEnuItemName>
            <MenuArrow isOpen={isFriendsMenuOpen} size={16} />
          </MenuItemContainer>
        </MenuButton>
        {isFriendsMenuOpen && (
          <ListContainer>
            {isFriendFetching ? (
              <Spinner color={Colors.background.white} size={20} />
            ) : friends.length > 0 ? (
              friends.map(generateUserListItem)
            ) : (
              <NoResultContainer>
                <NoResultText>No Friends Yet</NoResultText>
              </NoResultContainer>
            )}
          </ListContainer>
        )}
      </MenuContainer>
      <Footer>
        <OutlinedButton>Sign out</OutlinedButton>
      </Footer>
    </ModalContent>
  );
};
