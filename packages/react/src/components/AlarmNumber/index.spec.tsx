import { render } from '@testing-library/react';

import AlarmNumber from './index';

describe('AlarmNumber', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AlarmNumber />);
    expect(baseElement).toBeTruthy();
  });
});
