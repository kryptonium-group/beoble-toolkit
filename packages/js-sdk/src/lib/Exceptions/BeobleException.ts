import { Exception } from './Exception';

export class BeobleException extends Exception {
  constructor(status: number, msg = '') {
    super(`Beoble Exception: ${status}${msg && ` ${msg}`}`);
  }
}
