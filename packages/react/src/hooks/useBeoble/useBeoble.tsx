import React, { useContext } from 'react';
import { BeobleContext } from '../../contexts';

export const useBeoble = () => {
  const beobleContext = useContext(BeobleContext);
  if (!BeobleContext) {
    throw new Error();
  }
  return beobleContext;
};

export default useBeoble;
