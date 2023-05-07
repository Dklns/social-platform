<template>
    <div className="posts">
        <p v-if="error">
            {{ error }}
        </p>
        <!-- <p v-else-if="isLoading">
            isLoading...........
        </p> -->
        <loadingMark v-else-if="isLoading" />
        <Post v-else v-for="post in posts" :post="post" :key="post.id" />
    </div>
</template>

<script>
import { getAllPost, getPostByUserId } from '../request/request';

import Post from './post.vue';
import loadingMark from './loadingMark.vue'

export default {
    props: ["userId"],
    data() {
        return {
            isLoading: true,
            posts: [],
            error: "",
        }
    },
    components: {
        Post,
        loadingMark
    },
    mounted() {
        if (this.userId) {
            getPostByUserId().then(res => {
                this.posts = res;
                this.isLoading = false;
            }, reason => {
                this.error = reason;
            })
        } else {
            getAllPost().then(res => {
                this.posts = res;
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
}
</style>