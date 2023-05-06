<template>
    <div class='register'>
        <div class='card'>
            <div class='left'>
                <h1>Hello World.</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.Libero cum,
                    alias totam numquam ipsa exercitationem dignissimos,error nam,
                    consequatur.
                </p>
                <span>Do you have an account?</span>
                <router-link to='/login'>
                    <button>Login</button>
                </router-link>
            </div>
            <div class="right">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder='Username' name='username' v-model="inputs.username" />
                    <input type="email" placeholder='Email' name='email' v-model="inputs.email" />
                    <input type="password" placeholder="Password" name='password' v-model="inputs.password" />
                    <input type="text" placeholder='Name' name='nickname' v-model="inputs.nickname" />
                    <a-button type="primary" :loading="isLoading" @click="registerHandler">Register</a-button>
                    <p v-if="err" class="err">
                        {{ err }}
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { register } from '../query/queries';

export default {
    name: 'register',
    data() {
        return {
            inputs: {
                username: '',
                email: '',
                password: '',
                nickname: '',
            },
            isLoading: false,
            err: ''
        }
    },
    methods: {
        async registerHandler() {
            if (this.checkInputs() === "disqualification") return;
            this.isLoading = true;
            const res = await register(this.inputs);
            if (res === 'success') {
                this.isLoading = false;
                this.$router.push(`/login/${this.inputs.username}`);
            } else {
                this.err = res;
            }
        },
        checkInputs() {
            const inputs = this.inputs;
            for (let key in inputs) {
                if (inputs[key] === "") {
                    this.err = "The form has blank space";
                    return "disqualification";
                }
            }
            const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!reg.test(inputs.email)) {
                this.err = "email format error";
                return "disqualification";
            }

            const len = inputs.password.length
            if (len < 6 || len > 20) {
                this.err = "The password length should be between 6 and 20";
                return "disqualification";
            }
        }
    }
}
</script>

<style lang="scss">
.register {
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
        width: 50%;
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