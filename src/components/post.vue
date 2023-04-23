<template>
    <div className="post">
        <div className="container">
            <div className="user">
                <div className="user-info">
                    <img :src="post.profilePic" />
                    <div className="details">
                        <router-link :to="`/profile/${post.userId}`">
                            <span className='name'>{{ post.name }}</span>
                        </router-link>
                        <span className='date'>1 min ago</span>
                    </div>
                </div>
                <!-- <i className='iconfont more' onClick={()=> setOpenMenu(!openMenu)}>&#xe719;</i>
                {openMenu && post.userId === currentUser.id && <button onClick={handleDelete}>delete</button>} -->
            </div>
            <div className="content">
                <p>{{ post.desc }}</p>
                <img :src="post.img" alt="" />
            </div>
            <div className="info">
                <div className="item">
                    <!-- {isLoading ? 'isLoading' : (data.includes(currentUser.id)) ?
                    (<i className='iconfont like' style={{color:'red'}} onClick={handleLike}>&#xe8c3;</i>)
                    : (<i className='iconfont like' onClick={handleLike}>&#xeca1;</i>)}
                    {data?.length} Likes -->
                    <i className='iconfont like' :style="{ color: 'red' }">&#xe8c3;</i> 0 Likes
                </div>
                <div className="item" @click="() => openComment = !openComment">
                    <i className="iconfont comments">&#xe6ad;</i>
                    12 Comments
                </div>
                <div className="item">
                    <i className="iconfont share">&#xe739;</i>
                    Share
                </div>
            </div>
            <Comment v-if="openComment" :postId="post.id" />
        </div>
    </div>
</template>

<script>
import Comment from './comment.vue';

export default {
    props: ['post'],
    data() {
        return {
            openComment: false
        }
    },
    components: {
        Comment
    }
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