import { Core } from '../../src/core';
import { TestWallets } from '../constants';
import { getUserChatRoom, MasterKeyAuthToken, MyWallet } from './index.test';

const core = new Core({
  authToken: MasterKeyAuthToken,
});

describe('test chatroom api', () => {
  it('get', async () => {
    const { chatroom } = await getUserChatRoom(core, MyWallet);
    const chatroomRes = await core.chatroom.get({
      chatroom_id: chatroom.chatroom_id,
    });
    const chatRoom = chatroomRes.data[0];
    expect(chatRoom.alias).toEqual(chatroom.alias);
  });

  it('create direct chatroom', async () => {
    const userWalletToCreate = TestWallets[1];
    const audienceUserWallet = TestWallets[10];
    const user = await core.user.get({
      wallet_address: userWalletToCreate,
    });

    const audience = await core.user.get({
      wallet_address: audienceUserWallet,
    });

    const secondAudience = await core.user.get({
      wallet_address: TestWallets[3],
    });

    const creator_id = user.data[0].user_id;
    const audience_id = audience.data[0].user_id;

    const res = await core.chatroom.add({
      alias: 'test',
      display_name: 'test',
      creator_id,
      chatroom_type: 'GROUP_CHAT',
      members: [audience_id, secondAudience.data[0].user_id],
    });

    console.log(res);
    expect(res.data).not.toBeUndefined();
    expect(res.data.creator_id).toEqual(creator_id);
  });

  it('create group chatroom', async () => {
    return;
  });

  it('update', async () => {
    const { chatroom } = await getUserChatRoom(core, MyWallet);
    const timestamp = Date.now().toString();
    const res = await core.chatroom.update(chatroom.chatroom_id, {
      alias: timestamp,
    });
    expect(res.data.alias).toEqual(timestamp);
  });
});

describe('test chatroom membership', () => {
  it('test get', async () => {
    const { chatroom, user_id } = await getUserChatRoom(core, MyWallet);
    const res = await core.chatroom.member.get(chatroom.chatroom_id);
    expect(res.data.ADMIN[0].user_id).toEqual(user_id);
  });

  it('test update user membership', async () => {
    const { chatroom, user_id } = await getUserChatRoom(core, MyWallet);

    const res = await core.chatroom.member.update(chatroom.chatroom_id, {
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
});
