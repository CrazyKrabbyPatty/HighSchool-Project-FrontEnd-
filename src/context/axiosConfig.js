import axios from 'axios';

// Устанавливаем базовый URL
axios.defaults.baseURL = 'http://localhost:8080';

// Добавляем интерцептор для вставки токена
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});