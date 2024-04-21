import { render } from '@testing-library/react';

import CreateChatModal from './create-chat-modal';

describe('CreateChatModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateChatModal />);
    expect(baseElement).toBeTruthy();
  });
});
