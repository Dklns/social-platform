<template>
    <div class="friend-excerpt">
        <div class="left" @click="() => gotoProfileHandler(friend.userId)">
            <div class="friend-profilePic">
                <img :src="friend.profilePic" alt="">
            </div>
            <div class="friend-info">
                <p class="friend-name">{{ friend.nickname }}</p>
                <div class="sub-info">
                    <span>{{ friend.userLocation }}</span>
                    <span>{{ friend.userLang }}</span>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="send">
                <button>
                    <send-outlined />
                </button>
            </div>
            <div class="follow-button">
                <button v-if="isShowFollowingList" @click="cancelFollowingHandler">
                    <span>
                        <menu-outlined />已关注
                    </span>
                </button>
                <button v-else-if="friend.isFollowing" @click="cancelFollowingHandler">
                    <span>
                        <menu-outlined />已互关
                    </span>
                </button>
                <button v-else :style="{ backgroundColor: `#fff` }" @click="followHandler">
                    <span>
                        <check-outlined />关注
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { follow, cancelFollowing, getFollowedUsers, getFollowers } from '../request/friend';
import { MenuOutlined, CheckOutlined, SendOutlined } from '@ant-design/icons-vue';

export default {
    name: 'friendExcerpt',
    props: ["friend", "isShowFollowingList"],
    components: {
        MenuOutlined,
        CheckOutlined,
        SendOutlined
    },
    methods: {
        gotoProfileHandler(userId) {
            this.$router.push(`/profile/${userId}`)
        },
        async cancelFollowingHandler() {
            await cancelFollowing(this.friend.userId);
            this.refresh();
        },
        async followHandler() {
            await follow(this.friend.userId);
            this.refresh();
        },
        async refresh() {
            console.log('test');
            let res = await getFollowedUsers();
            const followingList = res.data.data;
            res = await getFollowers();
            const followerList = res.data.data;
            this.$emit("setList", {
                followerList,
                followingList
            })
        }
    },
}

</script>

<style lang="scss">
@import "../style.scss";

.friend-excerpt {
    @include themify($themes) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid themed('border');
        border-radius: 20px;

        .left {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;

            .friend-profilePic {
                img {
                    height: 50px;
                    width: 50px;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }

            .friend-info {
                display: flex;
                flex-direction: column;

                .friend-name {
                    font-size: 20px;
                    color: pink;
                    margin: 0;
                }

                .sub-info {
                    display: flex;
                    color: gray;
                    gap: 10px;
                }
            }
        }

        .right {
            display: flex;
            gap: 20px;
            align-items: center;

            .send {
                button {
                    border: none;
                    background-color: inherit;
                    font-size: 20px;
                    cursor: pointer;
                }
            }

            .follow-button {
                width: 80px;
                cursor: pointer;

                button {
                    border: 1px solid transparent;
                    border-radius: 10px;
                    background-color: #e5e9ef;
                    cursor: pointer;

                    span {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>