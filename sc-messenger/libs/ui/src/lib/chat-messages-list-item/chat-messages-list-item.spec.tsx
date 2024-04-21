import { render } from '@testing-library/react';

import ChatMessagesListItem from './chat-messages-list-item';

describe('ChatMessagesListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatMessagesListItem />);
    expect(baseElement).toBeTruthy();
  });
});
