import React, { FC, useState } from 'react';
import {
  RiUserReceived2Line,
  RiUserShared2Line,
  RiUserHeartLine,
} from 'react-icons/ri';
import { BeobleSDK, IUser } from '@beoble/js-sdk';
import Identication from '../Identication';
import useBeoble from '../../hooks/useBeoble/useBeoble';
import useBeobleModal from '../../hooks/useBeoble/useBeobleModal';
import Spinner from '../Spinner';
import UserListItem from '../UserListItem';
import { useUser } from '../../hooks/useUser';
import { Colors } from '../../styles';
import {
  AddressContainer,
  AddressDiv,
  AddressProfileButton,
  AddressProfileDiv,
  AddressSpan,
  Footer,
  ListContainer,
  ManageWalletLink,
  MenuArrow,
  MenuButton,
  MenuContainer,
  MenuItemContainer,
  MEnuItemName,
  ModalContent,
  NoResultContainer,
  NoResultText,
  ProfileInfoContainer,
  ProfileSpan,
  WalletConnectStatus,
  WalletInfoContainer,
} from './style';

export interface ContentProps {
  profileUser?: IUser;
}

export const ProfileContent: FC<ContentProps> = ({ profileUser }) => {
  const [isFriendsMenuOpen, setIsFriendsMenuOpen] = useState(false);
  const [isFollowersMenuOpen, setIsFollowersMenuOpen] = useState(false);
  const [isFollowingMenuOpen, setIsFollowingMenuOpen] = useState(false);

  const { initialized, account, user } = useBeoble();
  const isUserProfile = !profileUser || user?.user_id === profileUser?.user_id;
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

  const getDisplayName = () => {
    console.log(isUserProfile, user, profileUser);
    if (isUserProfile) {
      return (
        user?.display_name ??
        account?.ensName ??
        account?.address ??
        'undefined'
      );
    } else {
      return '';
    }
  };

  const getTruncatedAddress = () => {
    return BeobleSDK.utils.truncateString(
      (isUserProfile ? account?.address : profileUser?.wallets[0]) ?? ' ',
      16,
      4,
      4
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
                <AddressSpan>{getDisplayName()}</AddressSpan>
                <ProfileSpan>{getTruncatedAddress()}</ProfileSpan>
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
      <Footer></Footer>
    </ModalContent>
  );
};
