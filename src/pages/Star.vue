<template>
    <div class="star">
        <h1>
            我的收藏
        </h1>
        <div v-if="isLoading" class="list">
            <a-spin />
        </div>
        <div v-else class="list">
            <Posts :resources="list" />
        </div>
    </div>
</template>

<script>
import { getStars } from '../request/post';
import Posts from '../components/posts.vue';

export default {
    data() {
        return {
            list: [],
            isLoading: true
        }
    },
    mounted() {
        getStars().then(res => {
            this.list = res.data.data;
            this.isLoading = false;
        })
    },
    components: {
        Posts
    }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";

.star {
    @include themify($themes) {
        background-color: themed('bgSoft');
        height: 100%;
        width: 100%;

        h1 {
            text-align: center;
            padding-top: 20px;
        }

        .list {
            padding: 20px 70px;
        }
    }
}
</style>