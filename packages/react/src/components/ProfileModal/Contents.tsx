import React, { FC, useState } from 'react';
import {
  RiUserReceived2Line,
  RiUserShared2Line,
  RiUserHeartLine,
  RiUserAddLine,
  RiUserUnfollowLine,
  RiUserFollowLine,
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
import { useENS } from '../../hooks';
import Button from '../Button';
import styled from 'styled-components';
import { useGraph } from '../../hooks/useGraph';
import Input from '../Input';
import { FiSearch } from 'react-icons/fi';
import { InputContainer } from '../Modal/style';
import Avatar from '../Avatar';

export interface ContentProps {
  profileUserId?: string;
}

export const SocialGraphContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  padding: 10px 0px 0px 0px;
`;

export const FollowButton = styled(Button)`
  background-color: ${Colors.background.messageTint};
  width: 120px;
  font-size: 1rem;
`;

export const FriendButton = styled(Button)`
  background-color: ${Colors.background.white};
  color: ${Colors.background.messageTint};
  border: 1px solid ${Colors.background.messageTint};
  width: 120px;
  font-size: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  padding: 20px 36px 0px 36px;
  justify-content: center;
  align-items: center;
`;

const SearchClicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ProfileContent: FC<ContentProps> = ({ profileUserId }) => {
  const [isFriendsMenuOpen, setIsFriendsMenuOpen] = useState(false);
  const [isFollowersMenuOpen, setIsFollowersMenuOpen] = useState(false);
  const [isFollowingMenuOpen, setIsFollowingMenuOpen] = useState(false);

  const { initialized, account, user, Beoble, provider } = useBeoble();
  const isUserProfile = !profileUserId || user?.id === profileUserId;
  const { addRoute, openSearchModal } = useBeobleModal();
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
    userInfo,
  } = useUser(profileUserId);

  const {
    isFollowing,
    isFriend,
    hasFriendRequest,
    onFollowButtonClick,
    onFriendButtonClick,
  } = useGraph(profileUserId);

  const { ENSName, ENSAvatar } = useENS(provider, userInfo?.wallets[0]);

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

  const handleClickUserListItem = (user_id: string) => () => {
    addRoute(user_id);
    setIsFollowingMenuOpen(false);
    setIsFollowersMenuOpen(false);
    setIsFriendsMenuOpen(false);
  };

  const generateUserListItem = (user: IUser) => {
    return (
      <UserListItem
        {...{ user }}
        padding="8px 28px"
        size={'sm'}
        key={user.id}
        onClick={handleClickUserListItem(user.id)}
      />
    );
  };

  const getDisplayName = () => {
    if (isUserProfile) {
      return (
        user?.display_name ??
        account?.ensName ??
        account?.address ??
        'undefined'
      );
    } else {
      return (
        userInfo?.display_name ?? ENSName ?? userInfo?.wallets[0] ?? 'undefined'
      );
    }
  };

  const getTruncatedAddress = () => {
    const address = isUserProfile ? account?.address : userInfo?.wallets[0];
    return BeobleSDK.utils.truncateString(address ?? '', 16, 4, 4);
  };

  const getAddress = () => {
    if (isUserProfile) return account?.address ?? '';
    else return userInfo?.wallets[0] ?? '';
  };

  return (
    <ModalContent>
      <ProfileInfoContainer>
        <AddressContainer>
          <AddressProfileButton>
            <AddressProfileDiv>
              <Avatar size={36} account={getAddress()} profileImg={ENSAvatar} />
              <AddressDiv>
                <AddressSpan>{getDisplayName()}</AddressSpan>
                <ProfileSpan>{getTruncatedAddress()}</ProfileSpan>
              </AddressDiv>
            </AddressProfileDiv>
          </AddressProfileButton>
          {isUserProfile ? (
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
          ) : (
            <SocialGraphContainer>
              <FollowButton onClick={onFollowButtonClick}>
                {isFollowing ? 'unfollow' : 'follow'}
              </FollowButton>
              <FriendButton onClick={onFriendButtonClick}>
                {hasFriendRequest ? (
                  <RiUserFollowLine />
                ) : isFriend ? (
                  <RiUserUnfollowLine />
                ) : (
                  <RiUserAddLine />
                )}
              </FriendButton>
            </SocialGraphContainer>
          )}
        </AddressContainer>
      </ProfileInfoContainer>
      {isUserProfile && (
        <SearchContainer>
          <SearchClicker onClick={openSearchModal}>
            <Input
              disabled
              name="user_search"
              backgroundColor={Colors.background.noneTintHover}
              hoverColor={Colors.background.white}
              borderRadius={23}
              padding="8px 12px"
              borderColor={Colors.border.faint}
              placeholder="Click to Search User"
              Icon={
                <FiSearch
                  size={20}
                  color={Colors.text.lowEmphasis}
                  style={{ marginRight: 8 }}
                />
              }
            />
          </SearchClicker>
        </SearchContainer>
      )}

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
