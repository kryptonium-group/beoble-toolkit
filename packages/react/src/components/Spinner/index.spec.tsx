import { render } from '@testing-library/react';

import Spinner from './index';

describe('Spinner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Spinner />);
    expect(baseElement).toBeTruthy();
  });
});
