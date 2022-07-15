import { Paths } from '../constants';
import { IPostUploadBody } from '../lib/Requests/attachment';
import { IAPIClass } from './types';

export class Attachment extends IAPIClass {
  public async upload(body: IPostUploadBody) {
    const formData = new FormData();
    formData.append('upload_file', body.upload_file, body.upload_file.name);
    formData.append('upload_type', body.upload_type);
    body?.chat_id && formData.append('chat_id', body.chat_id);
    body?.chatroom_id && formData.append('chatroom_id', body.chatroom_id);

    return await this._client.post(Paths.file.upload, formData);
  }
}
