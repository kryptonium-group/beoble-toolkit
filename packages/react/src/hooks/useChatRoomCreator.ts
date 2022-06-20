import { Core, IUser, IUsersResponse } from '@beoble/js-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useBeoble } from './useBeoble';

export const useChatRoomCreator = () => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const [followings, setFollowings] = useState<IUser[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  const [isFriendFetching, setIsFriendFetching] = useState(true);
  const [isFollowerFetching, setIsFollowerFetching] = useState(true);
  const [isFollowingFetching, setIsFollowingFetching] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
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
  };

  return {
    friends,
    followings,
    members,
    isLoading,
    searchResult,
    reset,
    searchUser,
  };
};
