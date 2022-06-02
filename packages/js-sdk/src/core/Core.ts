import ApiClient from '../lib/api';
import { CoreOptions } from '../lib/Models/core';
import { Auth } from './auth';
import { Chat } from './chat';
import { ChatRoom } from './chatroom';
import { IAPIClass } from './types';
import { User } from './user';

export class Core extends IAPIClass {
  public user: User;
  public chatroom: ChatRoom;
  public chat: Chat;
  public auth: Auth;

  constructor(config?: CoreOptions) {
    const client = new ApiClient(config?.authToken);
    super(client);
    this.user = new User(this._client);
    this.chatroom = new ChatRoom(this._client);
    this.chat = new Chat(this._client);
    this.auth = new Auth(this._client);
  }
}

function initialized(client?: ApiClient) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // if (target.client) throw new NotInitializedException();
  };
}
