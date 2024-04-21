import { render } from '@testing-library/react';

import CreateChatForm from './create-chat-form';

describe('CreateChatForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateChatForm />);
    expect(baseElement).toBeTruthy();
  });
});
