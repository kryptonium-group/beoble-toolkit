import { render } from '@testing-library/react';

import ConversationPopUp from './index';

describe('ConversationPopUp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConversationPopUp />);
    expect(baseElement).toBeTruthy();
  });
});
