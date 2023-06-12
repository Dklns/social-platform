<template>
    <div class='nav-bar'>
        <div class="left">
            <router-link to='/'>
                <span>Our Social</span>
            </router-link>
            <BulbFilled v-if="darkMode" @click="toggle" />
            <BulbOutlined v-else @click="toggle" />
            <AppstoreOutlined />
            <div class="search">
                <SearchOutlined class="search-btn" @click="searchHandler" />
                <input type="text" placeholder='搜索....' v-model="searchText" @keydown="keydownHandler" />
            </div>
        </div>
        <div class="right">
            <div class="statistics">
                <router-link to="/statistics">
                    <BarChartOutlined />
                </router-link>
            </div>
            <div class="star">
                <star-outlined @click="gotoStarHandler" />
            </div>
            <div class="notice">
                <mail-outlined @click="openDrawerHandler" />
                <div class="count" v-if="notReadCount > 0">
                    {{ notReadCount > 99 ? 99 : notReadCount }}
                </div>
                <a-drawer v-model:visible="isShowDrawer" :width="420">
                    <Notice v-if="isShowDrawer" @read="readHandler" />
                </a-drawer>
            </div>
            <a-dropdown>
                <div class="user">
                    <img :src="currentUser.profilePic" />
                    <span>{{ currentUser.nickname }}</span>
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @Click="gotoProfileHandler">
                            <a>
                                <UserOutlined />
                                个人中心
                            </a>
                        </a-menu-item>
                        <a-menu-item>
                            <a @click="logoutHandler">
                                <export-outlined />&nbsp;账号登出
                            </a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script>
import {
    HomeOutlined,
    BulbOutlined,
    BulbFilled,
    AppstoreOutlined,
    SearchOutlined,
    UserOutlined,
    MailOutlined,
    BellOutlined,
    ExportOutlined,
    StarOutlined,
    BarChartOutlined
} from '@ant-design/icons-vue';
import Notice from './notice.vue';
import { getAllCount, logout } from '../request/request';

import { mapState } from 'vuex';

export default {
    name: 'navBar',
    data() {
        return {
            isShowDrawer: false,
            searchText: ""
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser,
            darkMode: state => state.darkMode,
            notReadCount: state => state.notReadCount
        })
    },
    components: {
        HomeOutlined,
        BulbOutlined,
        BulbFilled,
        AppstoreOutlined,
        SearchOutlined,
        UserOutlined,
        MailOutlined,
        BellOutlined,
        ExportOutlined,
        Notice,
        StarOutlined,
        BarChartOutlined
    },
    methods: {
        toggle() {
            this.$store.commit('darkModeUpdate');
        },
        gotoProfileHandler() {
            this.$router.push(`/profile/${this.currentUser.userId}`);
        },
        openDrawerHandler() {
            this.isShowDrawer = true;
        },
        logoutHandler() {
            logout().then(() => {
                this.$store.commit('logout');
                this.$router.replace('/login');
            })
        },
        readHandler() {
            this.isShowDrawer = false;
        },
        searchHandler() {
            this.$router.push(`/search/${this.searchText}`);
        },
        keydownHandler(e) {
            if (e.keyCode === 13) {
                this.searchHandler();
            }
        },
        gotoStarHandler() {
            this.$router.push(`/star`);
        }
    },
    mounted() {
        getAllCount().then(res => {
            let count = res.data.data;
            this.$store.commit('setNotReadCount', count);
        })
    }
}
</script>

<style lang="scss">
@import "../style.scss";

.nav-bar {
    @include themify($themes) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        height: 50px;
        position: sticky;
        z-index: 999;
        top: 0;
        border-bottom: 1px solid themed("border");
        background-color: themed("bg");
        color: themed('textColor');

        a {
            color: inherit;
        }


        .left {
            display: flex;
            align-items: center;

            gap: 30px;

            span {
                font-weight: bold;
                font-size: 20px;
                color: themed("logo");
            }

            .search {
                display: flex;
                align-items: center;
                gap: 10px;
                border: 1px solid themed("border");
                border-radius: 5px;
                padding: 5px;

                .search-btn {
                    cursor: pointer;
                }

                input {
                    border: none;
                    width: 500px;
                    background-color: transparent;
                    color: themed('textColor');

                    @include mobile {
                        display: none;
                    }

                    @include tablet {
                        width: 200px;
                    }
                }
            }
        }

        .right {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-right: 50px;

            @include mobile {
                display: none;
            }

            .user {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
                position: relative;
                cursor: pointer;

                @include tablet {
                    display: none;
                }

                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

            .statistics {
                font-size: 20px;
                cursor: pointer;
                margin-right: 20px;
                position: relative;
            }

            .star {
                font-size: 20px;
                cursor: pointer;
                margin-right: 20px;
                position: relative;
            }

            .notice {
                font-size: 20px;
                cursor: pointer;
                margin-right: 20px;
                position: relative;

                .count {
                    position: absolute;
                    right: -10px;
                    top: 0px;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    border-radius: 50%;
                    background-color: red;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>