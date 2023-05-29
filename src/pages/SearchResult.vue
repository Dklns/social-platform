<template>
    <div class="search-result">
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
        <div class="content" v-if="isLoading">
            <a-spin />
        </div>
        <div class="content" v-else>
            <div class="posts" v-if="selectedKeys[0] === `post`">
                <Posts :searchResult="posts" />
            </div>
            <div class="users" v-else>
                <div class="item" v-for="user in users" :key="user.userId">
                    <UserExcerpt :friend="user" :isShowFollowingList="false" @setList="setUsersHandler" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { search } from '../request/request';
import { SmileOutlined, UserOutlined } from '@ant-design/icons-vue';
import Posts from '../components/posts.vue';
import UserExcerpt from '../pages/excerpt.vue';


export default {
    data() {
        return {
            posts: [],
            users: [],
            selectedKeys: ['post'],
            isLoading: true
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                if (to.path.includes('search')) {
                    const query = to.params.query;
                    this.isLoading = true;
                    search(query).then(res => {
                        this.isLoading = false;
                        console.log(res.data.data);
                        const { posts, users } = res.data.data;
                        this.posts = posts;
                        this.users = users;
                    })
                }
            }
        }
    },
    components: {
        SmileOutlined,
        UserOutlined,
        Posts,
        UserExcerpt
    },
    methods: {
        setUsersHandler() {
            const query = this.$route.params.query;
            this.isLoading = true;
            search(query).then(res => {
                this.isLoading = false;
                const { users } = res.data.data;
                this.users = users;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";

.search-result {
    @include themify($themes) {
        background-color: themed('bgSoft');
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        gap: 50px;

        .menu {
            width: 200px;
        }

        .content {
            .users {
                .item {
                    width: 600px;
                }
            }
        }
    }
}
</style>