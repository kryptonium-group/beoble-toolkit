import { useState } from 'react';
import { IUser } from '@beoble/js-sdk';
import { useBeoble } from './useBeoble';
import { BeobleNotInitizliedError } from '../lib/Errors';

export const useUser = () => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const [followings, setFollowings] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);

  const [isFriendFetching, setIsFriendFetching] = useState(true);
  const [isFollowerFetching, setIsFollowerFetching] = useState(true);
  const [isFollowingFetching, setIsFollowingFetching] = useState(true);
  const { Beoble, user } = useBeoble();

  const getFollowings = async () => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    setIsFollowingFetching(true);
    const followers = await Beoble.user.follow.get({
      type: 'following',
      user_id: user.user_id,
    });
    setFollowings(followers.data);
    setIsFollowingFetching(false);
  };

  const getFriends = async () => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    setIsFriendFetching(true);
    const freinds = await Beoble.user.friend.get({
      user_id: user.user_id,
    });
    setFriends(freinds.data);
    setIsFriendFetching(false);
  };

  const getFollowers = async () => {
    setIsFollowerFetching(true);
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    const followers = await Beoble.user.follow.get({
      type: 'follower',
      user_id: user.user_id,
    });
    setFollowers(followers.data);
    setIsFollowerFetching(false);
  };

  return {
    friends,
    getFriends,
    isFriendFetching,
    followers,
    getFollowers,
    isFollowerFetching,
    followings,
    getFollowings,
    isFollowingFetching,
  };
};
