import React from 'react';
import './App.css';
import Home from './pages/Home';
import APIProvider from './context/APIProvider';

function App() {
  return (
    <div>
      <span>Hello, App!!</span>
      <APIProvider><Home /></APIProvider>
    </div>
  );
}

export default App;
