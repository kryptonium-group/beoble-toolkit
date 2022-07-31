import { Core } from '../../src/core';
import {
  demoAppId,
  getUserChatRoom,
  getUserRecentChat,
  MasterKeyAuthToken,
  MyWallet,
} from './index.test';

const core = new Core({
  authToken: MasterKeyAuthToken,
  appId: demoAppId,
});

describe('test chatroom api', () => {
  it('get', async () => {
    const { chatroom } = await getUserChatRoom(core, MyWallet);
    const chatroomRes = await core.chatroom.get({
      chatroom_id: chatroom.channel.id,
    });
    console.log(chatroomRes);
    const chatRoom = chatroomRes.data[0];
    expect(chatRoom.channel.alias).toEqual(chatroom.channel.alias);
  });

  it('create direct chatroom', async () => {
    const user = await core.user.get({
      wallet_address: MyWallet,
    });

    const audience = await core.user.get({
      wallet_address: '0xF329D592E09b27f6c784DA18C74087024Af69F26',
    });

    const creator_id = user.data[0].id;
    const audienceUser = audience.data[0];

    const res = await core.chatroom.add({
      alias: 'test',
      display_name: 'test',
      creator: user.data[0],
      chatroom_type: 'DIRECT_CHAT',
      members: [audienceUser],
    });

    console.log(res);
    // expect(res.data).not.toBeUndefined();
    // expect(res.data.channel.created_by.id).toEqual(creator_id);
  });

  it('create group chatroom', async () => {
    const user = await core.user.get({
      wallet_address: MyWallet,
    });

    const creator_id = user.data[0].id;

    const userFollowers = await core.user.follow.get({
      type: 'follower',
      user_id: creator_id,
    });

    const res = await core.chatroom.add({
      alias: 'test',
      display_name: 'test',
      creator: user.data[0],
      chatroom_type: 'GROUP_CHAT',
      members: userFollowers.data,
    });

    // console.log(res);
    // expect(res.data).not.toBeUndefined();
    // expect(res.data.channel.created_by.id).toEqual(creator_id);
  });

  it('update', async () => {
    const { chatroom } = await getUserChatRoom(core, MyWallet);
    const timestamp = Date.now().toString();
    const res = await core.chatroom.update(chatroom.channel.id, {
      alias: timestamp,
    });
    expect(res.data.channel.alias).toEqual(timestamp);
  });
});

describe('test chatroom membership', () => {
  it('test get', async () => {
    const { chatroom, user_id } = await getUserChatRoom(core, MyWallet);
    const res = await core.chatroom.member.get(chatroom.channel.id);
    console.log(JSON.stringify(res));
    expect(res.data.ADMIN[0].id).toEqual(user_id);
  });

  it('test update user membership', async () => {
    const { chatroom, user_id } = await getUserChatRoom(core, MyWallet);

    const res = await core.chatroom.member.update(chatroom.channel.id, {
      user_ids: [user_id],
      membership_type: 'NORMAL',
      membership_action: 'ADD',
    });
    console.log(res);
  });
});

describe('test chatroom chat', () => {
  it('test get recent chat', async () => {
    const { chatroom_id } = await getUserChatRoom(core, MyWallet);
    const res = await core.chatroom.chat.getRecent(chatroom_id, 15);
    console.log(res);
  });

  test('mark as read', async () => {
    const { chatroom_id, user_id, chat_id } = await getUserRecentChat(
      core,
      MyWallet
    );
    const last_chat = await core.chatroom.chat.getRecent(chatroom_id, 15);
    const res = await core.chatroom.chat.markAsRead({
      user_id,
      chat_id,
      chatroom_id,
    });
    console.log(res);
  });
});
