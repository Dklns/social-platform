import axios from 'axios';
import instance from './index';

export function register(inputs) {
    return axios.post('http://localhost:8080/smp/api/auth/register', { ...inputs });
}

export function login(inputs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(axios.post('http://localhost:8080/smp/api/auth/login', { ...inputs }, {
                withCredentials: true
            }))
        }, 1000);
    })
}

export function logout() {
    return instance.post("/api/auth/logout");
}

export function online() {
    return instance.post('/api/user/markline');
}

export function offline() {
    return instance.delete('/api/user/markline');
}

export function upload(formData) {
    return instance.post('/api/applet/upload', formData);
}

export function search(query) {
    return instance.get('/api/search', {
        params: {
            query
        }
    })
}

export function getRecommendUsers() {
    return instance.get("/api/home/user", {
        params: {
            count: 3
        }
    });
}

export function getLatest() {
    return instance.get("/api/home/post")
}

export function getOnline() {
    return instance.get("/api/home/online");
}

export function getNotifications() {
    return instance.get("/api/chat/getlist");
}

export function getAllCount() {
    return instance.get('/api/chat/count');
}