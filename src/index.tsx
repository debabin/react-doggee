import React from 'react';
import { createRoot } from 'react-dom/client';

import './static/css/fonts.css';
import './index.css';

import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
