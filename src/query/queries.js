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

export {
    register,
    login,
    logout
}