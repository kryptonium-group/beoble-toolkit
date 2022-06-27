import { FriendshipActionType, IUser } from '@beoble/js-sdk';
import { useEffect, useState } from 'react';
import { BeobleNotInitizliedError } from '../lib/Errors';
import { useBeoble } from './useBeoble';

export const useGraph = (user_id?: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [hasFriendRequest, setHasFriendRequest] = useState(false);

  const { Beoble, user } = useBeoble();

  useEffect(() => {
    if (user_id) {
      checkUserRelationship();
    }
  }, [user_id]);

  const onFollowButtonClick = async () => {
    isFollowing ? unfollow() : follow();
  };

  const onFriendButtonClick = async () => {
    isFriend
      ? unFriend()
      : hasFriendRequest
      ? acceptFriendRequest()
      : sendFriendRequest();
  };

  const getFollowings = async () => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    const res = await Beoble.user.follow.get({
      type: 'following',
      user_id: user.id,
    });
    return res.data;
  };

  const checkIsFollowing = async () => {
    const followings = await getFollowings();
    return followings.some((following) => following.id === user_id);
  };

  const getFriends = async () => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    const res = await Beoble.user.friend.get({
      user_id: user.id,
    });
    return res.data;
  };

  const checkIsFriend = async () => {
    const friends = await getFriends();
    return friends.some((friend) => friend.id === user_id);
  };

  const getFriendRequests = async () => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    const res = await Beoble.user.friend.getRequest({
      user_id: user.id,
    });
    return res.data;
  };

  const checkHasFriendRequest = async () => {
    const requests = await getFriendRequests();
    return requests.some((request) => request.id === user_id);
  };

  const checkUserRelationship = async () => {
    setIsFollowing(await checkIsFollowing());
    setIsFriend(await checkIsFriend());
    setHasFriendRequest(await checkHasFriendRequest());
  };

  const follow = async () => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    if (!user_id) return;
    const res = await Beoble.user.follow.follow(user.id, {
      target_user_id: user_id,
    });
    setIsFollowing(await checkIsFollowing());
  };

  const unfollow = async () => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    if (!user_id) return;
    const res = await Beoble.user.follow.unfollow(user.id, {
      target_user_id: user_id,
    });
    setIsFollowing(await checkIsFollowing());
    return res;
  };

  const updateFriendship = async (actionType: FriendshipActionType) => {
    if (!Beoble || !user) throw new BeobleNotInitizliedError();
    if (!user_id) return;
    const res = await Beoble.user.friend.updateFriendship(user.id, {
      target_user_id: user_id,
      friendship_action_type: actionType,
    });
    setIsFriend(await checkIsFriend());
    return res;
  };

  const sendFriendRequest = async () => {
    const res = await updateFriendship('REQUEST');
  };

  const acceptFriendRequest = async () => {
    const res = await updateFriendship('ACCEPT');
  };

  const rejectFriendRequest = async () => {
    const res = await updateFriendship('REJECT');
  };

  const unFriend = async () => {
    const res = await updateFriendship('UNFRIEND');
  };

  return {
    isFollowing,
    isFriend,
    hasFriendRequest,
    onFollowButtonClick,
    onFriendButtonClick,
  };
};
