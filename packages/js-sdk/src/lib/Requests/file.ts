import { UploadType } from '../types/file';

export interface IPostUploadFileBody {
  upload_file: File;
  upload_type: UploadType;
  chatroom_id?: string;
  chat_id?: string;
}
