import { render } from '@testing-library/react';

import ChatListItem from './chat-list-item';

describe('ChatListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatListItem />);
    expect(baseElement).toBeTruthy();
  });
});
