import { Paths } from '../constants';
import ApiClient from '../lib/api';
import NotInitializedException from '../lib/Exceptions/NotInitializedException';
import { Rest } from './types';

export default class Core {
  private client?: ApiClient;

  public init() {
    this.client = new ApiClient();
  }

  @initialized()
  public user(restType: Rest, data?: any) {
    this.client?.delete;
  }

  @initialized()
  public async getUser(wallet_address: string) {
    const data = await this.client?.get(Paths.user.base, {
      wallet_address,
    });
    console.log(data);
  }
}

function initialized() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (target.client) throw new NotInitializedException();
  };
}
