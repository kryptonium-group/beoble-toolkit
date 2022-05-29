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
}
