import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { EventEmitterProvider } from '@messenger/provider';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <EventEmitterProvider>
      <App />
    </EventEmitterProvider>
  </StrictMode>
);
