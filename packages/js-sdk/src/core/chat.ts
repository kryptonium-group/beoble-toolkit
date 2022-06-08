import { Paths } from '../constants';
import {
  IChatResponse,
  IGetChatParams,
  IPostChatBody,
  IPutChatBody,
  IPutChatReactionBody,
  IPutChatReportBody,
} from '../lib';
import ApiClient from '../lib/api';
import { until } from '../util';
import { IAPIClass, IRestEndPoint } from './types';

export class Chat extends IAPIClass implements IRestEndPoint {
  public async get(params: IGetChatParams) {
    return this._client.get(Paths.chat.base, params);
  }

  public async update(chat_id: string, body: IPutChatBody) {
    return;
  }

  public async create(body: IPostChatBody): Promise<IChatResponse> {
    return this._client.post(Paths.chat.base, body);
  }

  public async report(chat_id: string, body: IPutChatReportBody) {
    return;
  }

  public async react(chat_id: string, body: IPutChatReactionBody) {
    return;
  }

  public channel(config: IChannelConfig) {
    return new Channel({
      authToken: this._client.getAuthToken(),
      ...config,
    });
  }

  public open(channel_id: string) {
    const socket = new WebSocket(Paths.wss.chat(channel_id));
    return socket;
  }
}

export class Channel {
  private _socket: WebSocket;
  private _isOpen = false;

  constructor(config: IChannelConfig) {
    const chatUrl =
      `${Paths.wss.chat(config.chatroom_id)}` +
      (config.authToken ? `?auth_token=${config.authToken}` : '');
    this._socket = new WebSocket(chatUrl);

    this._socket.onopen = () => {
      this._isOpen = true;
    };

    this._socket.onmessage = (ev) => {
      return;
    };

    this._socket.onclose = () => {
      return;
    };
  }

  public async watch() {
    return this._socket.readyState;
  }

  public async open() {
    await until(() => this._isOpen == true);
  }

  public async sendMessage(chat: IPostChatBody) {
    this._socket.send(JSON.stringify(chat));
  }

  public async close() {
    this._socket.close();
  }

  public on(event: WebScocketEvents, callback: (event: any) => void) {
    this._socket.addEventListener(event, callback);
  }
}

export type WebScocketEvents = 'open' | 'message' | 'error' | 'close';

export interface IChannelConfig {
  chatroom_id: string;
  authToken?: string;
}
