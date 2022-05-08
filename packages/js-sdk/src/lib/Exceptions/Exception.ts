export default abstract class Exception extends Error {
  constructor(msg: string) {
    super(`${msg}`);
  }
}
