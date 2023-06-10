<template>
    <div class="rank">
        <h1>排行榜</h1>
        <div class="menu">
            <a-menu mode="horizontal" :style="{ backgroundColor: `transparent` }" v-model:selectedKeys="selectedKeys">
                <a-menu-item key="post">
                    <template #icon>
                        <smile-outlined :style="{ fontSize: `18px` }" />
                    </template>
                    帖子
                </a-menu-item>
                <a-menu-item key="user">
                    <template #icon>
                        <user-outlined :style="{ fontSize: `18px` }" />
                    </template>
                    用户
                </a-menu-item>
            </a-menu>
        </div>
        <div class="list" v-if="isLoading">
            <a-spin />
        </div>
        <div class="list" v-else>
            <div class="p" v-if="selectedKeys[0] === `post`">
                <RankPost v-for="post in postList" :key="post.id" :post="post" />
            </div>
            <div class="users" v-else>
                <div class="item" v-for="user in userList" :key="user.userId">
                    <div class="left" @click="() => gotoProfileHandler(user.userId)">
                        <img :src="user.profilePic">
                        <div class="detail">
                            <p class="name">
                                {{ user.nickname }}
                            </p>
                            <div class="info">
                                <p>
                                    {{ user.userLocation }}
                                </p>
                                <p>
                                    {{ user.userLang }}
                                </p>
                            </div>
                            <p class="fans">
                                粉丝:&nbsp;{{ user.fansNum }}
                            </p>
                        </div>
                    </div>
                    <div class="right">
                        <p class="hotness">
                            热度系数:&nbsp;{{ user.hotness }}
                        </p>
                        <p>获赞数:&nbsp;{{ user.beLikeNum }}</p>
                        <p>被收藏数:&nbsp;{{ user.beFavoriteNum }}</p>
                        <div class="btn">
                            <a-button :disabled="user.userId === currentUser.userId"
                                :type="user.isFollowing ? `default` : `primary`" @click="() => followHandler(user)">
                                {{ user.isFollowing ? `已关注` : `关注` }}
                            </a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SmileOutlined, UserOutlined } from '@ant-design/icons-vue';
import { getUserRank, getPostRank } from '../request/request';
import { follow, cancelFollowing } from '../request/friend';
import Posts from '../components/posts.vue';
import RankPost from '../components/RankPost.vue';

import { mapState } from 'vuex';

export default {
    data() {
        return {
            selectedKeys: ['post'],
            postList: [],
            userList: [],
            isLoading: true
        }
    },
    computed: {
        ...mapState(['currentUser'])
    },
    methods: {
        gotoProfileHandler(userId) {
            this.$router.push(`/profile/${userId}`)
        },
        async followHandler(user) {
            if (user.isFollowing) {
                await cancelFollowing(user.userId);
            } else {
                await follow(user.userId);
            }

            this.isLoading = true;

            getUserRank().then(res => {
                this.userList = res.data.data;

                this.userList.forEach(item => {
                    item.hotness = item.hotness.toFixed(2);
                })

                this.isLoading = false;
            })
        }
    },
    components: {
        SmileOutlined,
        UserOutlined,
        Posts,
        RankPost
    },
    mounted() {
        getPostRank().then(res => {
            console.log(res);
            this.postList = res.data.data;

            this.postList.forEach(item => {
                item.hotness = item.hotness.toFixed(2);
            })

            return getUserRank()
        }).then(res => {
            this.userList = res.data.data;

            this.userList.forEach(item => {
                item.hotness = item.hotness.toFixed(2);
            })

            this.isLoading = false;
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";

.rank {
    @include themify($themes) {
        background-color: themed('bgSoft');
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        gap: 10px;

        h1 {
            text-align: center;
        }

        .menu {
            width: 200px;
            padding-bottom: 10px;
        }

        .list {

            .users {
                display: flex;
                width: 700px;
                background-color: #fff;
            }

            .p {
                width: 700px;
                display: flex;
                flex-direction: column;
                padding: 20px 70px;
                gap: 50px;
            }

            .users {
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding-top: 20px;

                .item {
                    display: flex;
                    padding: 10px 20px;
                    justify-content: space-between;
                    border-bottom: 1px dashed #636363;

                    .left {
                        display: flex;
                        gap: 10px;
                        cursor: pointer;

                        img {
                            width: 90px;
                            height: 90px;
                            object-fit: cover;
                            border-radius: 50%;
                        }

                        p {
                            margin-bottom: 0;
                        }

                        .detail {


                            .name {
                                font-size: 20px;
                                color: #ff8200;
                                height: 40px;
                            }


                            .info {
                                display: flex;
                                gap: 10px;
                                color: #636363;
                                font-size: 16px;
                                height: 30px;
                            }

                            .fans {
                                color: #939393;
                            }
                        }
                    }

                    .right {
                        display: flex;
                        gap: 30px;
                        align-items: center;

                        .btn {
                            margin-bottom: 10px;
                        }

                        .hotness {
                            color: red;
                            padding: 5px;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }
}
</style>