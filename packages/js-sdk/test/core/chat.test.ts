import { time } from 'console';
import { Core } from '../../src/core';
import { MyWallet } from './index.test';

const core = new Core();

const getWalletChat = async (
  wallet_address: string,
  userIndex = 0,
  chatroomIndex = 0,
  chatIndex = 0
) => {
  const user = await core.user.get({
    wallet_address,
  });
  const user_id = user.data[userIndex].user_id;
  const userChatroom = await core.user.chatroom.get({
    user_id,
  });
  const chatroom_id = userChatroom.data[chatroomIndex].chatroom_id;
  const chat = await core.chatroom.chat.getRecent(chatroom_id, 1);
  const chat_id = chat.data[chatIndex];

  return { user_id, chatroom_id };
};

describe('', () => {
  it('test get chat', async () => {
    const res = await core.chat.get({
      chat_id: '',
    });
  });

  it('test create chat', async () => {
    const timestamp = Date.now().toString();
    const { user_id, chatroom_id } = await getWalletChat(MyWallet);
    const res = await core.chat.create({
      creator_user_id: user_id,
      chatroom_id: chatroom_id,
      content_text: timestamp,
      content_media_url: [],
    });

    console.log(timestamp, res);
    expect(res.data.content_text).toEqual(timestamp);
  });
});
