import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useENS from './useENS';

describe('useENS', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useENS());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
