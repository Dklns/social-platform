<template>
    <div class="notice">
        <h3>消息列表</h3>
        <div class="list">
            <div class="item" v-for="item in list" :key="item.userId" @click="() => chatHandler(item.userId)">
                <div class="left">
                    <div class="img-container">
                        <img :src="item.profilePic" />
                    </div>
                </div>
                <div class="right">
                    <p class="name">{{ item.nickname }}</p>
                    <p class="message">{{ item.latestMsg }}</p>
                    <p class="time">
                        {{ item.latestTime }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNotifications } from '../request/request';
import { moment } from '../utils';

export default {
    data() {
        return {
            list: [],
        }
    },
    methods: {
        chatHandler(userId) {
            this.$router.push(`/chat/${userId}`);
        }
    },
    mounted() {
        getNotifications().then(res => {
            console.log(res.data.data);
            console.log(res.data.data);
            this.list = res.data.data;
            this.list.forEach(item => {
                item.latestTime = moment(item.latestTime).fromNow();
            })
        })
    }
}
</script>

<style lang="scss" scoped>
.notice {
    h3 {
        text-align: center;
        margin-bottom: 30px;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .item {
            display: flex;
            gap: 20px;
            cursor: pointer;


            .left {
                flex: 1;

                .img-container {
                    width: 60px;
                    height: 60px;

                    img {
                        height: 100%;
                        width: 100%;
                        border-radius: 50%;
                        object-fit: contain;
                    }
                }
            }

            .right {
                flex: 4;
                padding-top: 10px;
                width: 100%;
                position: relative;

                .name {
                    font-weight: bold;
                }

                .message {
                    color: '#999';
                    font-size: 13px;
                }

                .time {
                    position: absolute;
                    right: 0;
                    top: 10px;
                    font-size: 13px;
                    color: '#666';
                }
            }
        }
    }
}
</style>
