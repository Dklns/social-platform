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

function logout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success");
        });
    });
}

function getComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    profilePic: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png",
                    name: 'John Doe',
                    desc: "awesome!",
                    subComments: [
                        {
                            id: 3,
                            parentCommentId: 1,
                            profilePic: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png",
                            name: 'Tom',
                            desc: "good job!",
                        }
                    ]
                },
                {
                    id: 2,
                    profilePic: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png",
                    name: 'Jack',
                    desc: "nice!",
                    subComments: []
                }
            ])
        }, 1000);
    });
}

function sendComment() {
    return new Promise((resolve, reject) => {
        resolve(ok);
    })
}

function getFollowing() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { userId: 1, name: "babel", city: "北京", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/135eddb103874249.jpg" },
                { userId: 2, name: "JavaScript", city: "成都", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/fc9f46585ca438f0.jpg" },
                { userId: 3, name: "CSS", city: "重庆", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/72131bea9fc90dbe.jpg" },
                { userId: 4, name: "HTML", city: "上海", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/812a7a3faf7b2617.png" },
                { userId: 5, name: "webpack", city: "天津", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/ca9af8da4b983b44.jpg" },
                { userId: 6, name: "React", city: "广州", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/b2717ce556b88194.jpg" },
            ])
        }, 500)
    })
}

function getFollower() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { userId: 1, name: "babel", city: "北京", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/135eddb103874249.jpg", isFollowing: true },
                { userId: 2, name: "JavaScript", city: "成都", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/fc9f46585ca438f0.jpg", isFollowing: false },
                { userId: 3, name: "CSS", city: "重庆", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/72131bea9fc90dbe.jpg", isFollowing: false },
                { userId: 4, name: "HTML", city: "上海", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/812a7a3faf7b2617.png", isFollowing: true },
                { userId: 5, name: "webpack", city: "天津", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/ca9af8da4b983b44.jpg", isFollowing: false },
                { userId: 6, name: "React", city: "广州", language: "简中", profilePic: "https://s3.bmp.ovh/imgs/2022/09/05/b2717ce556b88194.jpg", isFollowing: false },
            ])
        }, 500)
    })
}

export function upload(formData) {
    return instance.post('/api/applet/upload', formData);
}

export {
    logout,
    getComments,
    sendComment,
    getFollowing,
    getFollower,
}   