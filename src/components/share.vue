<template>
    <div className="share">
        <div className="container">
            <div className="top">
                <div className="left">
                    <img :src="currentUser.profilePic" alt="" />
                    <input type="text" :placeholder="`${currentUser.nickname}, 你有什么新鲜事?`" v-model="content" />
                </div>
                <div className="right">
                    <img v-if="imageUrl" className="file" alt="file" :src="imageUrl" />
                </div>
            </div>
            <hr />
            <div className=" bottom">
                <div className="left">
                    <input type="file" id="file" :style="{ display: `none` }" @change="changeHandler" />
                    <label htmlFor="file">
                        <div className="item">
                            <img :src="Image" alt="Image" />
                            <span>添加图片</span>
                        </div>
                    </label>
                    <div className="item">
                        <img :src="Map" alt="Map" />
                        <span>添加位置</span>
                    </div>
                    <div className="item">
                        <img :src="Friend" alt="Friend" />
                        <span>@好友</span>
                    </div>
                </div>
                <div className="right">
                    <a-button type="primary" @click="shareHandler" :disabled="!content">
                        发表
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { upload } from '../request/request';
import { share, getAllPost } from "../request/post";

import { mapState } from 'vuex';

export default {
    name: 'share',
    data() {
        return {
            Image,
            Map,
            Friend,
            file: "",
            imageUrl: "",
            content: ""
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser
        })
    },
    methods: {
        changeHandler(e) {
            this.file = e.target.files[0];
            this.imageUrl = URL.createObjectURL(this.file);
        },
        async shareHandler() {
            const formData = new FormData();
            formData.append('desc', this.content);
            let res;
            if (this.file) {
                formData.append('img', this.file);
                res = await upload(formData);
                this.imageUrl = res.data.data.url;
            }
            formData.set('img', this.imageUrl);
            console.log(this.imageUrl);
            await share(formData);
            res = await getAllPost();
            this.$store.commit("setHomePosts", res.data.data);
            this.content = "";
            this.imageUrl = "";
        }
    }
}
</script>

<style lang="scss">
@import "../style.scss";

.share {
    @include themify($themes) {
        -webkit-box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.38);
        -moz-box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.38);
        box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.38);
        border-radius: 20px;
        background-color: themed("bg");
        color: themed("textColor");
        margin-bottom: 20px;

        .container {
            padding: 20px;

            .top {
                display: flex;
                align-items: center;

                .left {
                    display: flex;
                    flex: 3;
                    align-items: center;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        object-fit: cover;
                    }

                    input {
                        border: none;
                        outline: none;
                        padding: 20px 10px;
                        background-color: transparent;
                        width: 60%;
                        color: themed("textColor");
                    }
                }

                .right {
                    display: flex;
                    flex: 1;
                    justify-content: flex-end;

                    .file {
                        width: 100px;
                        height: 100px;
                        object-fit: cover;
                        border-radius: 0px;
                    }
                }
            }

            hr {
                margin: 20px 0px;
                border: none;
                height: 0.5px;
                background-color: themed("border");
            }

            .bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .left {
                    display: flex;
                    align-items: center;
                    gap: 20px;

                    .item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        cursor: pointer;

                        img {
                            height: 25px;
                        }

                        span {
                            font-size: 12px;
                            color: gray;
                        }
                    }
                }

                .right {
                    button {
                        border: none;
                        padding: 5px;
                        color: white;
                        cursor: pointer;
                        background-color: #5271ff;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
}
</style>