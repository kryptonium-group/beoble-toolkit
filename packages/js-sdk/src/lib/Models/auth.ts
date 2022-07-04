export interface IAuthMessage {
  message_to_sign: string;
}

export interface ILoginData {
  login_account_address: string;
  jwt_token: string;
}
