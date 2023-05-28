<template>
    <div class="history">

    </div>
</template>

<script>
import { getHistory } from '../request/history';

export default {
    data() {
        return {

        }
    },
    mounted() {
        getHistory().then(res => {
            console.log(res);
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../style.scss';

.history {
    @include themify($themes) {
        background-color: themed('bgSoft');
        height: 100%;
        display: flex;
        justify-content: center;
    }
}
</style>