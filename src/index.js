import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GameProvider } from './context';

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById('root')
);
