import { Exception } from './Exception';

export class NotInitializedException extends Exception {
  constructor() {
    super('Core should be initialized when created');
  }
}
