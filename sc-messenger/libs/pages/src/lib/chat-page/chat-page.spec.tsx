import { render } from '@testing-library/react';

import ChatPage from './chat-page';

describe('ChatPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatPage />);
    expect(baseElement).toBeTruthy();
  });
});
