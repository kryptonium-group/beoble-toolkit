import { Paths } from '../constants';
import {
  IChatResponse,
  IChatRoomResponse,
  IGetChatRoomParams,
  IGetChatRoomResponse,
  IPostChatRoomBody,
  IPutChatRoomBody,
  IPutChatRoomMembershipBody,
  IRecentChatResponse,
  IUserResponse,
} from '../lib';
import ApiClient from '../lib/api';
import { IRestEndPoint } from './types';

export class ChatRoom implements IRestEndPoint {
  private _client: ApiClient;
  public member: Member;
  public chat: Chat;
  constructor(client: ApiClient) {
    this._client = client;
    this.member = new Member(this._client);
    this.chat = new Chat(this._client);
  }

  public async get(params: IGetChatRoomParams): Promise<IGetChatRoomResponse> {
    return await this._client.get(Paths.chatroom.base, params);
  }

  public async add(body: IPostChatRoomBody): Promise<IChatRoomResponse> {
    return await this._client.post(Paths.chatroom.base, body);
  }

  public async update(
    chatroom_id: string,
    body: IPutChatRoomBody
  ): Promise<IChatRoomResponse> {
    return await this._client.put(
      `${Paths.chatroom.base}/${chatroom_id}`,
      body
    );
  }
}

class Member implements IRestEndPoint {
  private _client: ApiClient;
  constructor(client: ApiClient) {
    this._client = client;
  }

  public async get(chatroom_id: string): Promise<IUserResponse> {
    return await this._client.get(Paths.chatroom.member.get, {
      chatroom_id,
    });
  }

  public async update(
    chatroom_id: string,
    body: IPutChatRoomMembershipBody
  ): Promise<IChatRoomResponse> {
    return await this._client.put(Paths.chatroom.member.put(chatroom_id), body);
  }
}

class Chat {
  private _client: ApiClient;
  constructor(client: ApiClient) {
    this._client = client;
  }

  public async getRecent(
    chatroom_id: string,
    limit: number
  ): Promise<IRecentChatResponse> {
    return await this._client.get(Paths.chatroom.recent, {
      chatroom_id,
      limit,
    });
  }
}
