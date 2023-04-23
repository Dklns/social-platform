<template>
    <div className="posts">
        <p v-if="error">
            {{ error }}
        </p>
        <p v-else-if="isLoading">
            isLoading...........
        </p>
        <Post v-else v-for="post in posts" :post="post" :key="post.id" />
    </div>
</template>

<script>
import { getAllPost, getPostByUserId } from '../query/queries';

import Post from './post.vue';

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
        Post
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