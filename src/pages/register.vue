<template>
    <div class='register'>
        <div class='card'>
            <div class='left'>
                <h1>Hello World.</h1>
                <p>
                    生活封锁了我们，只要我们的心不死，生活便永远不是一汪死水，而我们，依然会绽放最美的姿态。
                </p>
                <span>还没有账号？</span>
                <router-link to='/login'>
                    <button>登录</button>
                </router-link>
            </div>
            <div class="right">
                <h1>注册</h1>
                <form>
                    <input type="text" placeholder='用户名' name='username' v-model="inputs.username" />
                    <input type="email" placeholder='电子邮箱' name='email' v-model="inputs.email" />
                    <input type="email" placeholder='验证码' name='email' v-model="inputs.code" />
                    <a-button class="code" :disabled="!inputs.email || isGettingCode" @click="getCodeHandler">
                        {{ isGettingCode ? `${loadingSeconds} 秒后重新获取` : "获取验证码" }}
                    </a-button>
                    <input type="password" placeholder="密码" name='password' v-model="inputs.password" />
                    <input type="text" placeholder='昵称' name='nickname' v-model="inputs.nickname" />
                    <p v-if="err" class="err">
                        {{ err }}
                    </p>
                    <a-button type="primary" :loading="isLoading" @click="registerHandler">注册</a-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { register, getCode, validateCode } from '../request/request';

export default {
    name: 'register',
    data() {
        return {
            inputs: {
                username: 'klns',
                email: 'd.klns.245@gmail.com',
                password: '123456',
                nickname: 'klns',
                code: "",
            },
            isLoading: false,
            isGettingCode: false,
            err: '',
            loadingSeconds: 0
        }
    },
    methods: {
        async registerHandler() {
            this.err = "";
            if (this.checkInputs() === "disqualification") return;

            this.isLoading = true;
            let res;

            try {
                res = await validateCode(this.inputs.code);
                console.log('code', res);

                if (res.data.code !== 1) {
                    this.err = res.data.msg;
                    return;
                }

                res = await register(this.inputs);
                console.log(res);

                const { code } = res.data;
                if (code === 1) {
                    this.isLoading = false;
                    this.$router.push(`/login/${this.inputs.username}`);
                } else {
                    this.err = res.data.msg;
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        checkInputs() {
            const inputs = this.inputs;
            for (let key in inputs) {
                if (inputs[key] === "") {
                    this.err = "表单不能有空白";
                    return "disqualification";
                }
            }
            const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!reg.test(inputs.email)) {
                this.err = "邮箱格式错误";
                return "disqualification";
            }

            const len = inputs.password.length
            if (len < 6 || len > 20) {
                this.err = "密码长度应该在 6 到 20 之间";
                return "disqualification";
            }
        },
        async getCodeHandler() {
            this.isGettingCode = true;
            this.loadingSeconds = 60;
            const t = setInterval(() => {
                if (this.loadingSeconds-- <= 0) {
                    this.isGettingCode = false;
                    this.loadingSeconds = 0;
                    clearInterval(t);
                }
            }, 1000);

            try {
                const res = await getCode(this.inputs.email);
                console.log(res);

            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style lang="scss">
.register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* 背景渐变色 - 原理2 */
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    /* 背景尺寸 - 原理3 */
    background-size: 600% 600%;
    /* 循环动画 - 原理4 */
    animation: gradientBG 5s ease infinite;

    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }

    .card {
        display: flex;
        flex-direction: row-reverse;
        //width: 50%;
        min-height: 600px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;

        .left {
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 30px;
            background: linear-gradient(rgba(39, 11, 96, .5), rgba(39, 11, 96, .5)), url("https://i.328888.xyz/2023/03/20/P9BtZ.jpeg") center;
            background-size: cover;
            padding: 50px;
            color: white;

            h1 {
                font-size: 100px;
                line-height: 100px;
            }

            span {
                font-size: 14px;
            }

            button {
                width: 50%;
                padding: 10px;
                border: none;
                border-color: #fff;
                color: rebeccapurple;
                font-weight: bold;
                cursor: pointer;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            flex: 1;
            padding: 50px;
            flex-direction: column;
            gap: 50px;

            h1 {
                color: #555;
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 30px;
                position: relative;

                input {
                    border: none;
                    border-bottom: 1px solid lightgray;
                    padding: 20px 10px;
                }

                .code {
                    position: absolute;
                    right: 50px;
                    top: 200px
                }
            }
        }
    }
}
</style>