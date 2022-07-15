import { UploadType } from '../types/attachment';

export interface IPostUploadBody {
  upload_file: File;
  upload_type: UploadType;
  chatroom_id?: string;
  chat_id?: string;
}
