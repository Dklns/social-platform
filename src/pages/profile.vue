<template>
    <div className='profile'>
        <loadingMark v-if="isLoading" />
        <div v-else>
            <div className="images">
                <img :src="user.coverPic" className='cover' />
                <img :src="user.profilePic" className='profilePic' />
            </div>
            <div className="profile-container">
                <div className="profile-user-info">
                    <div className="left">
                        <a-tooltip :title="user.qq">
                            <QqOutlined class="icon-link" />
                        </a-tooltip>
                        <a-tooltip :title="user.twitter">
                            <TwitterOutlined class="icon-link" />
                        </a-tooltip>
                        <a-tooltip :title="user.facebook">
                            <FacebookFilled class="icon-link" />
                        </a-tooltip>
                        <a-tooltip :title="user.weibo">
                            <WeiboCircleFilled class="icon-link" />
                        </a-tooltip>
                    </div>
                    <div className="center">
                        <span>{{ user.nickname }}</span>
                        <div className="info">
                            <div className="item">
                                <i className="iconfont">&#xe602;</i>
                                <span>{{ user.userLocation }}</span>
                            </div>
                            <div className="item">
                                <i className="iconfont">&#xe654;</i>
                                <span>{{ user.userLang }}</span>
                            </div>
                        </div>
                        <button v-if="isShowUpdateForm" @click="() => setOpenUpdate(true)">更新</button>
                        <button v-else-if="user.isFollowed" @click="cancelFollowingHandler">已关注</button>
                        <button v-else @click="followHandler">关注</button>
                    </div>
                    <div className="right">
                        <message-outlined :style="{ cursor: `pointer`, fontSize: `20px` }" v-if="!isShowUpdateForm"
                            @click="gotoChatHandler" />
                        <i className="iconfont">&#xe719;</i>
                    </div>
                </div>
                <Posts :userId="user.userId" />
            </div>
        </div>
        <a-modal v-model:visible="isOpenUpdate" :style="{ width: `1000px` }" :footer="null">
            <update v-if="isOpenUpdate" :user="{ ...user }" :setOpenUpdate="setOpenUpdate" :updateUser="updateUser" />
        </a-modal>
    </div>
</template>

<script>

import {
    QqOutlined,
    WechatFilled,
    FacebookFilled,
    InstagramFilled,
    WeiboCircleFilled,
    MessageOutlined,
    TwitterOutlined
} from '@ant-design/icons-vue';

import loadingMark from '../components/loadingMark.vue';
import Posts from '../components/posts.vue';
import { getProfileData } from '../request/profile';
import Update from '../components/update.vue';
import { follow, cancelFollowing } from '../request/friend';

import { mapState } from 'vuex';

export default {
    name: 'profile',
    data() {
        return {
            isLoading: true,
            user: {},
            userId: null,
            err: "",
            isOpenUpdate: false
        }
    },
    components: {
        Posts,
        QqOutlined,
        WechatFilled,
        FacebookFilled,
        InstagramFilled,
        WeiboCircleFilled,
        MessageOutlined,
        loadingMark,
        Update,
        TwitterOutlined
    },
    computed: {
        isShowUpdateForm() {
            return this.userId === this.$store.state.currentUser.userId;
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                if (to.path.includes('profile')) {
                    console.log(to);
                    this.isLoading = true;
                    this.userId = parseInt(to.params.userId);
                    getProfileData(this.userId).then(res => {
                        console.log(res);
                        this.isLoading = false;
                        const { code, data } = res.data;
                        if (code === 1) {
                            this.user = data;
                        } else {
                            this.err = "获取数据失败";
                        }
                    }, reason => {
                        this.err = reason;
                    })
                }
            }
        }
    },
    methods: {
        setOpenUpdate(value) {
            this.isOpenUpdate = value;
        },
        updateUser(user) {
            this.user = user;
        },
        followHandler() {
            follow(this.user.userId).then(() => {
                console.log(this.user.userId);
                this.user.isFollowed = true;
            })
        },
        cancelFollowingHandler() {
            cancelFollowing(this.user.userId).then(() => {
                this.user.isFollowed = false;
            })
        },
        gotoChatHandler() {
            this.$router.push(`/chat/${this.user.userId}`)
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../style.scss';

@font-face {
    font-family: 'iconfont';
    /* Project id 3591478 */
    src: url('//at.alicdn.com/t/c/font_3591478_qgl1ezx8v2r.woff2?t=1679556339249') format('woff2'),
        url('//at.alicdn.com/t/c/font_3591478_qgl1ezx8v2r.woff?t=1679556339249') format('woff'),
        url('//at.alicdn.com/t/c/font_3591478_qgl1ezx8v2r.ttf?t=1679556339249') format('truetype');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

.profile {
    @include themify($themes) {
        background-color: themed('bgSoft');
        height: 100%;

        .images {
            width: 100%;
            height: 300px;
            position: relative;

            .cover {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .profilePic {
                width: 200px;
                height: 200px;
                border-radius: 50%;
                object-fit: cover;
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                top: 200px;
            }
        }

        .profile-container {
            padding: 20px 70px;

            @include mobile {
                padding: 10px;
            }

            @include tablet {
                padding: 20px;
            }

            .profile-user-info {
                height: 300px;
                -webkit-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
                -moz-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
                box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
                border-radius: 20px;
                background-color: themed('bg');
                color: themed('textColor');
                padding: 50px;
                padding-top: 150px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;

                @include mobile {
                    flex-direction: column;
                    height: 30vh;
                    padding: 20px;
                    margin-top: 100px;
                }

                .left {
                    flex: 1;
                    display: flex;
                    gap: 10px;
                    font-size: 24px;

                    @include tablet {
                        flex-wrap: wrap;
                    }

                    .icon-link {
                        cursor: pointer;
                    }
                }

                .center {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;

                    span {
                        font-size: 30px;
                        font-weight: 500;
                    }

                    .info {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        .item {
                            display: flex;
                            justify-content: center;
                            gap: 5px;
                            color: themed('textColorSoft');

                            span {
                                font-size: 12px;
                            }
                        }
                    }

                    button {
                        border: none;
                        background-color: #5271ff;
                        color: #fff;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }

                .right {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 10px;
                }
            }
        }
    }
}
</style>