import { AuthToken, Paths } from '../constants';
import ApiClient from '../lib/api';
import {
  IAuthResponse,
  ILoginResponse,
  IPostLogInBody,
} from '../lib/Models/auth';
import { isBrowser } from '../util/environment';
import { IAPIClass } from './types';

export class Auth extends IAPIClass {
  public isAuthorized = false;
  public authToken: string | null = null;

  constructor(client: ApiClient) {
    super(client);
    const token = this.retrieveToken();
    if (token) {
      client.setAuthToekn(token);
      this.authToken = token;
      this.isAuthorized = true;
    }
  }

  public async login(body: IPostLogInBody): Promise<ILoginResponse> {
    const res: ILoginResponse = await this._client.post(
      Paths.auth.login.base,
      body
    );
    this._client.setAuthToekn(res.data.jwt_token);
    this.storeToken(res.data.jwt_token);
    return res;
  }

  public async getMessage(wallet_address: string): Promise<IAuthResponse> {
    return await this._client.get(Paths.auth.login.message, {
      wallet_address,
    });
  }

  // TODO: impl for server side
  private storeToken(token: string): void {
    console.log('hi?', isBrowser());
    if (isBrowser()) {
      window.localStorage.setItem(AuthToken, token);
    } else {
      console.log('should handle server side storing');
      return;
    }
  }

  // TODO: impl for server side
  private retrieveToken(): string | null {
    if (isBrowser()) {
      return window.localStorage.getItem(AuthToken);
    } else {
      return null;
    }
  }
}
