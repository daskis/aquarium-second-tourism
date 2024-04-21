import { render } from '@testing-library/react';

import ChatMessagesList from './chat-messages-list';

describe('ChatMessagesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatMessagesList />);
    expect(baseElement).toBeTruthy();
  });
});
