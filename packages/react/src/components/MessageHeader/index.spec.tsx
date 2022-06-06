import { render } from '@testing-library/react';

import MessageHeader from './index';

describe('MessageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
