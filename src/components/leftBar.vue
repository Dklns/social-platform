<template>
    <div className='left-bar'>
        <div className="container">
            <div className="menu">
                <div className="user">
                    <img :src="currentUser.profilePic" />
                    <span>{{ currentUser.nickname }}</span>
                </div>
                <div class=" item">
                    <router-link :to="`/friends/${currentUser.userId}`">
                        <img :src="Friends" />
                        <span>我的好友</span>
                    </router-link>
                </div>
                <div class="item">
                    <router-link :to="'/shop'">
                        <img :src="Market" />
                        <span>积分商城</span>
                    </router-link>
                </div>
                <div class="item">
                    <router-link :to="'/history'">
                        <img :src="Watch" />
                        <span>浏览记录</span>
                    </router-link>
                </div>
                <div class="item">
                    <router-link :to="'/rank'">
                        <img :src="Rank" />
                        <span>排行榜</span>
                    </router-link>
                </div>
            </div>
            <hr />
        </div>
    </div>
</template>

<script>
import Friends from '../assets/imgs/泡泡.png';
import Watch from '../assets/imgs/眼睛.png';
import Market from '../assets/imgs/购物.png';
import Rank from '../assets/imgs/花.png';

import { mapState } from 'vuex';

export default {
    name: 'leftBar',
    data() {
        return {
            Friends,
            Watch,
            Market,
            Rank
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser
        })
    }
}
</script>

<style lang="scss">
@import "../style.scss";

img {
    width: 30px;
}


.left-bar {
    @include themify($themes) {
        flex: 2;
        position: sticky;
        top: 50px;
        height: calc(100vh - 50px);
        overflow: scroll;
        background-color: themed("bg");
        color: themed('textColor');

        &::-webkit-scrollbar {
            display: none;
        }

        @include mobile {
            display: none;
        }

        .container {
            padding: 20px;

            hr {
                margin: 20px 0;
                border: none;
                height: .5px;
                background-color: themed("border");
            }

            .menu {
                display: flex;
                flex-direction: column;
                gap: 20px;

                span {
                    font-size: 12px;
                }

                .user {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    img {
                        height: 30px;
                        border-radius: 50%;
                        object-fit: cover;
                    }

                    span {
                        font-size: 14px;
                    }
                }

                .item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;

                    span {
                        font-size: 14px;
                    }

                    a {
                        color: inherit;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
    }
}
</style>