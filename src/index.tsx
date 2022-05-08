
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
require('./assets/css/base.css');

const root = createRoot(document.getElementById('root'));
root.render(<App />);
