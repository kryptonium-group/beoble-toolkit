import { Paths } from '../constants';
import {
  IChatRoomsResponse,
  IGetUserParams,
  IPostUserBody,
  IPutUserBody,
  IPutUserChatRoomMembershipBody,
  IUser,
  IUsersResponse,
  IUserResponse,
} from '../lib';
import ApiClient from '../lib/api';
import { IUserIdParam } from '../lib/Models/request';
import { IAPIClass, IRestEndPoint } from './types';

export class User extends IAPIClass implements IRestEndPoint {
  public chatroom: UserChatRoom;
  public follow: UserFollow;
  public friend: UserFriend;
  public report: UserReport;
  public group: UserGroup;

  constructor(client: ApiClient) {
    super(client);
    this.chatroom = new UserChatRoom(this._client);
    this.follow = new UserFollow(this._client);
    this.friend = new UserFriend(this._client);
    this.report = new UserReport(this._client);
    this.group = new UserGroup(this._client);
  }

  public async get(params: IGetUserParams): Promise<IUsersResponse> {
    return await this._client.get(Paths.user.base, params);
  }

  public async update(
    user_id: string,
    body: IPutUserBody
  ): Promise<IUserResponse> {
    return await this._client.put(`${Paths.user.base}/${user_id}`, body);
  }

  public async add(body: IPostUserBody): Promise<IUser> {
    return await this._client.post(Paths.user.base, body);
  }
}

export type SortngOrder = 'ASC' | 'DESC';
export interface IGetUserChatRoomParams extends IUserIdParam {
  sort_key?: string;
  sort_oder?: SortngOrder;
}

class UserChatRoom extends IAPIClass {
  public async get(
    params: IGetUserChatRoomParams
  ): Promise<IChatRoomsResponse> {
    return await this._client.get(Paths.user.chatroom.base, params);
  }

  public async updateMembership(
    user_id: string,
    body: IPutUserChatRoomMembershipBody
  ) {
    return await this._client.put(
      Paths.user.chatroom.membership(user_id),
      body
    );
  }
}

export type FollowType = 'follower' | 'following';
export interface IGetFollowParams extends IUserIdParam {
  type: FollowType;
}

export interface IFollowBody {
  target_user_id: string;
}

class UserFollow extends IAPIClass implements IRestEndPoint {
  public async get(params: IGetFollowParams): Promise<IUsersResponse> {
    const { type, user_id } = params;
    const Path =
      type === 'follower'
        ? Paths.user.follow.follower
        : Paths.user.follow.following;
    return await this._client.get(Path, {
      user_id,
    });
  }

  public async follow(user_id: string, body: IFollowBody) {
    return await this._client.put(Paths.user.follow.base(user_id), body);
  }

  public async unfollow(user_id: string, body: IFollowBody) {
    return await this._client.delete(Paths.user.follow.base(user_id), body);
  }
}
export interface IPutFriendshipBody {
  target_user_id: string;
  friendship_action_type: FriendshipActionType;
}

export type FriendshipActionType = 'REQUEST' | 'ACCEPT' | 'UNFRIEND' | 'REJECT';

class UserFriend extends IAPIClass implements IRestEndPoint {
  public async get(params: IUserIdParam): Promise<IUsersResponse> {
    return await this._client.get(Paths.user.friend.base, params);
  }

  public async getRequest(params: IUserIdParam): Promise<IUsersResponse> {
    return await this._client.get(Paths.user.friend.request, params);
  }

  public async updateFriendship(user_id: string, body: IPutFriendshipBody) {
    return await this._client.put(Paths.user.friend.friendship(user_id), body);
  }
}

export type ReportType = 'reporter' | 'reporting';
export interface IGetReportParams {
  type: ReportType;
  user_id: string;
}

class UserReport extends IAPIClass implements IRestEndPoint {
  public async get(params: IGetReportParams) {
    return;
  }

  public async report() {
    return;
  }

  public async cancel() {
    return;
  }
}

class UserGroup extends IAPIClass implements IRestEndPoint {
  public async get() {
    return;
  }

  public async updateMembership() {
    return;
  }
}
