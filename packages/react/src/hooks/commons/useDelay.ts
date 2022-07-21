import React, { useState } from 'react';

export const useDelay = (stateValue: any, timeout: number) => {
  const [state, setState] = useState<typeof stateValue>();

  const setDelayedState = <T>(stateValue: T) => {
    setTimeout(() => {
      setState(stateValue);
    }, timeout);
  };

  return [[state, setState], setDelayedState];
};
