<template>
    <div className="comments">
        <div className="write">
            <img :src="currentUser.profilePic" alt="profilePic" />
            <input type="text" placeholder='write a comment' v-model="desc" />
            <button @click="sendCommentHandler">Send</button>
        </div>
        <p v-if="isLoading">isLoading...</p>
        <div v-else className="comment" v-for="comment in comments" :key="comment.id">
            <img :src="comment.profilePic" class="comment-profilePic" alt="" />
            <div className="comment-body">
                <span class="comment-name">{{ comment.name }}</span>
                <p class="comment-desc">{{ comment.desc }}</p>
                <div class="comment-info">
                    <span className='date'>2023-04-22 13:19</span>
                    <span class="comment-like">
                        <like-outlined />
                        7
                    </span>
                    <span class="reply">
                        回复
                    </span>
                </div>
            </div>
            <div v-for="subComment in comment.subComments" class="sub-comment" :key="subComment.id">
                <img :src="subComment.profilePic" class="sub-comment-profilePic" alt="" />
                <div className="sub-comment-body">
                    <span class="sub-comment-name">{{ subComment.name }}</span>
                    <p class="sub-comment-desc">{{ subComment.desc }}</p>
                    <div class="sub-comment-info">
                        <span className='sub-date'>2023-04-22 13:19</span>
                        <span class="sub-comment-like">
                            <like-outlined />
                            1
                        </span>
                        <span class="sub-reply">
                            回复
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getComments, sendComment } from '../query/queries';
import { LikeOutlined } from '@ant-design/icons-vue';

import { mapState } from 'vuex';

export default {
    name: 'comment',
    props: ["postId"],
    data() {
        return {
            desc: "",
            comments: [],
            isLoading: true,
        }
    },
    components: {
        LikeOutlined
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser
        })
    },
    methods: {
        sendCommentHandler() {
            sendComment({
                userId: this.currentUser.id,
                postId: this.postId,
                desc: this.desc
            })
        }
    },
    mounted() {
        getComments(this.postId).then(res => {
            this.comments = res;
            this.isLoading = false;
        });
    }
}
</script>

<style lang="scss">
@import '../style.scss';

.comments {
    @include themify($themes) {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }

        .write {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin: 20px 0px;

            input {
                flex: 5;
                padding: 10px;
                border: 1px solid themed('border');
                background-color: transparent;
                color: themed('textColor');
            }

            button {
                border: none;
                background-color: #5271ff;
                color: #fff;
                padding: 10px;
                cursor: pointer;
                border-radius: 3px;
            }
        }

        .comment {
            display: flex;
            margin: 30px 0;
            padding-left: 50px;
            justify-content: flex-start;
            flex-direction: column;
            gap: 20px;
            position: relative;

            .comment-profilePic {
                position: absolute;
                top: 0;
                left: 0;
            }

            .comment-body {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 5px;

                .comment-name {
                    font-weight: 500;
                    font-size: 16px;
                }

                .comment-desc {
                    color: themed('textColorSoft');
                    font-size: 20px;
                    margin: 0;
                }

                .comment-info {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: gray;
                    font-size: 12px;
                    gap: 20px;
                    height: 20px;

                    .date {
                        line-height: 20px;
                        display: flex;
                        align-self: center;
                    }

                    .comment-like {
                        line-height: 20px;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                    }

                    .reply {
                        line-height: 20px;
                    }
                }
            }

            .sub-comment {
                display: flex;
                padding-left: 50px;
                justify-content: flex-start;
                flex-direction: column;
                gap: 20px;
                position: relative;

                .sub-comment-profilePic {
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                .sub-comment-body {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 5px;

                    .sub-comment-name {
                        font-weight: 500;
                        font-size: 16px;
                    }

                    .sub-comment-desc {
                        color: themed('textColorSoft');
                        font-size: 20px;
                        margin: 0;
                    }

                    .sub-comment-info {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        color: gray;
                        font-size: 12px;
                        gap: 20px;
                        height: 20px;

                        .sub-date {
                            line-height: 20px;
                            display: flex;
                            align-self: center;
                        }

                        .sub-comment-like {
                            line-height: 20px;
                            font-size: 14px;
                            display: flex;
                            align-items: center;
                        }

                        .sub-reply {
                            line-height: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>