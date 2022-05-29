import { Paths } from '../constants';
import {
  IGetChatRoomResponse,
  IGetUserChatRoomParams,
  IGetUserParams,
  IPostUserBody,
  IPutUserBody,
  IUser,
  IUserPutResponse,
  IUserResponse,
} from '../lib';
import ApiClient from '../lib/api';
import { IRestEndPoint } from './types';

export class User implements IRestEndPoint {
  private _clinet: ApiClient;
  public chatroom: UserChatRoom;
  constructor(client: ApiClient) {
    this._clinet = client;
    this.chatroom = new UserChatRoom(this._clinet);
  }

  public async get(params: IGetUserParams): Promise<IUserResponse> {
    return await this._clinet.get(Paths.user.base, params);
  }

  public async update(
    user_id: string,
    body: IPutUserBody
  ): Promise<IUserPutResponse> {
    return await this._clinet.put(`${Paths.user.base}/${user_id}`, body);
  }

  public async add(body: IPostUserBody): Promise<IUser> {
    return await this._clinet.post(Paths.user.base, body);
  }
}

class UserChatRoom {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }

  public async get(
    params: IGetUserChatRoomParams
  ): Promise<IGetChatRoomResponse> {
    return await this._clinet.get(Paths.user.chatroom.base, params);
  }

  public async updateMembership() {
    return;
  }
}

class UserFollow {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }
}

class UserFriend {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }
}

class UserReport {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }
}
