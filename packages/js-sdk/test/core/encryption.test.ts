import { Core } from '../../src/core';
import { Encrypter } from '../../src/core/encryption';
import { demoAppId, MasterKeyAuthToken } from './index.test';

const core = new Core({
  authToken: MasterKeyAuthToken,
  appId: demoAppId,
});

const testSecretKey = 'secretkey';
const testPubKey = 'pXx7Rx/lI94dA/QWpw4bEwO7Kepy6Pnopgsnwu3io1w=';

describe('test for encryption', () => {
  const encrypter = new Encrypter();
  encrypter.setSecretKey(testSecretKey);
  it('tests wallet private key', () => {
    return;
  });

  it('text basic encryption', () => {
    const testText = 'encrypt this';
    const encrypted = encrypter.encrypt(testText);
    const decrypted = encrypter.decrypt(encrypted);
    console.log(encrypted, decrypted);
    expect(testText).toEqual(decrypted);
  });

  it('object basic encryption', () => {
    const testObj = {
      name: 'hi',
      description: 'test this plz!',
    };
    const encrypted = encrypter.encrypt(testObj);
    const decrypted = encrypter.decrypt(encrypted);
    console.log(encrypted, decrypted);
    expect(testObj).toEqual(decrypted);
  });

  it('array basic encryption', () => {
    const testObj = [
      {
        name: 'hi',
        description: 'test this plz!',
      },
      'hi',
    ];
    const encrypted = encrypter.encrypt(testObj);
    const decrypted = encrypter.decrypt(encrypted);
    console.log(encrypted, decrypted);
    expect(testObj).toEqual(decrypted);
  });

  it('see eth encrypt result', async () => {
    const testText = 'hihi';
    const encrypted = await encrypter.ethEncrypt(testText, testPubKey);
    console.log(encrypted);
  });
});
