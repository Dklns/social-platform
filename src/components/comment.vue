<template>
    <div className="comments">
        <div className="write">
            <img :src="currentUser.profilePic" alt="profilePic" />
            <input type="text" placeholder='输入评论内容' v-model="content" />
            <button @click.prevent="sendCommentHandler" :disabled="!content">发送</button>
        </div>
        <loadingMark v-if="isLoading" />
        <div v-else className="comment" v-for="comment in comments" :key="comment.id">
            <img :src="comment.profilePic" class="comment-profilePic" alt="" />
            <div className="comment-body">
                <span class="comment-name">{{ comment.name }}</span>
                <p class="comment-desc">{{ comment.content }}</p>
                <div class="comment-info">
                    <span className='date'>
                        {{ comment.createAt }}
                    </span>
                    <span class="comment-like" @click="() => likeHandler(comment.isLike, comment.id)">
                        <like-outlined v-if="!comment.likeNum" />
                        <LikeOutlined v-else :style="{ color: `red` }" />
                        {{ comment.likeNum }}
                    </span>
                    <span class="reply" @click="() => openReplyHandler(`parent`, comment.id)">
                        回复
                    </span>
                </div>
            </div>
            <div className="write" v-if="openReply && selectedComment === comment.id">
                <img :src="currentUser.profilePic" alt="profilePic" />
                <input type="text" placeholder='输入评论内容' v-model="comContent" />
                <button @click.prevent="() => replyComment(comment.id)" :disabled="!comContent">发送</button>
            </div>
            <div v-for="subComment in comment.subComment" class="sub-comment" :key="subComment.id">
                <img :src="subComment.profilePic" class="sub-comment-profilePic" alt="" />
                <div className="sub-comment-body">
                    <span class="sub-comment-name">{{ subComment.name }}</span>
                    <p class="sub-comment-desc">{{ subComment.content }}</p>
                    <div class="sub-comment-info">
                        <span className='sub-date'>
                            {{ subComment.createAt }}
                        </span>
                        <span class="sub-comment-like" @click="() => likeHandler(subComment.isLike, subComment.id)">
                            <like-outlined v-if="!subComment.likeNum" />
                            <LikeOutlined v-else :style="{ color: `red` }" />
                            {{ subComment.likeNum }}
                        </span>
                        <span class="sub-reply" @click="() => openReplyHandler(`sub`, subComment.id)">
                            回复
                        </span>
                    </div>
                </div>
                <div className="write" v-if="openSubReply && selectedComment === subComment.id">
                    <img :src="currentUser.profilePic" alt="profilePic" />
                    <input type="text" placeholder='输入评论内容' v-model="comContent" />
                    <button @click.prevent="() => replyComment(subComment.id)" :disabled="!comContent">发送</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getComments, sendComment, likeComment, cancelLikeComment } from '../request/post';
import { LikeOutlined } from '@ant-design/icons-vue';

import { mapState } from 'vuex';

import loadingMark from './loadingMark.vue';

export default {
    name: 'comment',
    props: ["postId"],
    data() {
        return {
            content: "",
            comContent: "",
            comments: [],
            isLoading: true,
            selectedComment: -1,
            openReply: false,
            openSubReply: false,
            selectedComment: -1,
            selectedSubComment: -1
        }
    },
    components: {
        LikeOutlined,
        loadingMark
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser
        })
    },
    methods: {
        sendCommentHandler(e) {
            e.preventDefault();

            sendComment({
                postId: this.postId,
                content: this.content
            }).then(() => {
                this.content = "";
                getComments(this.postId).then(res => {
                    this.comments = res.data.data
                    this.isLoading = false;
                });
            });

        },
        openReplyHandler(type, commentId) {
            this.selectedComment = commentId
            if (type === 'parent') {
                this.openReply = !this.openReply;
            } else {
                this.openSubReply = !this.openSubReply;
            }
        },
        replyComment(commentId) {
            if (!this.comContent) {
                return
            }
            sendComment({
                postId: this.postId,
                content: this.comContent,
                commentId
            }).then(() => {
                this.content = "";
                getComments(this.postId).then(res => {
                    this.comments = res.data.data
                    this.isLoading = false;
                });
            });
            this.comContent = "";
        },
        likeHandler(isLike, commentId) {
            if (isLike) {
                cancelLikeComment(commentId).then(() => {
                    getComments(this.postId).then(res => {
                        this.comments = res.data.data
                        this.isLoading = false;
                    });
                })
            } else {
                likeComment(commentId).then(() => {
                    getComments(this.postId).then(res => {
                        this.comments = res.data.data
                        this.isLoading = false;
                    });
                })
            }

        }
    },
    mounted() {
        getComments(this.postId).then(res => {
            console.log(res);
            this.comments = res.data.data
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

            [class*=like] {
                cursor: pointer;
            }

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
                        cursor: pointer;
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
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
</style>