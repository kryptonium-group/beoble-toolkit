import { Paths } from '../constants';
import {
  IGetUserParams,
  IPostUserBody,
  IPutUserBody,
  IUser,
  IUserResponse,
} from '../lib';
import ApiClient from '../lib/api';
import { IRestEndPoint } from './types';

export class User implements IRestEndPoint {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }

  public async get(params: IGetUserParams): Promise<IUserResponse> {
    return await this._clinet.get(Paths.user.base, params);
  }

  public async update(user_id: string, body: IPutUserBody): Promise<IUser> {
    return await this._clinet.put(`${Paths.user.base}/${user_id}`, body);
  }

  public async add(body: IPostUserBody): Promise<IUser> {
    return await this._clinet.post(Paths.user.base, body);
  }
}
