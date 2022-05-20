import axios from 'axios';
import { url } from 'inspector';
import Core from '../../src/core';

const MyWallet = '0xb033fB14cF7Dc769488Ad34Ae90D4b3AD810BB25';

describe('example test', () => {
  it('core should be able to handle methods', async () => {
    const core = new Core();
    expect([]).toEqual([]);
  });

  it('test axios', async () => {
    const res = await axios({
      method: 'get',
      baseURL: 'https://dev.api.beoble.app',
      url: '/user',
      params: {
        wallet_id: MyWallet,
      },
    });

    expect(typeof res.data).toBe('object');
    expect(res.data.data).toEqual([]);
  });
});

describe('user test', () => {
  const core = new Core();
  const walletToCreate = MyWallet;

  it('add', async () => {
    const res = await core.user.add({
      wallet_address: MyWallet,
      alias: MyWallet,
      display_name: MyWallet,
    });

    expect(res.wallets[0]).toEqual(MyWallet);
    expect(res.alias).toEqual(MyWallet);
    expect(res.display_name).toEqual(MyWallet);
  });

  it('get', async () => {
    const res = await core.user.get({
      wallet_address: MyWallet,
    });

    console.log(res.data);

    expect(res.meta.count).toBe(1);
    const user = res.data[0];
    expect(user.wallets[0]).toEqual(MyWallet);
  });

  it('update', async () => {
    const userId = (await core.user.get({ wallet_address: walletToCreate }))
      .data[0].user_id;

    const res = await core.user.update(userId, {
      display_name: 'test',
    });
  });
});
