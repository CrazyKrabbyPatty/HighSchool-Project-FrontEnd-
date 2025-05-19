import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            // Ваш код для обработки 401
            // Например:
            // await refreshToken();
            // или
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
