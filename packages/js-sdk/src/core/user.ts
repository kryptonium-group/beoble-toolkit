import { Paths } from '../constants';
import {
  IChatRoomsResponse,
  IGetUserChatRoomParams,
  IGetUserParams,
  IPostUserBody,
  IPutUserBody,
  IUser,
  IUserPutResponse,
  IUserResponse,
} from '../lib';
import ApiClient from '../lib/api';
import { IUserIdParam } from '../lib/Models/request';
import { IRestEndPoint } from './types';

export class User implements IRestEndPoint {
  private _clinet: ApiClient;
  public chatroom: UserChatRoom;
  public follow: UserFollow;
  public friend: UserFriend;
  public report: UserReport;
  public group: UserGroup;

  constructor(client: ApiClient) {
    this._clinet = client;
    this.chatroom = new UserChatRoom(this._clinet);
    this.follow = new UserFollow(this._clinet);
    this.friend = new UserFriend(this._clinet);
    this.report = new UserReport(this._clinet);
    this.group = new UserGroup(this._clinet);
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
  ): Promise<IChatRoomsResponse> {
    return await this._clinet.get(Paths.user.chatroom.base, params);
  }

  public async updateMembership() {
    return;
  }
}

export type FollowType = 'follower' | 'following';
export interface IGetFollowParams extends IUserIdParam {
  type: FollowType;
}

class UserFollow implements IRestEndPoint {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }

  public async get({ type, user_id }: IGetFollowParams) {
    const Path =
      type === 'follower'
        ? Paths.user.follow.follower
        : Paths.user.follow.following;
    return await this._clinet.get(Path, {
      user_id,
    });
  }

  public async update() {
    return;
  }

  public async delete() {
    return;
  }
}
export interface IPutFriendshipBody {
  target_user_id: string;
  friendship_action_type: FreindshipActionType;
}

export type FreindshipActionType = 'REQEUST' | 'ACCEPT' | 'UNFRIEND' | 'REJECT';

class UserFriend implements IRestEndPoint {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }

  public async get(params: IUserIdParam) {
    return await this._clinet.get(Paths.user.friend.base, params);
  }

  public async getRequest(params: IUserIdParam) {
    return await this._clinet.get(Paths.user.friend.request, params);
  }

  public async updateFriendship(user_id: string, body: IPutFriendshipBody) {
    return await this._clinet.put(Paths.user.friend.friendship(user_id), body);
  }
}

export type ReportType = 'reporter' | 'reporting';
export interface IGetReportParams {
  type: ReportType;
  user_id: string;
}

class UserReport implements IRestEndPoint {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }

  public async get(params: IGetReportParams) {
    return;
  }

  public async update() {
    return;
  }

  public async delete() {
    return;
  }
}

class UserGroup implements IRestEndPoint {
  private _clinet: ApiClient;
  constructor(client: ApiClient) {
    this._clinet = client;
  }

  public async get() {
    return;
  }

  public async updateMembership() {
    return;
  }
}
