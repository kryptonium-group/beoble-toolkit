import { time } from 'console';
import { Paths } from '../../src/constants';
import { Core } from '../../src/core';
import { Channel } from '../../src/core/chat';
import { MyWallet } from './index.test';

const core = new Core({
  authToken: 'sungmingodsungmingod',
});

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
  console.log(chat);

  return { user_id, chatroom_id };
};

describe('Rest API for Chat Test', () => {
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

describe('Websocket Tests', () => {
  it('open websocket', async () => {
    const { user_id, chatroom_id } = await getWalletChat(MyWallet);
    const channel = core.chat.open(chatroom_id);
    channel.send('hi');
    channel.close();
  });

  it('test channel', async () => {
    const { user_id, chatroom_id } = await getWalletChat(MyWallet);
    console.log(Paths.wss.chat(chatroom_id));
    const channel = new Channel({ chatroom_id });
    await channel.watch();
  });
});
