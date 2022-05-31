import { Core } from '../../src/core';
import { MasterKeyAuthToken, MyWallet } from './index.test';

const core = new Core({
  authToken: MasterKeyAuthToken,
});

const getWalletChatRoom = async (wallet: string, index = 0) => {
  const user = await core.user.get({
    wallet_address: wallet,
  });
  const user_id = user.data[0].user_id;
  const res = await core.user.chatroom.get({ user_id });
  const userChatroom = res.data[index];
  return { user_id, userChatroom };
};

describe('test chatroom api', () => {
  it('get', async () => {
    const { userChatroom } = await getWalletChatRoom(MyWallet);
    const chatroomRes = await core.chatroom.get({
      chatroom_id: userChatroom.chatroom_id,
    });
    const chatRoom = chatroomRes.data[0];
    expect(chatRoom.alias).toEqual(userChatroom.alias);
  });

  it('create', async () => {
    const user = await core.user.get({
      wallet_address: MyWallet,
    });
    const creator_id = user.data[0].user_id;

    const res = await core.chatroom.add({
      alias: 'test',
      display_name: 'test',
      creator_id,
      chatroom_type: 'DIRECT_CHAT',
    });
    expect(res.data).not.toBeUndefined();
    expect(res.data.creator_id).toEqual(creator_id);
  });

  it('update', async () => {
    const { userChatroom } = await getWalletChatRoom(MyWallet);
    const timestamp = Date.now().toString();
    const res = await core.chatroom.update(userChatroom.chatroom_id, {
      alias: timestamp,
    });
    expect(res.data.alias).toEqual(timestamp);
  });
});

describe('test chatroom membership', () => {
  it('test get', async () => {
    const { userChatroom, user_id } = await getWalletChatRoom(MyWallet);
    const res = await core.chatroom.member.get(userChatroom.chatroom_id);
    expect(res.data.ADMIN[0].user_id).toEqual(user_id);
  });

  it('test update user membership', async () => {
    const { userChatroom, user_id } = await getWalletChatRoom(MyWallet);

    const res = await core.chatroom.member.update(userChatroom.chatroom_id, {
      user_ids: [user_id],
      membership_type: 'NORMAL',
      membership_action: 'ADD',
    });
    console.log(res);
  });
});

describe('test chatroom chat', () => {
  it('test get recent chat', async () => {
    const { userChatroom } = await getWalletChatRoom(MyWallet);
    const res = await core.chatroom.chat.getRecent(
      userChatroom.chatroom_id,
      100
    );
    console.log(res);
  });
});
