import { render } from '@testing-library/react';

import MessageForm from './index';

describe('MessageForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageForm />);
    expect(baseElement).toBeTruthy();
  });
});
