/* eslint-disable @typescript-eslint/no-empty-interface */
import { IUser, UserCounts } from '../Models';
import { IResponse } from '../Responses/response';

export interface IUsersResponse extends IResponse<IUser[]> {}

export interface IUserResponse extends IResponse<IUser> {}

export interface IUserWithCountResponse extends IResponse<IUserWithCount> {}

export interface IUserWithCount extends IUser, Partial<UserCounts> {}
