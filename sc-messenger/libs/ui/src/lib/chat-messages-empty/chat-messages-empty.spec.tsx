import { render } from '@testing-library/react';

import ChatMessagesEmpty from './chat-messages-empty';

describe('ChatMessagesEmpty', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatMessagesEmpty />);
    expect(baseElement).toBeTruthy();
  });
});
