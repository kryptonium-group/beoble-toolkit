import Exception from './Exception';

export default class NotInitializedException extends Exception {
  constructor() {
    super('Core should be initialized when created');
  }
}
