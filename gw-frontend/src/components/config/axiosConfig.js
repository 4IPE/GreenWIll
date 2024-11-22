import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // URL вашего бэкенда
    withCredentials: true, // Для работы с куки
});

export default apiClient;
