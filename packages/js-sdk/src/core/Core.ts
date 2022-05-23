import ApiClient from '../lib/api';
import { User } from './user';

export class Core {
  private client?: ApiClient;
  public user: User;

  constructor() {
    this.client = new ApiClient();
    this.user = new User(this.client);
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
