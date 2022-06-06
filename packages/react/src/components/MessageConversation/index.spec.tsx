import { render } from '@testing-library/react';

import MessageConversation from './index';

describe('MessageConversation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageConversation />);
    expect(baseElement).toBeTruthy();
  });
});
