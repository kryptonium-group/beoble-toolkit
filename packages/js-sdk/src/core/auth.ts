import { Paths } from '../constants';
import {
  IAuthResponse,
  ILoginResponse,
  IPostLogInBody,
} from '../lib/Models/auth';
import { IAPIClass } from './types';

export class Auth extends IAPIClass {
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
