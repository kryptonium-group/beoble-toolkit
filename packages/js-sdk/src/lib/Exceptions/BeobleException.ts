import Exception from './Exception';

export default class BeobleException extends Exception {
  constructor(status: number, msg = '') {
    super(`Beoble Exception: ${status}${msg && ` ${msg}`}`);
  }
}
