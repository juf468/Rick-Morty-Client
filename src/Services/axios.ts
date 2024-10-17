import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Asegúrate de que este sea el puerto correcto
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;