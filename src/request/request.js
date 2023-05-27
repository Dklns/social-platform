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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success");
        });
    });
}

export function upload(formData) {
    return instance.post('/api/applet/upload', formData);
}

export function getRecommendUsers() {
    return instance.get("/api/home/user");
}

export function getLatest() {
    return instance.get("/api/home/post")
}

export function getOnline() {
    return instance.get("/api/home/online");
}