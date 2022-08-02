import { Paths } from '../constants';
import {
  IChatRoomKey,
  IChatRoomMembershipResponse,
  IChatRoomResponse,
  IChatRoomsResponse,
  IRecentChatResponse,
  IUser,
} from '../lib';
import ApiClient from '../lib/api';
import {
  IAddChatRoomBody,
  IGetChatRoomParams,
  IPostChatRoomBody,
  IPostMarkAsReadParam,
  IPutChatRoomBody,
  IPutChatRoomMembershipBody,
} from '../lib/Requests/chatroom';
import { Encrypter, Encryption } from './encryption';
import { IAPIClass, IRestEndPoint } from './types';

export class ChatRoom extends IAPIClass implements IRestEndPoint {
  public member: Member;
  public chat: Chat;
  private encryption: Encryption;
  private encrypter: Encrypter;

  constructor(client: ApiClient, encryption: Encryption) {
    super(client);
    this.member = new Member(this._client);
    this.chat = new Chat(this._client);
    this.encryption = encryption;
    this.encrypter = new Encrypter();
  }

  public async get(params: IGetChatRoomParams): Promise<IChatRoomsResponse> {
    // this is for before changing show_keys field  to none optional
    const tempParam = {
      ...params,
      show_keys: true,
    };
    return await this._client.get(Paths.chatroom.base, tempParam);
  }

  public async add(body: IAddChatRoomBody): Promise<IChatRoomResponse> {
    const { creator, members, ...others } = body;
    if (!creator.public_key)
      throw new Error('User should register before try to create chatroom');

    const timestamp = new Date().toISOString();
    const chatroomKey = this.encrypter.generateKey();

    const pubkey = members.some((member) => member.public_key === null)
      ? async () => await this.encryption.getBeobleKey()
      : (member: IUser) => member.public_key;
    let user_id_to_key_map = {};

    for (const member of members) {
      user_id_to_key_map = {
        ...user_id_to_key_map,
        [member.id]: await this.encrypter.ethEncrypt(
          chatroomKey,
          await pubkey(member)
        ),
      };
    }

    user_id_to_key_map = {
      ...user_id_to_key_map,
      [creator.id]: await this.encrypter.ethEncrypt(
        chatroomKey,
        creator.public_key
      ),
    };

    const keys = [
      {
        timestamp,
        user_id_to_key_map,
      },
    ];

    const postBody: IPostChatRoomBody = {
      ...others,
      creator_id: creator.id,
      members: members.map((member) => member.id),
      keys,
    };

    return await this._client.post<IPostChatRoomBody>(
      Paths.chatroom.base,
      postBody
    );
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

class Member extends IAPIClass implements IRestEndPoint {
  public async get(chatroom_id: string): Promise<IChatRoomMembershipResponse> {
    return await this._client.get(Paths.chatroom.member.base, {
      chatroom_id,
    });
  }

  public async update(
    chatroom_id: string,
    body: IPutChatRoomMembershipBody
  ): Promise<IChatRoomMembershipResponse> {
    return await this._client.put(
      Paths.chatroom.member.withId(chatroom_id),
      body
    );
  }
}

class Chat extends IAPIClass {
  public async getRecent(
    chatroom_id: string,
    limit: number
  ): Promise<IRecentChatResponse> {
    return await this._client.get(Paths.chatroom.recent, {
      chatroom_id,
      limit,
    });
  }

  public async markAsRead(
    params: IPostMarkAsReadParam
  ): Promise<IChatRoomResponse> {
    return await this._client.post(Paths.chatroom.markAsRead, params);
  }
}
