import { Core, IUser, IUsersResponse } from '@beoble/js-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useBeoble } from './useBeoble';
import { useUser } from './useUser';

export const useChatRoomCreator = () => {
  const [members, setMembers] = useState<IUser[]>([]);

  //searches
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const {
    friends,
    followings,
    getFriends,
    getFollowings,
    isFriendFetching,
    isFollowingFetching,
  } = useUser();

  const isLoading = isFriendFetching || isFollowingFetching || isSearching;

  const { Beoble, user } = useBeoble();

  useEffect(() => {
    if (Beoble && user) {
      getFriends(user.user_id);
      getFollowings(user.user_id);
    }
  }, [Beoble, user]);

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
