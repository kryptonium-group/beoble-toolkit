import { IResponse } from './response';

export interface IAuthResponse extends IResponse {
  data: {
    message_to_sign: string;
  };
}

export interface IPostLogInBody {
  wallet_address: string;
  signature: string;
}

export interface ILoginResponse extends IResponse {
  data: {
    login_account_address: string;
    jwt_token: string;
  };
}
