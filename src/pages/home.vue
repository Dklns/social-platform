<template>
    <div class="home">
        <share />
        <posts />
    </div>
</template>

<script>
import Share from '../components/share.vue';
import Posts from '../components/posts.vue'

export default {
    name: 'home',
    components: {
        Share,
        Posts
    }
}
</script>

<style lang="scss">
@import "../style.scss";

.home {
    @include themify($themes) {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding: 20px 70px;
        background-color: themed("bgSoft");
        min-height: 100vh;

        @include mobile {
            padding: 10px;
        }

        @include tablet {
            padding: 20px;
        }
    }
}
</style>