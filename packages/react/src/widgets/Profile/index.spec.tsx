import { render } from '@testing-library/react';

import Profile from './index';

describe('Profile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Profile />);
    expect(baseElement).toBeTruthy();
  });
});
