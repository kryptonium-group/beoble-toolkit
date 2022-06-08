import { time } from 'console';
import { Paths } from '../../src/constants';
import { Core } from '../../src/core';
import { Channel } from '../../src/core/chat';
import { IChat, IPostChatBody } from '../../src/lib';
import {
  getUser,
  getUserChatRoom,
  MyWallet,
  TestChatRoomId,
} from './index.test';

const core = new Core({
  authToken: 'sungmingodsungmingod',
});

describe('Rest API for Chat Test', () => {
  it('test get chat', async () => {
    const res = await core.chat.get({
      chat_id: '',
    });
  });

  it('test create chat', async () => {
    const timestamp = Date.now().toString();
    const { user_id, chatroom_id } = await getUserChatRoom(core, MyWallet);
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
    const { chatroom_id } = await getUserChatRoom(core, MyWallet);
    const channel = core.chat.open(chatroom_id);
    channel.send('hi');
    channel.close();
  });

  it('test channel', async () => {
    const { user_id } = await getUser(core, MyWallet);

    const channel = new Channel({ chatroom_id: TestChatRoomId });
    const timestamp = Date.now().toString();
    const messageToUpload = `JS SDK Testing at ${timestamp}`;

    await channel.open();
    const testChat: IPostChatBody = {
      creator_user_id: user_id,
      chatroom_id: TestChatRoomId,
      content_text: messageToUpload,
    };
    channel.sendMessage(testChat);

    const recentChats = await core.chatroom.chat.getRecent(TestChatRoomId, 1);
    console.log(recentChats);
    expect(recentChats.data).toHaveLength(1);
    expect(recentChats.data[0].content_text).toEqual(messageToUpload);
  });

  it('test core channel with auth', async () => {
    const { user_id, chatroom_id } = await getUserChatRoom(core, MyWallet);
    const channel = core.chat.channel({
      chatroom_id,
    });
    const timestamp = Date.now().toString();
    const messageToUpload = `JS SDK Testing at ${timestamp}`;
    console.log(messageToUpload);
    await channel.open();
    const testChat: IPostChatBody = {
      creator_user_id: user_id,
      chatroom_id: chatroom_id,
      content_text: messageToUpload,
    };
    await channel.sendMessage(testChat);
    const recentChats = await core.chatroom.chat.getRecent(chatroom_id, 1);
    expect(recentChats.data).toHaveLength(1);
    expect(recentChats.data[0].content_text).toEqual(messageToUpload);
  });
});
