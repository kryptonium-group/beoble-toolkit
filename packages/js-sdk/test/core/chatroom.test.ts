import { Core } from '../../src/core';
import { TestWallets } from '../constants';
import {
  ch,
  getUserChatRoom,
  getUserRecentChat,
  MasterKeyAuthToken,
  MyWallet,
  sung,
} from './index.test';

const core = new Core({
  authToken: MasterKeyAuthToken,
});
const nullMemberChatRoomId = '617c7215-8c1a-4dc6-b6ed-c5b102bd8462';

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
    const userWalletToCreate = TestWallets[1];
    const audienceUserWallet = TestWallets[10];
    const user = await core.user.get({
      wallet_address: MyWallet,
    });

    const audience = await core.user.get({
      wallet_address: '0x0A68E9d33bf07E06d657f46cfB17f0955E402adD',
    });

    const secondAudience = await core.user.get({
      wallet_address: TestWallets[3],
    });

    console.log(audience);

    const creator_id = user.data[0].id;
    const audience_id = audience.data[0].id;

    const res = await core.chatroom.add({
      alias: 'test',
      display_name: 'test',
      creator_id,
      chatroom_type: 'DIRECT_CHAT',
      members: [audience_id],
    });

    console.log(res);
    expect(res.data).not.toBeUndefined();
    expect(res.data.channel.created_by.id).toEqual(creator_id);
  });

  it('create group chatroom', async () => {
    const user = await core.user.get({
      wallet_address: MyWallet,
    });

    const creator_id = user.data[0].id;

    const res = await core.chatroom.add({
      alias: 'test',
      display_name: 'test',
      creator_id,
      chatroom_type: 'GROUP_CHAT',
      members: [ch, sung],
    });

    console.log(res);
    expect(res.data).not.toBeUndefined();
    expect(res.data.channel.created_by.id).toEqual(creator_id);
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
