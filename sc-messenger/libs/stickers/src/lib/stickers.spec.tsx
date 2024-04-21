import { render } from '@testing-library/react';

import Stickers from './stickers';

describe('Stickers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Stickers />);
    expect(baseElement).toBeTruthy();
  });
});
