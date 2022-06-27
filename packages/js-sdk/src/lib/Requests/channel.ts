import { IAttachment, IUser } from '../Models';

export interface ISendMessage {
  text: string;
  attachments: IAttachment[];
  user: IUser;
  mentioned_users: IUser[];
  skip_push: boolean;
}
