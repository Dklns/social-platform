<template>
    <div className="update">
        <div className="wrapper">
            <h1>Update Your Profile</h1>
            <form>
                <div className="files">
                    <label htmlFor="cover">
                        <span>Cover Picture</span>
                        <div className="imgContainer">
                            <img :src="computedCover" />
                        </div>
                    </label>
                    <input type="file" id="cover" :style="{ display: `none` }" @change="(e) => cover = e.target.files[0]" />
                    <label htmlFor="profile">
                        <span>Profile Picture</span>
                        <div className="imgContainer">
                            <img :src="computedProfile" />
                        </div>
                    </label>
                    <input type="file" id="profile" :style="{ display: `none` }"
                        @change="(e) => profile = e.target.files[0]" />
                </div>
                <label>邮箱</label>
                <input type=" text" name="email" v-model="formState.email" />
                <label>密码</label>
                <input type="text" name="password" v-model="formState.password" />
                <label>昵称</label>
                <input type="text" name="name" v-model="formState.nickname" />
                <label>城市</label>
                <input type="text" name="city" v-model="formState.city" />
                <label>语言类型</label>
                <input type="text" name="website" v-model="formState.language" />
                <button @click="handleClick">Update</button>
            </form>
            <button className="close" @click="() => setOpenUpdate(false)">
                close
            </button>
        </div>
    </div>
</template>

<script>
import { upload } from "../request/request"

export default {
    props: ["setOpenUpdate", "user"],
    data() {
        return {
            formState: {
                ...this.user
            },
            cover: null,
            profile: null,
        }
    },
    computed: {
        computedCover() {
            return this.cover ? URL.createObjectURL(this.cover) : this.formState.coverPic
        },
        computedProfile() {
            return this.profile ? URL.createObjectURL(this.profile) : this.formState.profilePic
        }
    },
    methods: {
        async handleClick(e) {
            e.preventDefault();
            
            let coverUrl, profileUrl;

            coverUrl = cover ? await upload(cover) : coverUrl;
            profileUrl = profile ? await upload(profile) : profileUrl;

            console.log(coverUrl, profileUrl);
        }
    }
}

</script>

<style lang="scss" scoped>
@import "../style.scss";

.update {
    @include themify($themes) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;

        .wrapper {
            margin: auto;
            width: 40%;
            background-color: themed("bg");
            padding: 50px;
            z-index: 999;
            display: flex;
            flex-direction: column;
            gap: 20px;
            -webkit-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
            -moz-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
            box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
            position: relative;

            @include mobile {
                width: 100%;
                height: 100%;
            }

            h1 {
                color: lightgrey;

                @include mobile {
                    font-size: 20px;
                }

            }

            form {
                display: flex;
                flex-direction: column;
                gap: 20px;

                .files {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 50px;
                }

                label {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    color: gray;
                    font-size: 14px;

                    .imgContainer {
                        position: relative;

                        img {
                            width: 100px;
                            height: 100px;
                            object-fit: cover;
                        }

                        .icon {
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: auto;
                            font-size: 30px;
                            color: lightgray;
                            cursor: pointer;
                        }
                    }
                }

                input {
                    padding: 5px;
                    border: none;
                    border-bottom: 1px solid themed("border");
                    color: gray;
                    background-color: transparent;
                }

                button {
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                    color: white;
                    background-color: #5271ff;
                }
            }

            .close {
                position: absolute;
                top: 10px;
                right: 20px;
                border: none;
                background-color: #f0544f;
                padding: 5px;
                cursor: pointer;
                color: white;
            }
        }
    }
}
</style>