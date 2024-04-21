import { render } from '@testing-library/react';

import ChatEmpty from './chat-empty';

describe('ChatEmpty', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatEmpty />);
    expect(baseElement).toBeTruthy();
  });
});
