<template>
    <div className="posts">
        <p v-if="error">
            {{ error }}
        </p>
        <loadingMark v-else-if="isLoading" />
        <div v-else-if="code === 604" class="empty">
            <div v-if="currentUser.userId === userId" class="content">
                您还没发布过帖子
            </div>
            <div v-else class="content">
                该用户还没有发布过帖子
            </div>
        </div>
        <Post v-else v-for="post in posts" :post="post" :key="post.id" />
    </div>
</template>

<script>
import { getAllPost, getPostByUserId } from '../request/post';

import Post from './post.vue';
import loadingMark from './loadingMark.vue'

import { mapState } from 'vuex';
import store from '../store/store';

export default {
    props: ["userId"],
    data() {
        return {
            isLoading: true,
            error: "",
            code: ""
        }
    },
    components: {
        Post,
        loadingMark
    },
    computed: {
        ...mapState({
            posts: state => state.homePosts,
            currentUser: state => state.currentUser
        })
    },
    mounted() {
        if (this.userId) {
            getPostByUserId(this.userId).then(res => {
                this.code = res.data.code;
                store.commit("setHomePosts", res.data.data);
                this.isLoading = false;
            }, reason => {
                this.error = reason;
            })
        } else {
            getAllPost().then(res => {
                store.commit("setHomePosts", res.data.data);
                this.isLoading = false;
            }, reason => {
                this.error = reason;
            })
        }
    }
}
</script>

<style lang="scss">
.posts {
    display: flex;
    flex-direction: column;
    gap: 50px;

    .empty {
        display: flex;
        justify-content: center;

        .content {
            font-size: 20px;
        }
    }
}
</style>