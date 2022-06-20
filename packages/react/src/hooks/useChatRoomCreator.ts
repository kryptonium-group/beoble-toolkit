import { Core, IUser, IUsersResponse } from '@beoble/js-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useBeoble } from './useBeoble';

export const useChatRoomCreator = () => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const [followings, setFollowings] = useState<IUser[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);
  const [searchResult, setSearchResult] = useState<IUser[]>([]);

  const [isFriendFetching, setIsFriendFetching] = useState(true);
  const [isFollowerFetching, setIsFollowerFetching] = useState(true);
  const [isFollowingFetching, setIsFollowingFetching] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const isLoading = isFriendFetching || isFollowingFetching || isSearching;

  const { Beoble, user } = useBeoble();

  useEffect(() => {
    if (Beoble && user) {
      getFriends(Beoble, user.user_id);
      getFollowings(Beoble, user.user_id);
    }
  }, [Beoble, user]);

  const getFriends = async (core: Core, user_id: string) => {
    setIsFriendFetching(true);
    const freinds = await core.user.friend.get({
      user_id,
    });
    setFriends(freinds.data);
    setIsFriendFetching(false);
  };

  const getFollowers = async (core: Core, user_id: string) => {
    const followers = await core.user.follow.get({
      type: 'follower',
      user_id,
    });
  };

  const searchUser = async (input: string) => {
    if (Beoble) {
      setIsSearching(true);
      if (ethers.utils.isAddress(input)) {
        const user = await Beoble.user.get({
          wallet_address: input,
        });
        setIsSearching(false);
        setSearchResult(user.data);
      } else {
        const user = await Beoble.user.get({
          alias_search: input,
        });
        setIsSearching(false);
        setSearchResult(user.data);
      }
    }
  };

  const getFollowings = async (core: Core, user_id: string) => {
    setIsFollowingFetching(true);
    const followers = await core.user.follow.get({
      type: 'following',
      user_id,
    });
    setFollowings(followers.data);
    setIsFollowingFetching(false);
  };

  const reset = () => {
    setMembers([]);
    setSearchResult([]);
  };

  const toggleMember = (user: IUser) => {
    // remove member
    if (members.find((member) => member.user_id === user.user_id)) {
      setMembers((prev) =>
        prev.filter((member) => member.user_id !== user.user_id)
      );
    }
    // add member
    else {
      setMembers([...members, user]);
    }
  };

  const createChatRoom = async (callback?: () => void) => {
    if (members.length < 1)
      throw new Error(
        'You should have at least one user with to create chat room'
      );
    if (Beoble && user) {
      const res = await Beoble.chatroom.add({
        alias: '',
        display_name: '',
        creator_id: user.user_id,
        chatroom_type: members.length > 1 ? 'GROUP_CHAT' : 'DIRECT_CHAT',
        members: members.map((member) => member.user_id),
      });
      console.log(res);
      callback && callback();
    }
  };

  return {
    friends,
    followings,
    members,
    isLoading,
    searchResult,
    searchValue,
    setSearchValue,
    reset,
    searchUser,
    createChatRoom,
    toggleMember,
  };
};
