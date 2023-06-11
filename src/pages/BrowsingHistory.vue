<template>
    <div class="history">
        <h1>历史记录</h1>
        <div class="container">
            <div class="list" v-if="isLoading">
                <a-spin />
            </div>
            <div v-else class="list">
                <div class="btn">
                    <a-button danger @click="deleteAllHandler" v-if="list.length > 0">
                        删除所有记录
                    </a-button>
                </div>
                <div class="item" v-for="item in list" :key="item.time">
                    <p class="time">
                        {{ item.time }}
                    </p>
                    <img :src="item.profilePic">
                    <p>
                        {{ item.nickname }}
                    </p>
                    <p class="content" @click="() => searchHandler(item.content)">
                        {{ item.content }}
                    </p>
                    <div class="more">
                        <a-dropdown placement="bottomRight">
                            <more-outlined />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="() => deleteHandler(item.id)">
                                        删除记录
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getHistory, deleteHistory, deleteAllHistory } from '../request/history';
import { MoreOutlined } from '@ant-design/icons-vue';

export default {
    data() {
        return {
            list: [],
            isLoading: true
        }
    },
    components: {
        MoreOutlined
    },
    methods: {
        deleteHandler(id) {
            this.isLoading = true
            deleteHistory(id).then(res => {
                console.log(res);
                getHistory().then(res => {
                    this.list = res.data.data;
                    this.isLoading = false;
                })
            })
        },
        deleteAllHandler() {
            this.isLoading = true;
            deleteAllHistory().then(res => {
                console.log(res);
                getHistory().then(res => {
                    this.list = res.data.data;
                    this.isLoading = false;
                })
            })
        },
        searchHandler(query) {
            this.$router.push(`/search/${query}`);
        }
    },
    mounted() {
        getHistory().then(res => {
            console.log(res);
            this.list = res.data.data;
            this.isLoading = false;
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
        padding-top: 10px;
        flex-direction: column;
        align-items: center;

        .container {
            width: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0 0 10px 2px rgba(0, 0, 0, .2);
            height: 100%;
            padding-top: 20px;

            .list {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 30px;


                .btn {
                    display: flex;
                    justify-content: flex-end;
                    padding-right: 30px;
                }

                .item {
                    display: flex;
                    width: 100%;
                    padding: 10px 30px;
                    gap: 30px;
                    align-items: center;
                    position: relative;

                    p {
                        margin-bottom: 0;
                    }

                    .time {
                        color: #666;
                    }

                    .content {
                        max-width: 200px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        &:hover {
                            color: #1890ff;
                            cursor: pointer;
                        }
                    }

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        object-fit: cover;
                    }

                    .more {
                        position: absolute;
                        top: 30%;
                        right: 20px;
                        font-size: 20px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>