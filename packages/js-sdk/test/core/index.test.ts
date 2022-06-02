import { Core } from '../../src/core';

// all the values here should be in .env file
export const MyWallet = '0xb033fB14cF7Dc769488Ad34Ae90D4b3AD810BB25';
export const MasterKeyAuthToken = 'sungmingodsungmingod';
export const TestChatRoomId = '503fb3af-b006-460b-862b-efb47184a2cb';

export const getUser = async (core: Core, wallet_address: string) => {
  const res = await core.user.get({
    wallet_address,
  });
  try {
    const user = res.data[0];
    const user_id = user.user_id;
    return { user, user_id };
  } catch {
    throw new Error(
      `TestError: there is no such user with address ${wallet_address}`
    );
  }
};

export const getUserChatRoom = async (
  core: Core,
  wallet_address: string,
  chatroom_index = 0
) => {
  const { user, user_id } = await getUser(core, wallet_address);
  const res = await core.user.chatroom.get({
    user_id,
  });
  try {
    const chatroom = res.data[chatroom_index];
    const chatroom_id = chatroom.chatroom_id;
    return { user, user_id, chatroom, chatroom_id };
  } catch {
    throw new Error(`TestError: there is no chatroom under ${wallet_address}`);
  }
};

export const getUserRecentChat = async (
  core: Core,
  wallet_address: string,
  chatroom_index = 0,
  chat_number = 1
) => {
  const { user, user_id, chatroom, chatroom_id } = await getUserChatRoom(
    core,
    wallet_address,
    chatroom_index
  );
  const res = await core.chatroom.chat.getRecent(chatroom_id, chat_number);
  try {
    const chat = res.data[0];
    const chat_id = chat.chat_id;
    return { user, user_id, chatroom, chatroom_id, chat, chat_id };
  } catch {
    throw new Error(
      `TestError: there is no recent chat under ${wallet_address} in chatroom_id ${chatroom_id}`
    );
  }
};
