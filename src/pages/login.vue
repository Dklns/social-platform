<template>
    <div className='login gradient'>
        <div className='card cradO'>
            <div className='left'>
                <h1>Hello World.</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.Libero cum,
                    alias totam numquam ipsa exercitationem dignissimos,error nam,
                    consequatur.
                </p>
                <span>Don't you have an account?</span>
                <router-link to="/register">
                    <button>Register</button>
                </router-link>
            </div>
            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" :placeholder="inputPlaceholder" name='username' v-model="inputs.username" />
                    <input type="password" placeholder="Password" name='password' v-model="inputs.password" />
                    <a-button type="primary" :loading=isLoading @click.prevent="loginHandler">Login</a-button>
                    <p v-if="err" class="err">
                        {{ err }}
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '../request/request';

export default {
    name: 'login',
    data() {
        return {
            inputs: {
                username: '',
                password: ''
            },
            err: "",
            isLoading: false
        }
    },
    computed: {
        inputPlaceholder() {
            return this.inputs.username ? this.inputs.username : 'Username';
        }
    },
    methods: {
        async loginHandler() {
            if (this.checkInputs() === "disqualification") return;
            this.isLoading = true;

            const res = await login(this.inputs);

            const { code, data } = res.data;

            this.isLoading = false;

            if (code === 1) {
                this.$store.commit('curUserUpdate', data);
                this.$router.push("/");
            } else {
                // 未作登录失败逻辑
                if (code === 401) {
                    this.err = "用户不存在";
                }
                if (code === 403) {
                    this.err = "密码错误";
                }
                return;
            }
        },
        checkInputs() {
            for (let key in this.inputs) {
                if (this.inputs[key] === "") {
                    this.err = "The form has blank space";
                    return "disqualification";
                }
            }
        },
    },
    mounted() {
        const username = this.$route.params.username;
        if (username) {
            this.inputs.username = username;
        }
    }
}
</script>

<style lang="scss">
.login {
    // height: 100vh;
    // background-color: rgb(193, 190, 255);
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

    // .gradient {
    //     /* 设置容器尺寸 - 原理1 */
    //     width: 400px;
    //     height: 400px;
    //     /* 背景渐变色 - 原理2 */
    //     background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    //     /* 背景尺寸 - 原理3 */
    //     background-size: 600% 600%;
    //     /* 循环动画 - 原理4 */
    //     animation: gradientBG 5s ease infinite;
    // }

    /* 动画，控制背景 background-position */
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
        width: 50%;
        min-height: 600px;
        display: flex;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;

        .left {
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 30px;
            background: linear-gradient(rgba(39, 11, 96, .5), rgba(39, 11, 96, .5)), url("https://i.328888.xyz/2023/03/20/PsE9H.jpeg") center;
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

                input {
                    border: none;
                    border-bottom: 1px solid lightgray;
                    padding: 20px 10px;
                }
            }

        }
    }
}
</style>