import { ethers } from 'ethers';
import { Core } from '../../src/core';
import { MyWallet } from './index.test';

const core = new Core();

describe('beoble Authentication test', () => {
  it('test whole process of signing key and login', async () => {
    const testWallet = ethers.Wallet.createRandom();
    console.log(testWallet);

    const user = await core.user.add({
      wallet_address: testWallet.address,
      alias: testWallet.address,
      display_name: testWallet.address,
    });
    console.log(user);

    const messageRes = await core.auth.getMessage(MyWallet);
    console.log(messageRes);

    const signedMessage = await testWallet.signMessage(
      messageRes.data.message_to_sign
    );
    console.log(signedMessage);

    const loginRes = await core.auth.login({
      wallet_address: testWallet.address,
      signed_message: signedMessage,
    });
    console.log(loginRes);
  });
});
