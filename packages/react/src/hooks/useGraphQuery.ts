import { Core } from '@beoble/js-sdk';
import { useQuery } from './commons';

export const useGraphQuery = (Beoble: Core, userId?: string) => {
  const [followerState, followerQuery] = useQuery([
    {
      key: 'get',
      reducer: async () => {
        if (!userId) throw new Error('');
        const { data: followers } = await Beoble.user.follow.get({
          type: 'follower',
          user_id: userId,
        });
        return followers;
      },
    },
  ]);

  const [followingState, followingQuery] = useQuery([
    {
      key: 'get',
      reducer: async () => {
        if (!userId) throw new Error('');
        const { data: followings } = await Beoble.user.follow.get({
          type: 'following',
          user_id: userId,
        });
        return followings;
      },
    },
  ]);

  const [friendState, friendQuery] = useQuery([
    {
      key: 'get',
      reducer: async () => {
        if (!userId) throw new Error('');
        const { data: friends } = await Beoble.user.friend.get({
          user_id: userId,
        });
        return friends;
      },
    },
  ]);

  const getFollowers = () => followerQuery('get');
  const getFollowings = () => followingQuery('get');
  const getFriends = () => friendQuery('get');

  return {
    followerState,
    followingState,
    friendState,
    getFollowers,
    getFollowings,
    getFriends,
  };
};
