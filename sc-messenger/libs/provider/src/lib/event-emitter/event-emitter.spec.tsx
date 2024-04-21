import { render } from '@testing-library/react';

import EventEmitter from './event-emitter';

describe('EventEmitter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventEmitter />);
    expect(baseElement).toBeTruthy();
  });
});
