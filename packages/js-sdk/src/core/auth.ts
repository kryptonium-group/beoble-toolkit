import { Paths } from '../constants';
import ApiClient from '../lib/api';
import {
  IAuthResponse,
  ILoginResponse,
  IPostLogInBody,
} from '../lib/Models/auth';

export class Auth {
  private _client: ApiClient;
  constructor(client: ApiClient) {
    this._client = client;
  }

  public async login(body: IPostLogInBody): Promise<ILoginResponse> {
    const res: ILoginResponse = await this._client.post(
      Paths.auth.login.base,
      body
    );
    this._client.setAuthToekn(res.data.jwt_token);
    return res;
  }

  public async getMessage(wallet_address: string): Promise<IAuthResponse> {
    return await this._client.get(Paths.auth.login.message, {
      wallet_address,
    });
  }
}
