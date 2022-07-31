import ApiClient from '../lib/api';
import { CoreOptions } from '../lib/Models/core';
import { Auth } from './auth';
import { Chat } from './chat';
import { ChatRoom } from './chatroom';
import { Notification } from './notification';
import { IAPIClass } from './types';
import { User } from './user';
import { Attachment } from './attachment';
import { Encryption } from './encryption';
import { isBrowser } from '../util';

export class Core extends IAPIClass {
  public user: User;
  public chatroom: ChatRoom;
  public chat: Chat;
  public auth: Auth;
  public app_id: string;
  public attachment: Attachment;
  public encryption: Encryption;

  constructor(config: CoreOptions) {
    const client = new ApiClient(config?.authToken);
    super(client);
    this.app_id = config.appId;
    this.user = new User(this._client);
    this.encryption = new Encryption(this._client);
    this.chatroom = new ChatRoom(this._client, this.encryption);
    this.chat = new Chat(this._client);
    this.auth = new Auth(this._client);
    this.attachment = new Attachment(this._client);
  }

  /**
   * Init beoble sdk with address.
   * @param wallet_address
   */
  public initialize(wallet_address: string) {
    this.auth.initAuth(wallet_address);
  }

  public notification(user_id: string) {
    return new Notification({
      app_id: this.app_id,
      user_id,
      authToken: this.auth.authToken,
    });
  }

  public async updatePublicKey(wallet_address: string, user_id: string) {
    if (isBrowser()) {
      try {
        const metamaskPublicKey = await window.ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [wallet_address],
        });

        console.log(metamaskPublicKey);
        const res = await this.user.update(user_id, {
          public_key: metamaskPublicKey,
        });
        return res;
      } catch {
        return;
      }
    } else {
      //TODO
      return;
    }
  }
}
