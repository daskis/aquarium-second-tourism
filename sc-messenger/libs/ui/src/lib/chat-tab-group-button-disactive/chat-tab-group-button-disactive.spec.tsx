import { render } from '@testing-library/react';

import ChatTabGroupButtonDisactive from './chat-tab-group-button-disactive';

describe('ChatTabGroupButtonDisactive', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatTabGroupButtonDisactive />);
    expect(baseElement).toBeTruthy();
  });
});
