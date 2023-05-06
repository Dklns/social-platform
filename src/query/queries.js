import axios from "axios";

const requestPath = "http://localhost:8080/smp"

function register(inputs) {
    // 如果注册成功，data为 success，否则data为失败原因(字符串)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success');
        }, 1500);
    });
}

function login(inputs) {

    let code = 0;
    let userId = "";
    let username = "";
    let profilePic = "";
    let nickname = "";

    axios.post(requestPath + '/api/auth/login', {
        username: inputs.username,
        password: inputs.password
    }).then(function (response) {
        console.log(response.data);
        code = response.data.code;
        if (code === 1) {
            userId = response.data.data.userId;
            username = response.data.data.username;
            profilePic = response.data.data.profilePic;
            nickname = response.data.data.nickname;
        } else {
            return null;
        }
    });


    console.log(inputs);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (profilePic == "") {
                alert(1111);
                profilePic = "https://i.328888.xyz/2023/04/12/iXOjD3.jpeg";
            }
            resolve({
                id: userId,
                username: username,
                profilePic: requestPath + profilePic,
                name: nickname,
                code: code
            });
        }, 1500);
    });

    // 如果登录成功，data为当前用户对象，否则data为失败原因(字符串)
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve({
    //             id: 1,
    //             username: inputs.username,
    //             profilePic: "https://i.328888.xyz/2023/04/12/iXOjD3.jpeg",
    //             name: "klns"
    //         });
    //     }, 1500);
    // });
}

function logout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success");
        });
    });
}

function getAllPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, desc: "a chair", img: "https://i.328888.xyz/2023/03/22/YvOPv.jpeg", userId: 2, name: 'llxs', profilePic: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-v9ww2p.jpg" },
                { id: 2, desc: "sun rise", img: "https://i.328888.xyz/2023/03/22/Y96K3.jpeg", userId: 1, name: 'klns', profilePic: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-rdkeq7.jpg" }
            ])
        }, 1000);
    })
}

function getPostByUserId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 2, desc: "sun rise", img: "https://i.328888.xyz/2023/03/22/Y96K3.jpeg", userId: 1, name: 'klns', profilePic: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-rdkeq7.jpg" }
            ])
        }, 1000);
    })
}

function getProfileData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                {
                    coverPic: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-x8v7vo.jpg",
                    profile: "https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png",
                    name: "klns",
                    city: "chengdu",
                    language: '简中'
                }
            )
        }, 1000);
    })
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

export {
    register,
    login,
    logout,
    getAllPost,
    getPostByUserId,
    getProfileData,
    getComments,
    sendComment,
    getFollowing,
    getFollower
}   