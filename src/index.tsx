import React from 'react';
import { createRoot } from 'react-dom/client';

import { ApiClientProvider } from '@features/api';
import { StoreProvider } from '@utils/contextes';

import App from './App';

import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ApiClientProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApiClientProvider>
);
