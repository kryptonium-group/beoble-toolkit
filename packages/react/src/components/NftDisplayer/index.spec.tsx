import { render } from '@testing-library/react';

import NftDisplayer from './index';

describe('NftDisplayer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftDisplayer />);
    expect(baseElement).toBeTruthy();
  });
});
