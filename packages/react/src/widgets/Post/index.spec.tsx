import { render } from '@testing-library/react';

import Post from './index';

describe('Post', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Post />);
    expect(baseElement).toBeTruthy();
  });
});
