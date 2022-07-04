import { Paths } from '../constants';
import { IPostUploadFileBody } from '../lib/Requests/file';
import { IAPIClass } from './types';

export class File extends IAPIClass {
  public async upload(body: IPostUploadFileBody) {
    return await this._client.post(Paths.file.upload, body);
  }
}
