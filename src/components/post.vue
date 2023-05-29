<template>
    <div className="post" ref="post">
        <div className="container">
            <div className="user">
                <div className="user-info">
                    <img :src="post.profilePic" />
                    <div className="details">
                        <router-link :to="`/profile/${post.userId}`">
                            <span className='name'>{{ post.name }}</span>
                        </router-link>
                        <span className='date'>
                            {{ post.date }}
                        </span>
                    </div>
                </div>
                <a-dropdown placement="bottom" v-if="post.userId === currentUser.userId">
                    <div class="more">
                        <EllipsisOutlined />
                    </div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <div class="delete" @click="deleteHandler">
                                    删除
                                </div>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
            <div className="content">
                <p>{{ post.content }}</p>
                <img :src="post.img" alt="" />
            </div>
            <div className="info">
                <div className="item" @click="likeHandler">
                    <heart-outlined v-if="isLike" :style="{ color: 'red' }" />
                    <heart-outlined v-else />
                    <span>
                        {{ likeNum }} 点赞
                    </span>
                </div>
                <div className="item" @click="() => openComment = !openComment">
                    <i className="iconfont comments">&#xe6ad;</i>
                    <span>
                        {{ commentNum }} 评论
                    </span>
                </div>
                <div className="item">
                    <ShareAltOutlined />
                    <span>
                        分享
                    </span>
                </div>
            </div>
            <Comment v-if="openComment" :postId="post.postId" @send="sendHandler" :userId="post.userId"
                @delete="deleteCommentHandler" />
        </div>
    </div>
</template>

<script>
import Comment from './comment.vue';
import { EllipsisOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons-vue';
import { like, cancelLike, deletePost, getAllPost, getPostByUserId } from '../request/post';
import { addHistory } from '../request/history';

import { mapState } from 'vuex';

export default {
    props: ['post'],
    data() {
        return {
            openComment: false,
            likeNum: this.post.likeNum || 0,
            isLike: this.post.isLike,
            commentNum: this.post.commentNum
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser
        })
    },
    methods: {
        likeHandler() {
            if (this.isLike) {
                this.likeNum -= 1;
                cancelLike(this.post.postId)
            } else {
                this.likeNum += 1;
                like(this.post.postId)
            }
            this.isLike = !this.isLike;
        },
        async deleteHandler() {
            await deletePost(this.post.postId);
            let res;
            console.log(this.$route.path.includes("profile"));
            if (this.$route.path.includes("profile")) {
                res = await getPostByUserId(this.$store.state.currentUser.userId);
            } else {
                res = await getAllPost();
            }

            this.$store.commit("setHomePosts", res.data.data);
        },
        sendHandler() {
            this.commentNum++;
        },
        deleteCommentHandler() {
            this.commentNum--;
        },
    },
    components: {
        Comment,
        EllipsisOutlined,
        HeartOutlined,
        ShareAltOutlined
    },
    mounted() {
        console.log(this.post);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 当元素进入视口范围时触发
                    addHistory(this.post.postId);
                }
            });
        });

        observer.observe(this.$refs.post);
    },
}
</script>

<style lang="scss">
@import '../style.scss';

@font-face {
    font-family: 'iconfont';
    /* Project id 3591478 */
    src: url('//at.alicdn.com/t/c/font_3591478_qgl1ezx8v2r.woff2?t=1679556339249') format('woff2'),
        url('//at.alicdn.com/t/c/font_3591478_qgl1ezx8v2r.woff?t=1679556339249') format('woff'),
        url('//at.alicdn.com/t/c/font_3591478_qgl1ezx8v2r.ttf?t=1679556339249') format('truetype');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

.post {
    @include themify($themes) {
        -webkit-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
        -moz-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
        box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
        border-radius: 20px;
        background-color: themed("bg");
        color: themed("textColor");


        a {
            color: inherit;
        }

        .container {
            padding: 20px;

            .user {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;

                .user-info {
                    display: flex;
                    gap: 20px;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        object-fit: cover;
                    }

                    .details {
                        display: flex;
                        flex-direction: column;

                        .name {
                            font-weight: 500;
                        }

                        .date {
                            font-size: 12px;
                        }
                    }
                }

                .more {
                    width: 20px;
                    height: 20px;
                    font-size: 20px;
                    cursor: pointer;
                }

                .delete {
                    height: 30px;
                    line-height: 30px;
                    width: 40px;
                    color: #999;
                }

                button {
                    position: absolute;
                    top: 30px;
                    right: 0;
                    border: none;
                    background-color: red;
                    color: white;
                    cursor: pointer;
                    padding: 5px;
                }
            }

            .content {
                margin: 20px 0;

                img {
                    width: 100%;
                    max-height: 500px;
                    object-fit: contain;
                    margin-top: 20px;
                }
            }

            .info {
                display: flex;
                align-items: center;
                gap: 20px;

                .item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>