import { ethers } from 'ethers';
import { AES, enc } from 'crypto-js';
import { bufferToHex } from 'ethereumjs-util';
import { encrypt } from '@metamask/eth-sig-util';
import { Paths } from '../constants';
import { IAPIClass } from './types';
import { isBrowser } from '../util';

export class Encryption extends IAPIClass {
  /**
   * Beoble's public key is being used for unregistered user's encryption
   * @returns Beoble's puiblic key to encrypt
   */
  public async getBeobleKey() {
    return this._client.get(Paths.encryption.beoble);
  }
}

export class Encrypter {
  private secretKey: string | null = null;
  public hasKey = this.secretKey !== null;

  public generateKey() {
    const wallet = ethers.Wallet.createRandom();
    return wallet.privateKey;
  }

  public setSecretKey(secretKey?: string) {
    this.secretKey = secretKey ?? this.generateKey();
  }

  /**
   * Encrypt message with AES 256 and private key.
   * @param message
   * @returns
   */
  public encrypt(message: string | object) {
    if (!this.secretKey)
      throw new Error('You should initialize secret key first');
    if (typeof message === 'object') message = JSON.stringify(message);
    return AES.encrypt(message, this.secretKey).toString();
  }

  public decrypt(chipher: string) {
    if (!this.secretKey)
      throw new Error('You should initialize secret key first');
    const bytes = AES.decrypt(chipher, this.secretKey);
    return JSON.parse(bytes.toString(enc.Utf8));
  }

  public async ethDecrypt(
    encryptedMessage: string,
    address: string,
    provider?: ethers.providers.ExternalProvider
  ): Promise<string> {
    if (provider && provider.request)
      return await provider.request({
        method: 'eth_decrypt',
        params: [encryptedMessage, address],
      });
    else if (isBrowser())
      return await window.ethereum.request({
        method: 'eth_decrypt',
        params: [encryptedMessage, address],
      });
    // TODO implement for Node env
    else return '';
  }

  public async ethEncrypt(message: string, publicKey: string) {
    return bufferToHex(
      Buffer.from(
        JSON.stringify(
          encrypt({
            publicKey,
            data: message,
            version: 'x25519-xsalsa20-poly1305',
          })
        ),
        'utf-8'
      )
    );
  }
}
