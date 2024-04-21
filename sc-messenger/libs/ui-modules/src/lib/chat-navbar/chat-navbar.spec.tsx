import { render } from '@testing-library/react';

import ChatNavbar from './chat-navbar';

describe('ChatNavbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatNavbar />);
    expect(baseElement).toBeTruthy();
  });
});
