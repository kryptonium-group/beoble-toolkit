import ApiClient from '../lib/api';
import { Chat } from './chat';
import { ChatRoom } from './chatroom';
import { User } from './user';

export class Core {
  private client?: ApiClient;
  public user: User;
  public chatroom: ChatRoom;
  public chat: Chat;

  constructor() {
    this.client = new ApiClient();
    this.user = new User(this.client);
    this.chatroom = new ChatRoom(this.client);
    this.chat = new Chat(this.client);
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
