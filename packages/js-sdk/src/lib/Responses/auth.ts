/* eslint-disable @typescript-eslint/no-empty-interface */
import { IAuthMessage, ILoginData } from '../Models/auth';
import { IResponse } from './response';

export interface ILoginResponse extends IResponse<ILoginData> {}
export interface IAuthResponse extends IResponse<IAuthMessage> {}
