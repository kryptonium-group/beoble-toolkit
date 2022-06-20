import { render } from '@testing-library/react';

import ChatRoomModal from './index';

describe('ChatRoomModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatRoomModal />);
    expect(baseElement).toBeTruthy();
  });
});
