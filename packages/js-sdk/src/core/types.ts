import ApiClient from '../lib/api';

export type Rest = 'POST' | 'PUT' | 'GET' | 'DELETE';

export interface IRestEndPoint {
  get?: (params?: any) => Promise<any>;
  post?: (params?: any, body?: any) => Promise<any>;
  put?: (params?: any, body?: any) => Promise<any>;
  delete?: (params?: any) => Promise<any>;
}

export class IAPIClass {
  protected _client: ApiClient;
  constructor(client: ApiClient) {
    this._client = client;
  }
}
