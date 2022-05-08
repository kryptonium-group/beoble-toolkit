import axios from 'axios';
import { Paths } from '../constants';
import BeobleException from './Exceptions/BeobleException';

export default class ApiClient {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: Paths.base,
    });
  }

  private async tryRestApi(apiCallFunc: () => Promise<any>) {
    try {
      const res = await apiCallFunc();
      if (res?.status !== 200) throw new BeobleException(res?.status);
      return res.data;
    } catch (err) {
      if (err instanceof BeobleException) {
        console.log(`Error with server occured. ${err}`);
      } else {
        console.log(`Unexpected Error occured while fetching... ${err}`);
      }
      return err;
    }
  }

  private async getRestApiData(path?: string): Promise<any> {
    return this.tryRestApi(async () => {
      await this.client.get(path || '');
    });
  }

  private async postRestApiData(path?: string): Promise<any> {
    return this.tryRestApi(async () => {
      await this.client.post(path || '');
    });
  }

  private async deleteRestApiData(path?: string): Promise<any> {
    return this.tryRestApi(async () => {
      await this.client.delete(path || '');
    });
  }

  private async putRestApiData(path?: string): Promise<any> {
    return this.tryRestApi(async () => {
      await this.client.put(path || '');
    });
  }
}
