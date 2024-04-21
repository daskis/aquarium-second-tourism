import { render } from '@testing-library/react';

import ChatMessages from './chat-messages';

describe('ChatMessages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatMessages />);
    expect(baseElement).toBeTruthy();
  });
});
