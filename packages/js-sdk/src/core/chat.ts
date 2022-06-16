import { Paths } from '../constants';
import {
  IChatResponse,
  IGetChatParams,
  IPostChatBody,
  IPutChatBody,
  IPutChatReactionBody,
  IPutChatReportBody,
} from '../lib';
import { IChannelConfig } from '../lib/Models/channel';
import { Channel } from './channel';
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
      ...config,
      authToken: this._client.getAuthToken(),
    });
  }

  public open(channel_id: string) {
    const socket = new WebSocket(Paths.wss.chat(channel_id));
    return socket;
  }
}
