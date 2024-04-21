import { render } from '@testing-library/react';

import ToastNotification from './toast-notification';

describe('ToastNotification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToastNotification />);
    expect(baseElement).toBeTruthy();
  });
});
