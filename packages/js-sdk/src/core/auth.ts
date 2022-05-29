import { Paths } from '../constants';
import ApiClient from '../lib/api';
import { IAuthResponse, IPostLogInBody } from '../lib/Models/auth';

export class Auth {
  private _client: ApiClient;
  constructor(client: ApiClient) {
    this._client = client;
  }

  public async login(body: IPostLogInBody) {
    return this._client.post(Paths.auth.login.base, body);
  }

  public async getMessage(wallet_address: string): Promise<IAuthResponse> {
    return await this._client.get(Paths.auth.login.message, { wallet_address });
  }
}
