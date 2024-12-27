import { render } from '@testing-library/react';

import NextServices from './next-services';

describe('NextServices', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextServices />);
    expect(baseElement).toBeTruthy();
  });
});
