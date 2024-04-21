import { render } from '@testing-library/react';

import ChatTabGroups from './chat-tab-groups';

describe('ChatTabGroups', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatTabGroups />);
    expect(baseElement).toBeTruthy();
  });
});
