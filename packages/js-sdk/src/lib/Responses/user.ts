/* eslint-disable @typescript-eslint/no-empty-interface */
import { INFT, IUser, UserCounts } from '../Models';
import { IResponse } from '../Responses/response';

export interface IUsersResponse extends IResponse<IUser[]> {}

export interface IUserResponse extends IResponse<IUser> {}

export interface IUserWithCountResponse extends IResponse<IUserWithCount> {}

export interface IUserWithCount extends IUser, Partial<UserCounts> {}

export interface IUserNFTResponse extends IResponse<INFT[]> {}
