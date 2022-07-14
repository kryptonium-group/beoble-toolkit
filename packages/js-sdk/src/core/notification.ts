import { Paths } from '../constants';
import { INotificationConfig } from '../lib/Models/notification';
import { IMessage } from '../lib/Responses/channel';
import { MessageType, WebScocketEvents } from '../lib/types/channel';
import { until } from '../util';

export class Notification {
  private _socket: WebSocket;
  private _isOpen = false;

  constructor(config: INotificationConfig) {
    const notiUrl =
      `${Paths.wss.notification(config.app_id, config.user_id)}` +
      (config.authToken ? `?auth_token=${config.authToken}` : '');
    this._socket = new WebSocket(notiUrl);

    this._socket.onopen = () => {
      this._isOpen = true;
    };

    this._socket.onmessage = (ev: MessageEvent<any>) => {
      console.log(ev.data);
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

  public async close() {
    this._socket.close();
  }

  public on(
    event: WebScocketEvents,
    callback: (ev: MessageEvent<any> | Event | CloseEvent) => void
  ) {
    this._socket.addEventListener(event, callback);
  }

  public onMessage(event: MessageType, callback: (data: any) => void) {
    this._socket.addEventListener('message', (e: MessageEvent) => {
      const data: IMessage<any> = JSON.parse(e.data);
      if (data.message_type === event) callback(data.data);
    });
  }
}
