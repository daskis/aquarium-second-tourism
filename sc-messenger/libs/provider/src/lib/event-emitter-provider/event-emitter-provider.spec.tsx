import { render } from '@testing-library/react';

import EventEmitterProvider from './event-emitter-provider';

describe('EventEmitterProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventEmitterProvider />);
    expect(baseElement).toBeTruthy();
  });
});
