<script setup>
import { getSinglePost } from '../request/post';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Detail from '../components/post.vue';

const route = useRoute();
const state = reactive({
    isLoading: true,
    post: {}
})

onMounted(async () => {
    const postId = route.params.postId;

    try {
        const res = await getSinglePost(postId);

        const { data } = res.data;
        state.post = data;
    } catch (error) {
        console.log(error);
    } finally {
        state.isLoading = false;
    }
})

</script>

<template>
    <div class='post-page'>
        <a-spin v-if="state.isLoading" />
        <Detail v-else :post="state.post" />
    </div>
</template>

<style lang='scss' scoped>
.post-page {
    position: relative;
    padding: 50px;
}
</style>