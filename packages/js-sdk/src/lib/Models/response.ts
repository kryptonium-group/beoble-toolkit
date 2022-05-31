export interface IResponse<T> {
  data: T;
  meta: {
    count: number;
  };
}
