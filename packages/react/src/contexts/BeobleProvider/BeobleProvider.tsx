import { FC, ReactNode } from 'react';
import { BeobleContext } from '../BeobleContext';

export interface IBeobleProvider {
  children?: ReactNode;
}

export const BeobleProvider: FC<IBeobleProvider> = ({ children }) => {
  return (
    <BeobleContext.Provider value={null}>{children}</BeobleContext.Provider>
  );
};
export default BeobleProvider;
