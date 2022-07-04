import ApiClient from '../lib/api';
import { CoreOptions } from '../lib/Models/core';
import { Auth } from './auth';
import { Chat } from './chat';
import { ChatRoom } from './chatroom';
import { Notification } from './notification';
import { IAPIClass } from './types';
import { User } from './user';
import { File } from './file';

export class Core extends IAPIClass {
  public user: User;
  public chatroom: ChatRoom;
  public chat: Chat;
  public auth: Auth;
  public app_id: string;
  public file: File;

  constructor(config: CoreOptions) {
    const client = new ApiClient(config?.authToken);
    super(client);
    this.app_id = config.appId;
    this.user = new User(this._client);
    this.chatroom = new ChatRoom(this._client);
    this.chat = new Chat(this._client);
    this.auth = new Auth(this._client);
    this.file = new File(this._client);
  }

  public notification(user_id: string) {
    return new Notification({
      app_id: this.app_id,
      user_id,
      authToken: this.auth.authToken,
    });
  }
}
