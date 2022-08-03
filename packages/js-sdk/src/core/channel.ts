import { Paths } from '../constants';
import { IAction, ISendMessage, IChat } from '../lib';
import { IChannelConfig } from '../lib/Models/channel';
import { IMessage } from '../lib/Responses/channel';
import { MessageType, WebScocketEvents } from '../lib/types/channel';
import { until } from '../util';
import { Encrypter } from './encryption';

export class Channel {
  private socket: WebSocket;
  private isOpen = false;
  private encryption: Encrypter;
  public isAuthorized = false;

  constructor(config: IChannelConfig) {
    const chatUrl =
      `${Paths.wss.chat(config.chatroom_id)}` +
      (config.authToken ? `?auth_token=${config.authToken}` : '');
    this.socket = new WebSocket(chatUrl);
    this.encryption = new Encrypter();

    this.socket.onopen = () => {
      this.isOpen = true;
    };

    this.socket.onmessage = (ev: MessageEvent<any>) => {
      //console.log(ev.data);
    };

    this.socket.onclose = () => {
      this.isOpen = false;
    };
  }

  public watch() {
    return this.socket.readyState;
  }

  public async open() {
    await until(() => this.isOpen == true);
    return this.isOpen;
  }

  public setSecretKey(secretKey: string) {
    this.encryption.setSecretKey(secretKey);
    this.isAuthorized = true;
  }

  public async sendMessage(message: ISendMessage) {
    const { text, attachments } = message;
    if (text) message.text = this.encryption.encrypt(text);
    if (attachments)
      message.attachments?.map((attachment) =>
        this.encryption.encrypt(attachment)
      );
    const data: IAction = {
      action_type: 'SEND_MESSAGE',
      data: message,
    };
    this.socket.send(JSON.stringify(data));
  }

  public retrieveMessage(last_message_created_at: string) {
    const data: IAction = {
      action_type: 'RETRIEVE_MESSAGE',
      data: {
        created_at: {
          $lt: last_message_created_at,
        },
      },
    };
    this.socket.send(JSON.stringify(data));
  }

  //TODO
  public async sendReaction() {
    return;
  }

  public async close() {
    this.socket.close();
  }

  public on(
    event: WebScocketEvents,
    callback: (ev: MessageEvent<any> | Event | CloseEvent) => void
  ) {
    this.socket.addEventListener(event, callback);
  }

  public onMessage(event: MessageType, callback: (data: any) => void) {
    this.socket.addEventListener('message', (e: MessageEvent) => {
      try {
        const data: IMessage<any> = JSON.parse(e.data);
        if (Array.isArray(data.data) && data.data.length > 0) {
          console.log(data.data);
        }
        if ('text' in data.data || 'attachments' in data.data) {
          console.log(data.data);
        }

        if (data.message_type === event) callback(data.data);
      } catch (error) {
        console.log('error occured:', error);
        console.log('given data was: ', e.data);
      }
    });
  }
}
