export default class Core {
  private userId?: string;

  public init(userId: string) {
    this.userId = userId;
  }
}
