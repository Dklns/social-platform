<template>
    <div class='nav-bar'>
        <div class="left">
            <router-link to='/'>
                <span>Our Social</span>
            </router-link>
            <home-outlined />
            <BulbFilled v-if="darkMode" @click="toggle" />
            <BulbOutlined v-else @click="toggle" />
            <AppstoreOutlined />
            <div class="search">
                <SearchOutlined />
                <input type="text" placeholder='搜索....' />
            </div>
        </div>
        <div class="right">
            <UserOutlined @Click="() => $router.push(`/profile/${currentUser.userId}`)" />
            <MailOutlined />
            <BellOutlined />
            <div class="user">
                <img :src="currentUser.profilePic" />
                <span>{{ currentUser.name }}</span>
            </div>
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
    BellOutlined
} from '@ant-design/icons-vue';

import { mapState } from 'vuex';

export default {
    name: 'navBar',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser,
            darkMode: state => state.darkMode
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
        BellOutlined
    },
    methods: {
        toggle() {
            this.$store.commit('darkModeUpdate');
        }
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
        }
    }
}
</style>