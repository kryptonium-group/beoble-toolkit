import { createComponentStoriesFile } from '@nrwl/react/src/generators/component-story/component-story';
import { Core } from '../../src/core';
import { MyWallet, MasterKeyAuthToken, getUser } from './index.test';
import { MyWallets, TestWallets } from '../constants';

const core = new Core({
  authToken: MasterKeyAuthToken,
});

describe('user test', () => {
  const walletToCreate = MyWallets[2];

  it('add', async () => {
    const res = await core.user.add({
      wallet_address: walletToCreate,
      alias: walletToCreate,
      display_name: walletToCreate,
    });
    console.log(res);

    expect(res.wallets[0]).toEqual(walletToCreate);
    expect(res.alias).toEqual(walletToCreate);
    expect(res.display_name).toEqual(walletToCreate);
  });

  it('get', async () => {
    const WalletToCheck = TestWallets[1];

    const res = await core.user.get({
      wallet_address: '0xcC847f25746Aee67bA796E26D108AF44D0DA4173',
    });

    console.log(res, res.data[0]);

    expect(res.meta.count).toBe(1);
    const user = res.data[0];
    expect(user.wallets[0]).toEqual(WalletToCheck);
  });

  it('update', async () => {
    //const userId = (await core.user.get({ wallet_address: walletToCreate }))
    //  .data[0].user_id;

    const timestamp = Date.now().toString();
    const res = await core.user.update('36bea95d-546b-4874-8ff0-0815b02a6c7a', {
      display_name: timestamp,
    });
    console.log(res);
    expect(res.data.display_name).toEqual(timestamp);
  });
});

describe('user chatroom test', () => {
  it('get Chatroom', async () => {
    const user = await core.user.get({ wallet_address: MyWallet });
    const user_id = user.data[0].user_id;
    const res = await core.user.chatroom.get({
      user_id,
    });

    console.log(user_id);
    console.log(res);

    expect(res.data).not.toBeUndefined();
    expect(Array.isArray(res.data)).toBeTruthy();
    expect(res.data.length).toBeGreaterThanOrEqual(0);
    expect(res.data.length).toEqual(res.meta.count);
    expect(res.data[0]).toHaveProperty('chatroom_id');
  });

  it('test update user chatroom membership', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.chatroom.updateMembership(user_id, {
      target_id: user_id,
      membership_action: 'ADD',
    });
    console.log(res);
  });
});

describe('User Follow Test', () => {
  it('test get follower', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const followRes = await core.user.follow.get({
      type: 'follower',
      user_id,
    });
    console.log(followRes);
  });

  it('test get following', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const followRes = await core.user.follow.get({
      type: 'following',
      user_id,
    });
    console.log(followRes);
  });

  it('test follow', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.follow.follow(user_id, {
      target_user_id: user_id,
    });
    console.log(res);
  });

  it('test unfollow', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.follow.unfollow(user_id, {
      target_user_id: user_id,
    });
    console.log(res);
  });
});

describe('User Report Test', () => {
  it('test get reporter', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.report.get({
      type: 'reporter',
      user_id,
    });
    console.log(res);
  });

  it('test get reporting', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.report.get({
      type: 'reporting',
      user_id,
    });
    console.log(res);
  });

  it('test report', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.report.report();
    console.log(res);
  });

  it('test undo report', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.report.cancel();
    console.log(res);
  });
});

describe('User Friend Test', () => {
  it('test get friend', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.friend.get({
      user_id,
    });
    console.log(res);
  });

  it('test get friend request', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.friend.getRequest({
      user_id,
    });
    console.log(res);
  });

  it('test update friendship: request', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.friend.updateFriendship(user_id, {
      target_user_id: user_id,
      friendship_action_type: 'REQEUST',
    });
    console.log(res);
  });

  it('test update friendship: reject', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.friend.updateFriendship(user_id, {
      target_user_id: user_id,
      friendship_action_type: 'REJECT',
    });
    console.log(res);
  });

  it('test update friendship: request', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.friend.updateFriendship(user_id, {
      target_user_id: user_id,
      friendship_action_type: 'REQEUST',
    });
    console.log(res);
  });

  it('test update friendship: accept', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.friend.updateFriendship(user_id, {
      target_user_id: user_id,
      friendship_action_type: 'ACCEPT',
    });
    console.log(res);
  });

  it('test update friendship: unfriend', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.friend.updateFriendship(user_id, {
      target_user_id: user_id,
      friendship_action_type: 'UNFRIEND',
    });
    console.log(res);
  });
});

describe('User Group Test', () => {
  it('test get user group', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.group.get();
    console.log(res);
  });

  it('test get user group', async () => {
    const { user_id } = await getUser(core, MyWallet);
    const res = await core.user.group.updateMembership();
    console.log(res);
  });
});
