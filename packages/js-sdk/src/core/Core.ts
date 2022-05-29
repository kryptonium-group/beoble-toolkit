import ApiClient from '../lib/api';
import { Auth } from './auth';
import { Chat } from './chat';
import { ChatRoom } from './chatroom';
import { User } from './user';

export class Core {
  private client?: ApiClient;
  public user: User;
  public chatroom: ChatRoom;
  public chat: Chat;
  public auth: Auth;

  constructor() {
    this.client = new ApiClient();
    this.user = new User(this.client);
    this.chatroom = new ChatRoom(this.client);
    this.chat = new Chat(this.client);
    this.auth = new Auth(this.client);
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

// export type ICore = typeof Core;
