import { render } from '@testing-library/react';

import Identication from './index';

describe('Identication', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Identication />);
    expect(baseElement).toBeTruthy();
  });
});
