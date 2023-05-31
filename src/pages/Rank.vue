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
    </div>
</template>

<script>
import { SmileOutlined, UserOutlined } from '@ant-design/icons-vue';

export default {
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        SmileOutlined,
        UserOutlined
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
    }
}
</style>