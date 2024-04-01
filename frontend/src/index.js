import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const apiCallURL = 'http://localhost:4000/api/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default apiCallURL;