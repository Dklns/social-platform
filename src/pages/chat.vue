<template>
    <div class="chat">
        <div class="container">
            <h2>
                {{ nickname }}
                <div class="more">
                    <a-dropdown>
                        <ellipsis-outlined />
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="deleteAllHandler">
                                    <delete-outlined />
                                    删除所有聊天
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </h2>
            <div class="list" ref="list">
                <div class="item" v-for="item in list" :key="item.id">
                    <div class="record" :class="{ me: item.userId !== userId }">
                        <div class="header" v-if="item.hint">
                            <p>{{ item.hint }}</p>
                        </div>
                        <div class="bottom">
                            <div class="img-container">
                                <img :src="profilePic">
                            </div>
                            <p class="content">
                                {{ item.content }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input">
                <div class="top">
                    <a-form>
                        <a-input v-model:value="message" />
                        <a-button @click="sendMessageHandler" htmlType="submit">
                            发送
                        </a-button>
                    </a-form>
                </div>
                <div class="bottom">
                    <audio-outlined />
                    <picture-outlined />
                    <camera-outlined />
                    <video-camera-outlined />
                    <smile-outlined />
                    <plus-circle-outlined />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProfileData } from '../request/profile';
import { getChat, sendMessage, deleteAll } from '../request/chat';
import { moment } from '../utils';
import {
    AudioOutlined, PictureOutlined, CameraOutlined,
    VideoCameraOutlined, SmileOutlined, PlusCircleOutlined,
    EllipsisOutlined, DeleteOutlined
} from '@ant-design/icons-vue';

export default {
    data() {
        return {
            list: [],
            profilePic: "",
            nickname: "",
            userId: "",
            message: "",
            timer: null
        }
    },
    components: {
        AudioOutlined,
        PictureOutlined,
        CameraOutlined,
        VideoCameraOutlined,
        SmileOutlined,
        PlusCircleOutlined,
        EllipsisOutlined,
        DeleteOutlined
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.getList(this.$route.params.userId);
            }
        }
    },
    methods: {
        getList(userId) {
            getChat(userId).then(res => {
                this.list = res.data.data;
                console.log(res.data.data);
                this.userId = parseInt(userId);

                let lastTime = "";
                this.list.forEach((item, index) => {
                    if (index === 0) {
                        item.hint = moment(item.time).fromNow();
                    }

                    const t1 = moment(lastTime);
                    const t2 = moment(item.time);
                    if (t2.diff(t1, 'minutes') >= 3) {
                        item.hint = t2.fromNow();
                    }

                    lastTime = item.time;
                })

                return getProfileData(userId);
            }).then(res => {
                const data = res.data.data;
                this.profilePic = data.profilePic;
                this.nickname = data.nickname;

                const listDOM = this.$refs.list

                listDOM.scrollTo(0, listDOM.scrollHeight);
            })
        },
        async redo() {
            return getChat(this.userId).then(res => {
                this.list = res.data.data;
                this.list.forEach(item => {
                    item.date = moment(item.time).fromNow();
                })
            })
        },
        sendMessageHandler() {
            sendMessage(this.userId, this.message).then(res => {
                this.message = ""
                this.redo().then(() => {
                    const listDOM = this.$refs.list;
                    listDOM.scrollTo(0, listDOM.scrollHeight);
                })
            })
        },
        deleteAllHandler() {
            deleteAll(this.userId).then(() => {
                this.redo();
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../style.scss';

.chat {
    @include themify($themes) {
        background-color: themed('bgSoft');
        height: 100%;
        display: flex;
        justify-content: center;

        .container {
            width: 500px;
            height: calc(100vh - 50px);
            background-color: #fff;

            h2 {
                text-align: center;
                height: 50px;
                line-height: 50px;
                background-color: #1890ff;
                color: #fff;
                position: relative;

                .more {
                    position: absolute;
                    right: 50px;
                    top: 0;
                    cursor: pointer;
                }
            }

            .list {
                overflow-y: scroll;
                height: calc(100% - 170px);

                .item {

                    .record {
                        .header {
                            p {
                                text-align: center;
                            }
                        }

                        .bottom {
                            display: flex;
                            gap: 20px;

                            .img-container {
                                width: 50px;
                                height: 50px;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                    object-fit: contain;
                                }
                            }

                            .content {
                                margin-top: 10px;
                                background-color: #1890ff;
                                color: #fff;
                                min-height: 40px;
                                border-radius: 10px;
                                padding: 10px 20px;
                                max-width: 350px;
                                white-space: pre-wrap;
                            }

                            .me {
                                justify-content: right;
                            }
                        }
                    }

                    .me {
                        .bottom {
                            flex-direction: row-reverse;
                        }
                    }
                }
            }

            .input {
                height: 100px;
                display: flex;
                flex-direction: column;
                bottom: 0;
                width: 100%;

                .top {
                    form {
                        display: flex;
                    }
                }

                .bottom {
                    display: flex;
                    font-size: 22px;
                    padding: 20px 0;
                    justify-content: space-around;
                }
            }
        }
    }
}
</style>