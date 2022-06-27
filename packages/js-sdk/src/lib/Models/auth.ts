/* eslint-disable @typescript-eslint/no-empty-interface */
import { IResponse } from '../Responses/response';

interface IAuthMessage {
  message_to_sign: string;
}
export interface IAuthResponse extends IResponse<IAuthMessage> {}

export interface IPostLogInBody {
  wallet_address: string;
  signature: string;
}

interface ILoginData {
  login_account_address: string;
  jwt_token: string;
}

export interface ILoginResponse extends IResponse<ILoginData> {}
