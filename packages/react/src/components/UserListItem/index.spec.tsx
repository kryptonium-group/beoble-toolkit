import { render } from '@testing-library/react';

import UserListItem from './index';

describe('UserListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserListItem />);
    expect(baseElement).toBeTruthy();
  });
});
