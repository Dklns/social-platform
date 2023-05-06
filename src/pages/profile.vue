<template>
    <div className='profile'>
        <!-- <div v-if="isLoading">
            <p>isLoading.......</p>
        </div> -->
        <loadingMark v-if="isLoading" />
        <div v-else>
            <div className="images">
                <img :src="data.coverPic" className='cover' />
                <img :src="data.profilePic" className='profilePic' />
            </div>
            <div className="profile-container">
                <div className="profile-user-info">
                    <div className="left">
                        <QqOutlined />
                        <WechatFilled />
                        <FacebookFilled />
                        <InstagramFilled />
                        <WeiboCircleFilled />
                    </div>
                    <div className="center">
                        <span>{{ data.name }}</span>
                        <div className="info">
                            <div className="item">
                                <i className="iconfont">&#xe602;</i>
                                <span>{{ data.city }}</span>
                            </div>
                            <div className="item">
                                <i className="iconfont">&#xe654;</i>
                                <span>{{ data.language }}</span>
                            </div>
                        </div>
                        <button>关注</button>
                    </div>
                    <div className="right">
                        <i className="iconfont">&#xe61c;</i>
                        <i className="iconfont">&#xe719;</i>
                    </div>
                </div>
                <Posts userId={userId} />
            </div>
        </div>
        <!-- {openUpdate &&
        <Update setOpenUpdate={setOpenUpdate} user={data} />} -->
    </div>
</template>

<script>

import {
    QqOutlined,
    WechatFilled,
    FacebookFilled,
    InstagramFilled,
    WeiboCircleFilled
} from '@ant-design/icons-vue';

import loadingMark from '../components/loadingMark.vue';
import Posts from '../components/posts.vue';
import { getProfileData } from '../query/queries';

export default {
    name: 'profile',
    data() {
        return {
            isLoading: true,
            data: {},
            userId: null,
            err: ""
        }
    },
    components: {
        Posts,
        QqOutlined,
        WechatFilled,
        FacebookFilled,
        InstagramFilled,
        WeiboCircleFilled,
        loadingMark
    },
    mounted() {
        this.userId = this.$route.params.userId;
        getProfileData().then(res => {
            console.log(res);
            this.data = res
            this.isLoading = false;
        }, reason => {
            this.err = reason;
        })
    }
}

</script>

<style lang="scss">
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
                height: 180px;
                -webkit-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
                -moz-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
                box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
                border-radius: 20px;
                background-color: themed('bg');
                color: themed('textColor');
                padding: 50px;
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