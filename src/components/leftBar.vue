<template>
    <div className='left-bar'>
        <div className="container">
            <div className="menu">
                <div className="user">
                    <img :src="currentUser.profilePic" />
                    <span>{{ currentUser.name }}</span>
                </div>
                <div className=" item">
                    <img :src="Friends" />
                    <span>Friends</span>
                </div>
                <div className="item">
                    <img :src="Groups" />
                    <span>Groups</span>
                </div>
                <div className="item">
                    <img :src="Market" />
                    <span>Market</span>
                </div>
                <div className="item">
                    <img :src="Watch" />
                    <span>Watch</span>
                </div>
                <div className="item">
                    <img :src="Memories" />
                    <span>Memories</span>
                </div>

            </div>
            <hr />
            <div className="menu">
                <span>Your shortcuts</span>
                <div className="item">
                    <img :src="Events" />
                    <span>Events</span>
                </div>
                <div className="item">
                    <img :src="Gaming" />
                    <span>Gaming</span>
                </div>
                <div className="item">
                    <img :src="Gallery" />
                    <span>Gallery</span>
                </div>
                <div className="item">
                    <img :src="Video" />
                    <span>Video</span>
                </div>
                <div className="item">
                    <img :src="Message" />
                    <span>Message</span>
                </div>
            </div>
            <hr />
            <div className="menu">
                <span>Others</span>
                <div className="item">
                    <img :src="Fundraiser" />
                    <span>Fundraiser</span>
                </div>
                <div className="item">
                    <img :src="Tutorials" />
                    <span>Tutorials</span>
                </div>
                <div className="item">
                    <img :src="Courses" />
                    <span>Courses</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Friends from '../assets/imgs/泡泡.png';
import Groups from '../assets/imgs/蛋糕.png';
import Gallery from '../assets/imgs/相机.png';
import Watch from '../assets/imgs/眼睛.png';
import Memories from '../assets/imgs/闹钟.png';
import Market from '../assets/imgs/购物.png';
import Events from '../assets/imgs/风筝.png';
import Gaming from '../assets/imgs/纸飞机.png';
import Video from '../assets/imgs/礼花.png';
import Message from '../assets/imgs/对话框.png';
import Fundraiser from '../assets/imgs/花.png';
import Tutorials from '../assets/imgs/彩铅.png';
import Courses from '../assets/imgs/煎蛋.png';

import { mapState } from 'vuex';

export default {
    name: 'leftBar',
    data() {
        return {
            Friends,
            Groups,
            Gallery,
            Watch,
            Memories,
            Market,
            Events,
            Gaming,
            Video,
            Message,
            Fundraiser,
            Tutorials,
            Courses,
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.currentUser
        })
    }
}
</script>

<style lang="scss">
@import "../style.scss";

img {
    width: 30px;
}


.left-bar {
    @include themify($themes) {
        flex: 2;
        position: sticky;
        top: 50px;
        height: calc(100vh - 50px);
        overflow: scroll;
        background-color: themed("bg");
        color: themed('textColor');

        &::-webkit-scrollbar {
            display: none;
        }

        @include mobile {
            display: none;
        }

        .container {
            padding: 20px;

            hr {
                margin: 20px 0;
                border: none;
                height: .5px;
                background-color: themed("border");
            }

            .menu {
                display: flex;
                flex-direction: column;
                gap: 20px;

                span {
                    font-size: 12px;
                }

                .user {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    img {
                        height: 30px;
                        border-radius: 50%;
                        object-fit: cover;
                    }

                    span {
                        font-size: 14px;
                    }
                }

                .item {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    span {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>