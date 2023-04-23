<template>
    <div class="friends">
        <div class="friends-navbar">
            <span :class="{ active: isShowFollowingList }" @click="listToggleHandler">关注</span>
            <span :class="{ active: !isShowFollowingList }" @click="listToggleHandler">粉丝</span>
        </div>
        <div class="following-search-container">
            <div class="following-search">
                <search-outlined class="icon" />
                <input type="type" placeholder="搜索我的关注">
            </div>
        </div>
    </div>
</template>

<script>
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
    name: "friends",
    data() {
        return {
            isShowFollowingList: true
        }
    },
    components: {
        SearchOutlined
    },
    methods: {
        listToggleHandler() {
            this.isShowFollowingList = !this.isShowFollowingList;
        }
    }
}
</script>

<style lang="scss">
@import '../style.scss';

.friends {
    @include themify($themes) {
        background-color: themed('bgSoft');
        height: 100%;


        .friends-navbar {
            height: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 3px solid themed('border');

            span {
                color: #6e6e6e;
                padding: 10px;

                &.active {
                    color: #fcabc1;
                    border-bottom: 3px solid #fcabc1;
                }
            }
        }

        .following-search-container {
            display: flex;
            justify-content: center;
            margin-top: 10px;
            padding: 10px 0;
            background-color: themed('bgSoft');
            border-bottom: 3px solid themed('border');

            .following-search {
                width: 50%;
                position: relative;

                .icon {
                    position: absolute;
                    left: 15px;
                    margin-top: 15px;
                }

                input {
                    height: 40px;
                    padding: 0 40px;
                    color: themed('textColorSoft');
                    width: 100%;
                    border: none;
                    border-radius: 20px;
                }
            }
        }
    }
}
</style>