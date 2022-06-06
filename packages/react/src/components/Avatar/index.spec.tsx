import { render } from '@testing-library/react';

import Avatar from './index';

describe('Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Avatar />);
    expect(baseElement).toBeTruthy();
  });
});
