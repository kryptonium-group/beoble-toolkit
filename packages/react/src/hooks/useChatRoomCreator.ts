import { IUser } from '@beoble/js-sdk';
import { ChangeEvent, useState } from 'react';
import { useBeoble } from './useBeoble';
import useChat from './useChat';
import { useSearch } from './useSearch';
import { useUser } from './useUser';

type Page = 'select_members' | 'chatroom_config';
interface IChatroomConfig {
  alias: string;
  display_name: string;
}

export const useChatRoomCreator = () => {
  const [members, setMembers] = useState<IUser[]>([]);
  const [page, setPage] = useState<Page>('select_members');
  const [config, setConfig] = useState<IChatroomConfig>({
    alias: '',
    display_name: '',
  });

  const { friends, followings, isFriendFetching, isFollowingFetching } =
    useUser();

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
    setPage('select_members');
    restSearchValue();
  };

  const toggleMember = (user: IUser) => {
    // remove member
    if (members.find((member) => member.id === user.id)) {
      setMembers((prev) => prev.filter((member) => member.id !== user.id));
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
    if (user) {
      const res = await Beoble.chatroom.add({
        alias: config.alias,
        display_name: config.display_name,
        creator: user,
        chatroom_type: members.length > 1 ? 'GROUP_CHAT' : 'DIRECT_CHAT',
        members: members,
      });
      openChat(res.data.channel.id);
      updateChatrooms();
      callback && callback();
    }
  };

  const goToChatroomSetting = () => {
    setPage('chatroom_config');
  };

  const handleConfigChage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfig({
      ...config,
      [e.target.id]: e.target.value,
    });
  };

  return {
    friends,
    followings,
    members,
    isLoading,
    searchResult,
    searchValue,
    page,
    config,
    setSearchValue,
    reset,
    createChatRoom,
    toggleMember,
    goToChatroomSetting,
    handleConfigChage,
  };
};
