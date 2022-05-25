import { render } from '@testing-library/react';

import NftModal from './index';

describe('NftModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftModal />);
    expect(baseElement).toBeTruthy();
  });
});
