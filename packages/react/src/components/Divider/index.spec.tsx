import { render } from '@testing-library/react';

import Divider from './index';

describe('Divider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Divider />);
    expect(baseElement).toBeTruthy();
  });
});
