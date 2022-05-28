import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
