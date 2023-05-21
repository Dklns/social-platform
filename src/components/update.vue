<template>
    <div class="update">
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
            <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="finishHandler">
                <a-form-item label="昵称">
                    <a-input v-model:value="formState.nickname" />
                </a-form-item>
                <a-form-item label="密码">
                    <a-input v-model:value="formState.password" />
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input v-model:value="formState.email" />
                </a-form-item>
                <a-form-item label="城市">
                    <a-input v-model:value="formState.userLocation" />
                </a-form-item>
                <a-form-item label="语言类型">
                    <a-input v-model:value="formState.userLang" />
                </a-form-item>
                <a-form-item>
                    <div class="btn">
                        <a-button type="primary" htmlType="submit">
                            更新
                        </a-button>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import { upload } from "../request/request";
import { updateProfile, getProfileData } from '../request/profile';

export default {
    props: ["setOpenUpdate", "user", "updateUser"],
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
        async finishHandler() {

            let coverUrl = this.computedCover;
            let profileUrl = this.computedProfile;

            const formData = new FormData();

            if (this.cover) {
                formData.append("img", this.cover);
                const res = await upload(formData);
                coverUrl = res.data.data.url;
            }

            if (this.profile) {
                formData.append("img", this.profile);
                const res = await upload(formData);
                profileUrl = res.data.data.url;
            }

            this.formState.coverPic = coverUrl;
            this.formState.profilePic = profileUrl;

            updateProfile(this.formState).then(async () => {
                const res = await getProfileData(this.user.userId);
                this.updateUser(res.data.data);
                this.$store.commit('curUserUpdate', res.data.data);
                this.setOpenUpdate(false);
            })
        }
    }
}

</script>

<style lang="scss" scoped>
@import "../style.scss";

.update {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;


    .wrapper {
        width: 800px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-left: 100px;


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

    }
}
</style>
