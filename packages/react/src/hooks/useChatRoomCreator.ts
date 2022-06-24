import { IUser } from '@beoble/js-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useBeoble } from './useBeoble';
import useChat from './useChat';
import useDebounce from './useDebounce';
import { useSearch } from './useSearch';
import { useUser } from './useUser';

export const useChatRoomCreator = () => {
  const [members, setMembers] = useState<IUser[]>([]);

  const {
    friends,
    followings,
    getFriends,
    getFollowings,
    isFriendFetching,
    isFollowingFetching,
  } = useUser();

  const { openChat, updateChatrooms } = useChat();
  const {
    searchResult,
    isSearching,
    searchValue,
    isDebouncing,
    restSearchValue,
    setSearchValue,
  } = useSearch();

  const isLoading =
    isFriendFetching || isFollowingFetching || isSearching || isDebouncing;

  const { Beoble, user } = useBeoble();

  const reset = () => {
    setMembers([]);
    restSearchValue();
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
      openChat(res.data.chatroom_id);
      updateChatrooms();
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
    createChatRoom,
    toggleMember,
  };
};
