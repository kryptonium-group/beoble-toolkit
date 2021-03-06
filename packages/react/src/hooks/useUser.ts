import { useEffect, useState } from 'react';
import { IUser } from '@beoble/js-sdk';
import { useBeoble } from './useBeoble';
import { BeobleNotInitizliedError } from '../lib/Errors';

export const useUser = (user_id?: string) => {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [friends, setFriends] = useState<IUser[]>([]);
  const [followings, setFollowings] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);

  const [isFriendFetching, setIsFriendFetching] = useState(true);
  const [isFollowerFetching, setIsFollowerFetching] = useState(true);
  const [isFollowingFetching, setIsFollowingFetching] = useState(true);

  const { Beoble, user } = useBeoble();

  useEffect(() => {
    if (user_id) getUserInfo(user_id);
  }, [user_id]);

  useEffect(() => {
    if (user) {
      getUserGraph();
    }
  }, [Beoble, user]);

  const getUserInfo = async (user_id: string) => {
    const res = await Beoble?.user.get({ user_id });
    setUserInfo(res.data[0]);
  };

  const getFollowings = async () => {
    if (!user) throw new BeobleNotInitizliedError();
    setIsFollowingFetching(true);
    const followers = await Beoble.user.follow.get({
      type: 'following',
      user_id: user_id ?? user.id,
    });
    setFollowings(followers.data);
    setIsFollowingFetching(false);
  };

  const getFriends = async () => {
    if (!user) throw new BeobleNotInitizliedError();
    setIsFriendFetching(true);
    const freinds = await Beoble.user.friend.get({
      user_id: user_id ?? user.id,
    });
    setFriends(freinds.data);
    setIsFriendFetching(false);
  };

  const getFollowers = async () => {
    if (!user) throw new BeobleNotInitizliedError();
    setIsFollowerFetching(true);
    const followers = await Beoble.user.follow.get({
      type: 'follower',
      user_id: user_id ?? user.id,
    });
    setFollowers(followers.data);
    setIsFollowerFetching(false);
  };

  const getUserGraph = () => {
    getFriends();
    getFollowings();
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
    userInfo,
    getUserInfo,
  };
};
