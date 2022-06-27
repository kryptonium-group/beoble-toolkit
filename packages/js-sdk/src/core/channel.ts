import { Paths } from '../constants';
import { IPostChatBody, ISendMessage } from '../lib';
import {
  ActionType,
  IAction,
  IChannelConfig,
  IMessage,
  MessageType,
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
      //console.log(ev.data);
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

  public async sendMessage(message: ISendMessage) {
    const data: IAction = {
      action_type: 'SEND_MESSAGE',
      data: message,
    };
    this._socket.send(JSON.stringify(data));
  }

  public retrieveMessage(config: any) {
    const data: IAction = {
      action_type: 'RETREIVE_MESSAGE',
      data: config,
    };
    this._socket.send(JSON.stringify(data));
  }

  public async sendReaction() {
    return;
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

  public onMessage(
    event: MessageType,
    callback: (data: IMessage<any>) => void
  ) {
    this._socket.addEventListener('message', (e: MessageEvent) => {
      console.log(e);
      const data: IMessage<any> = JSON.parse(e.data);
      if (data.message_type === event) callback(data.data);
    });
  }
}
