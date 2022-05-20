import { Paths } from '../constants';
import ApiClient from '../lib/api';
import NotInitializedException from '../lib/Exceptions/NotInitializedException';
import { Rest } from './types';
import { User } from './user';

export default class Core {
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
