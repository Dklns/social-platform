function register(inputs) {
    // 如果注册成功，data为 success，否则data为失败原因(字符串)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success');
        }, 1500);
    });
}

function login(inputs) {
    // 如果登录成功，data为当前用户对象，否则data为失败原因(字符串)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                userId: 1,
                username: inputs.username,
                profilePic: "https://i.328888.xyz/2023/04/12/iXOjD3.jpeg",
                name: "klns"
            });
        }, 1500);
    });
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

export {
    register,
    login,
    logout,
    getAllPost,
    getPostByUserId,
    getProfileData,
    getComments,
    sendComment
}