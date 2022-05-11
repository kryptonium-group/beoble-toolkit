import React, { useContext } from 'react';
import { BeobleContext, IBeobleContext } from '../../contexts';

export const useBeoble = () => {
  const beobleContext = useContext(BeobleContext);

  if (!BeobleContext) {
    throw new Error();
  }

  return beobleContext as IBeobleContext;
};

export default useBeoble;
