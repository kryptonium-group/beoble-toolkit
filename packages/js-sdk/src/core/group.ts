import ApiClient from '../lib/api';
import { IAPIClass, IRestEndPoint } from './types';

export class Group extends IAPIClass implements Omit<IRestEndPoint, 'post'> {
  public member: Member;
  public post: Post;

  constructor(client: ApiClient) {
    super(client);
    this.member = new Member(this._client);
    this.post = new Post(this._client);
  }

  public async get() {
    return;
  }

  public async create() {
    return;
  }

  public async update() {
    return;
  }
}

class Member extends IAPIClass implements IRestEndPoint {
  public async get() {
    return;
  }

  public async upadate() {
    return;
  }
}

class Post extends IAPIClass {
  public async getRecent() {
    return;
  }
}
