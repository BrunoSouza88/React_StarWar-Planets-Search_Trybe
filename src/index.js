import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import APIProvider from './context/APIProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<APIProvider><App /></APIProvider>);
