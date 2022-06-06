import { render } from '@testing-library/react';

import OnlineStatus from './index';

describe('OnlineStatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnlineStatus />);
    expect(baseElement).toBeTruthy();
  });
});
