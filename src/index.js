import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Weather from './service/weather.js';

const weather = new Weather();

ReactDOM.render(
  <React.StrictMode>
    <App weather={weather} />
  </React.StrictMode>,
  document.getElementById('root')
);
