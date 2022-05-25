import { render } from '@testing-library/react';

import NftPicker from './index';

describe('NftPicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftPicker />);
    expect(baseElement).toBeTruthy();
  });
});
