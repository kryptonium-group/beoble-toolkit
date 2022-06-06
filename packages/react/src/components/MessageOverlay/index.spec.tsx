import { render } from '@testing-library/react';

import MessageOverlay from './index';

describe('MessageOverlay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageOverlay />);
    expect(baseElement).toBeTruthy();
  });
});
