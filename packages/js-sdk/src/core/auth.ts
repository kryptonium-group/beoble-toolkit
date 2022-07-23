import { AuthToken, Paths } from '../constants';
import ApiClient from '../lib/api';
import { ILoginData } from '../lib/Models/auth';
import { IPostLogInBody } from '../lib/Requests/auth';
import { IAuthResponse, ILoginResponse } from '../lib/Responses/auth';
import { isBrowser } from '../util/environment';
import { isDateOver } from '../util/time';
import { IAPIClass } from './types';

export class Auth extends IAPIClass {
  public isAuthorized = false;
  public authToken: string | null = null;

  constructor(client: ApiClient) {
    super(client);
  }

  public initAuth = (wallet_address: string) => {
    const authData = this.retrieveAuthData(wallet_address);
    if (authData) {
      this._client.setAuthToekn(authData.jwt_token);
      this.authToken = authData.jwt_token;
      this.isAuthorized = true;
    }
  };

  public async login(body: IPostLogInBody): Promise<ILoginResponse> {
    const res: ILoginResponse = await this._client.post(
      Paths.auth.login.base,
      body
    );
    this._client.setAuthToekn(res.data.jwt_token);
    this.storeAuthData(res.data);
    return res;
  }

  public async getMessage(wallet_address: string): Promise<IAuthResponse> {
    return await this._client.get(Paths.auth.login.message, {
      wallet_address,
    });
  }

  // TODO: impl for server side
  private storeAuthData(data: ILoginData): void {
    if (isBrowser()) {
      window.localStorage.setItem(
        `${AuthToken}_${data.login_account_address}`,
        JSON.stringify(data)
      );
    } else {
      console.log('should handle server side storing');
      return;
    }
  }

  // TODO: impl for server side
  public retrieveAuthData(wallet_address: string): ILoginData | null {
    if (isBrowser()) {
      try {
        const retrievedAuthData = window.localStorage.getItem(
          `${AuthToken}_${wallet_address}`
        );
        return retrievedAuthData !== null
          ? JSON.parse(retrievedAuthData)
          : null;
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }

  public checkAuthTokenValidity(wallet_address: string): boolean {
    if (isBrowser()) {
      const existingToken = this.retrieveAuthData(wallet_address);
      if (!existingToken) return false;
      else return !isDateOver(existingToken.expiry_date);
    } else {
      return false;
    }
  }
}
