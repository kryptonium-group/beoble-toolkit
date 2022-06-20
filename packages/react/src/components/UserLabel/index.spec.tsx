import { render } from '@testing-library/react';

import UserLabel from './index';

describe('UserLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserLabel />);
    expect(baseElement).toBeTruthy();
  });
});
