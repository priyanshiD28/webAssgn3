import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const apiCallURL = 'http://18.225.92.135/api/';
const apiCallURL = 'http://localhost:4000/api/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default apiCallURL;