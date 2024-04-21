import { render } from '@testing-library/react';

import MessagesListPage from './messages-list-page';

describe('MessagesListPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessagesListPage />);
    expect(baseElement).toBeTruthy();
  });
});
