import { render } from '@testing-library/react';

import ChatTabGroupButtonActive from './chat-tab-group-button-active';

describe('ChatTabGroupButtonActive', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatTabGroupButtonActive />);
    expect(baseElement).toBeTruthy();
  });
});
