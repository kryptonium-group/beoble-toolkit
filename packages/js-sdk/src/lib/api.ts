import axios from 'axios';
import { Paths } from '../constants';
import BeobleException from './Exceptions/BeobleException';

export default class ApiClient {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: Paths.dev,
      timeout: 1000,
    });

    this.client.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
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

  public async get(path?: string, params?: any): Promise<any> {
    return this.tryRestApi(
      async () =>
        await this.client.get(path || '', {
          params,
        })
    );
  }

  public async post(path: string, data?: any, params?: any): Promise<any> {
    return this.tryRestApi(
      async () =>
        await this.client.post(path, data, {
          params,
        })
    );
  }

  public async delete(path: string): Promise<any> {
    return this.tryRestApi(async () => await this.client.delete(path));
  }

  public async put(path: string, data?: any): Promise<any> {
    return this.tryRestApi(async () => await this.client.put(path, data));
  }
}