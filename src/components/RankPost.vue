<script setup>
import { FireOutlined } from '@ant-design/icons-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4115412_gnwzgoky8mn.js',
});

const { post } = defineProps(['post']);

const gotoSinglePost = () => {
    router.push(`/post/${post.postId}`).then(() => {
        window.scrollTo(0, 0);
    })
}

</script>

<template>
    <div class='rank-post'>
        <div class="top">
            <div className="user">
                <div className="user-info">
                    <img :src="post.profilePic" />
                    <div className="details">
                        <router-link :to="`/profile/${post.userId}`">
                            <span className='name'>{{ post.nickname }}</span>
                        </router-link>
                        <span className='date'>
                            {{ post.postTime }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="factors">
                <p class="factor">
                    <fire-outlined class="hot" :style="{ fontSize: `18px`, marginRight: `10px` }" />热度系数:
                    {{ post.hotness }}
                </p>
                <p class="factor">
                    <icon-font type="icon-31dianzan" class="icon like" />点赞数:
                    {{ post.likeNum }}
                </p>
                <p class="factor">
                    <icon-font type="icon-shoucang" class="icon" />收藏数:
                    {{ post.favoriteNum }}
                </p>
                <p class="factor">
                    <icon-font type="icon-pinglun" class="icon" />评论数:
                    {{ post.commentNum }}
                </p>
            </div>
        </div>
        <div class="content">
            <p @click="gotoSinglePost">
                {{ post.content }}
            </p>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.rank-post {
    width: 100%;
    -webkit-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
    -moz-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
    box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
    border-radius: 20px;
    padding: 20px;

    .top {
        display: flex;
        gap: 20px;
        align-items: center;

        .user {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            .user-info {
                display: flex;
                gap: 20px;

                img {
                    width: 50px;
                    height: 50px;
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
        }

        .factors {
            display: flex;
            flex-wrap: wrap;
            column-gap: 20px;
            align-items: center;
            padding-top: 10px;

            .factor {
                width: 40%;

                .hot {
                    color: red;
                }

                .icon {
                    font-size: 20px;
                    margin-right: 10px;

                    &.like {
                        color: yellow;
                    }
                }
            }
        }
    }

    .content {
        margin-top: 20px;

        p {
            line-height: 2em;
            cursor: pointer;
        }
    }

}
</style>