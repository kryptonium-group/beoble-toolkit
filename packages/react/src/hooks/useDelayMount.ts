import React, { useState } from 'react';
import useTimeout from './useTimeout';

export const useDelay = (stateValue: any, timeout: number) => {
  const [state, setState] = useState<typeof stateValue>();

  const setDelayedState = <T>(stateValue: T) => {
    setTimeout(() => {
      setState(stateValue);
    }, timeout);
  };

  return [[state, setState], setDelayedState];
};
