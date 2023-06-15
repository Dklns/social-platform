<template>
    <div class="update" ref="update">
        <div class="wrapper">
            <h1>更新你的个人信息</h1>
            <div className="files">
                <label htmlFor="cover">
                    <span>封面</span>
                    <div class="imgContainer">
                        <img :src="computedCover" />
                    </div>
                </label>
                <input type="file" id="cover" :style="{ display: `none` }" @change="(e) => cover = e.target.files[0]" />
                <label htmlFor="profile">
                    <span>头像</span>
                    <div class="imgContainer">
                        <img :src="computedProfile" />
                    </div>
                </label>
                <input type="file" id="profile" :style="{ display: `none` }" @change="(e) => profile = e.target.files[0]" />
            </div>
            <a-form :model="formState" @finish="finishHandler" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <a-row :gutter="24">
                    <a-col :span="8">
                        <a-form-item label="昵称">
                            <a-input v-model:value="formState.nickname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="密码">
                            <a-input-password v-model:value="formState.password" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="qq">
                            <a-input v-model:value="formState.qq" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="8">
                        <a-form-item label="城市">
                            <a-input v-model:value="formState.userLocation" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="语言类型">
                            <a-input v-model:value="formState.userLang" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="twitter">
                            <a-input v-model:value="formState.twitter" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="8">
                        <a-form-item label="facebook">
                            <a-input v-model:value="formState.facebook" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="weibo">
                            <a-input v-model:value="formState.weibo" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="8">
                        <a-form-item v-if="isModifyEmail" label="邮箱">
                            <a-input v-model:value="formState.email" />
                        </a-form-item>
                        <a-form-item v-else label="邮箱">
                            <div class="email-box">
                                {{ formState.email }}
                                <a-button @click="modifyEmailHandler">
                                    更换邮箱
                                </a-button>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" v-if="isModifyEmail">
                        <a-form-item label="邮箱验证码">
                            <a-input v-model:value="code" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" v-if="isModifyEmail">
                        <a-form-item>
                            <a-button class="code" :disabled="!formState.email || isGettingCode" @click="getCodeHandler"
                                :style="{ marginLeft: `50px` }">
                                {{ isGettingCode ? `${loadingSeconds} 秒后重新获取` : "获取验证码" }}
                            </a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-form-item>
                    <div class="btn">
                        <a-button type="primary" htmlType="submit" :loading="isSubmitting" :disabled="isSubmitting">
                            更新
                        </a-button>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import { upload, getCode, validateCode } from "../request/request";
import { updateProfile, getProfileData } from '../request/profile';
import { notification } from 'ant-design-vue';

export default {
    props: ["setOpenUpdate", "user", "updateUser"],
    data() {
        return {
            formState: {
                ...this.user,
            },
            code: "",
            isSubmitting: false,
            cover: null,
            profile: null,
            isModifyEmail: false,
            loadingSeconds: 0,
            isGettingCode: false,
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
        async finishHandler() {
            this.isSubmitting = true;

            let coverUrl = this.computedCover;
            let profileUrl = this.computedProfile;

            try {
                if (this.cover) {
                    const formData = new FormData();
                    formData.append("img", this.cover);
                    const res = await upload(formData);
                    coverUrl = res.data.data.url;
                }

                if (this.profile) {
                    const formData = new FormData();
                    formData.append("img", this.profile);
                    const res = await upload(formData);
                    profileUrl = res.data.data.url;
                }

                this.formState.coverPic = coverUrl;
                this.formState.profilePic = profileUrl;

                if (this.isModifyEmail && this.formState.email !== this.user.email) {
                    const res = await validateCode(this.code);
                    console.log('validate code', res);

                    if (res.data.code !== 1) {
                        notification.error({
                            message: "获取验证码",
                            description: res.data.msg
                        })
                        return;
                    }
                }

                updateProfile(this.formState).then(async () => {
                    const res = await getProfileData(this.user.userId);
                    this.updateUser(res.data.data);
                    this.$store.commit('curUserUpdate', res.data.data);
                    this.setOpenUpdate(false);
                })
            } catch (error) {
                console.log(error);
            } finally {
                this.isSubmitting = false;
            }
        },
        modifyEmailHandler() {
            this.isModifyEmail = true;
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
                const res = await getCode(this.formState.email);
                console.log(res);

            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        notification.config({ getContainer: () => this.$refs.update });
    }
}

</script>

<style lang="scss" scoped>
@import "../style.scss";

.update {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .wrapper {
        width: 1000px;
        display: flex;
        flex-direction: column;
        gap: 20px;


        h1 {
            color: lightgrey;
            text-align: center;
            padding-right: 150px;
        }

        .btn {
            display: flex;
            justify-content: center;
            padding-left: 200px;
        }

        .files {
            display: flex;
            justify-content: center;
            padding-right: 200px;
            flex-wrap: wrap;
            gap: 100px;
            margin-left: 100px;
        }

        label {
            display: flex;
            flex-direction: column;
            gap: 10px;
            color: gray;
            font-size: 14px;

            .imgContainer {
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

        .email-box {
            display: flex;
            align-items: center;
            gap: 30px;
        }

    }
}
</style>
