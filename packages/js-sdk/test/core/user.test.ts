import { Core } from '../../src/core';
import { MyWallet, MasterKeyAuthToken } from './index.test';

const core = new Core({
  authToken: MasterKeyAuthToken,
});

describe('user test', () => {
  const walletToCreate = MyWallet;

  it('add', async () => {
    const res = await core.user.add({
      wallet_address: MyWallet,
      alias: MyWallet,
      display_name: MyWallet,
    });
    console.log(res);

    expect(res.wallets[0]).toEqual(MyWallet);
    expect(res.alias).toEqual(MyWallet);
    expect(res.display_name).toEqual(MyWallet);
  });

  it('get', async () => {
    const res = await core.user.get({
      wallet_address: MyWallet,
    });

    console.log(res, res.data[0]);

    expect(res.meta.count).toBe(1);
    const user = res.data[0];
    expect(user.wallets[0]).toEqual(MyWallet);
  });

  it('update', async () => {
    const userId = (await core.user.get({ wallet_address: walletToCreate }))
      .data[0].user_id;

    const timestamp = Date.now().toString();
    const res = await core.user.update(userId, {
      display_name: timestamp,
    });
    console.log(res);
    expect(res.data.display_name).toEqual(timestamp);
  });
});

describe('user chatroom test', () => {
  const core = new Core();
  it('get Chatroom', async () => {
    const user = await core.user.get({ wallet_address: MyWallet });
    console.log(user);
    const user_id = user.data[0].user_id;
    const res = await core.user.chatroom.get({
      user_id,
    });
    console.log(user_id, res);
  });
});

describe('User Follow Test', () => {
  it('test get follower', async () => {
    return;
  });

  it('test get following', async () => {
    return;
  });

  it('test follow', async () => {
    return;
  });

  it('test unfollow', async () => {
    return;
  });
});

describe('User Report Test', () => {
  it('test get reporter', async () => {
    return;
  });

  it('test get reporting', async () => {
    return;
  });

  it('test report', async () => {
    return;
  });

  it('test undo report', async () => {
    return;
  });
});
describe('User Friend Test', () => {
  it('test get friend', async () => {
    return;
  });

  it('test get friend request', async () => {
    return;
  });

  it('test ', async () => {
    return;
  });
});
describe('User Group Test', () => {
  it('', async () => {
    return;
  });
});
