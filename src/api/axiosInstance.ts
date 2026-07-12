import axios from 'axios';
import i18n from '../i18n'; // Πρόσθεσε αυτό το import

export const api = axios.create({
    baseURL: 'http://localhost:5188/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = i18n.language;
    return config;
});