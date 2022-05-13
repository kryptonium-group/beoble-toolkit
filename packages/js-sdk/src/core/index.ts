import { Axios } from 'axios';
import ApiClient from '../lib/api';

export default class Core {
  private userId?: string;
  private client?: ApiClient;

  public init(userId: string) {
    this.userId = userId;
    this.client = new ApiClient();
  }
}
