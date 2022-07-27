import { UpdateType } from '../types/core';

export interface CoreOptions {
  authToken?: string;
  appId: string;
}

export interface ArrayUpdate<T> {
  update_type: UpdateType;
  elements: T[];
}
