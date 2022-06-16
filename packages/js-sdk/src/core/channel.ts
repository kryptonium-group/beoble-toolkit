import { Paths } from '../constants';
import { IPostChatBody } from '../lib';
import {
  ActionType,
  IChannelConfig,
  IMessage,
  WebScocketEvents,
} from '../lib/Models/channel';
import { until } from '../util';

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

    this._socket.onmessage = (ev: MessageEvent<any>) => {
      return;
    };

    this._socket.onclose = () => {
      this._isOpen = false;
    };
  }

  public watch() {
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

  public on(
    event: WebScocketEvents,
    callback: (ev: MessageEvent<any> | Event | CloseEvent) => void
  ) {
    this._socket.addEventListener(event, callback);
  }

  public onMessage(event: ActionType, callback: (data: any) => void) {
    this._socket.addEventListener('message', (e: MessageEvent) => {
      const data: IMessage = JSON.parse(e.data);
      if (data.action_type === event) callback(data.data);
    });
  }
}
