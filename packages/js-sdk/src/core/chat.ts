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
import { IRestEndPoint } from './types';

export class Chat implements IRestEndPoint {
  private _client: ApiClient;
  constructor(client: ApiClient) {
    this._client = client;
  }

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

  public open(channel_id: string) {
    const socket = new WebSocket(Paths.wss.chat(channel_id));
    return socket;
  }
}

export class Channel {
  private _socket: WebSocket;
  public _isOpen = false;

  constructor(config: IChannelProps) {
    this._socket = new WebSocket(Paths.wss.chat(config.chatroom_id));
    console.log(this._socket.readyState);

    this._socket.onopen = () => {
      console.log('channel open');
      this._isOpen = true;
      console.log(this._isOpen);
    };

    this._socket.onclose = () => {
      console.log(this._socket.readyState, 'channel closed');
    };
  }

  public async watch() {
    const start = Date.now();
    console.log('watch start ', this._socket.readyState);
    await until(() => this._isOpen == true);
    const end = Date.now();
    console.log('watch end ', this._socket.readyState, (end - start) / 1000);
  }

  public async sendMessage(message: string) {
    this._socket.send(message);
  }

  public async close() {
    this._socket.close();
  }

  public on(event: WebScocketEvents, callback: Event) {
    return;
  }

  public onOpen() {
    return;
  }
}

export type WebScocketEvents = 'open' | 'message' | 'error' | 'close';

export interface IChannelProps {
  chatroom_id: string;
}
