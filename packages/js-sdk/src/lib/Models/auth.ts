import { IResponse } from './response';

export interface IAuthResponse extends IResponse {
  data: {
    message_to_sign: string;
  };
}

export interface IPostLogInBody {
  wallet_address: string;
  signed_message: string;
}
