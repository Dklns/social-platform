<template>
    <div className='right-bar'>
        <div className="container">
            <div className="item">
                <span>向你推荐</span>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <span>Jane Doe</span>
                    </div>
                    <div className="buttons">
                        <button>关注</button>
                        <button>忽略</button>
                    </div>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <span>Jane Doe</span>
                    </div>
                    <div className="buttons">
                        <button>关注</button>
                        <button>忽略</button>
                    </div>
                </div>
            </div>
            <div className="item">
                <span>最新动态</span>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <p>
                            <span>Jane Doe</span> 更新了背景照片
                        </p>
                    </div>
                    <span>1 分钟前</span>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <p>
                            <span>Jane Doe</span> 更新了背景照片
                        </p>
                    </div>
                    <span>2 分钟前</span>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <p>
                            <span>Jane Doe</span> 更新了背景照片
                        </p>
                    </div>
                    <span>12 分钟前</span>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <p>
                            <span>Jane Doe</span> 更新了背景照片
                        </p>
                    </div>
                    <span>15 分钟前</span>
                </div>
            </div>
            <div className="item">
                <span>在线好友</span>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <div className="online"></div>
                        <span>Jane Doe</span>
                    </div>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <div className="online"></div>
                        <span>Jane Doe</span>
                    </div>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <div className="online"></div>
                        <span>Jane Doe</span>
                    </div>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <div className="online"></div>
                        <span>Jane Doe</span>
                    </div>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <div className="online"></div>
                        <span>Jane Doe</span>
                    </div>
                </div>
                <div className="user">
                    <div className="user-info">
                        <img src="https://cdn.jsdelivr.net/gh/Dklns/ImgHosting/Blog-PIC/wallhaven-1k97z3.png" />
                        <div className="online"></div>
                        <span>Jane Doe</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'rightBar'
}
</script>

<style lang="scss">
@import "../style.scss";

.right-bar {
    @include themify($themes) {
        flex: 3;
        position: sticky;
        top: 50px;
        height: calc(100vh - 50px);
        overflow: scroll;
        background-color: themed("bgSoft");

        &::-webkit-scrollbar {
            display: none;
        }

        @include mobile {
            display: none;
        }

        @include tablet {
            display: none;
        }

        .container {
            padding: 20px;

            .item {
                -webkit-box-shadow: -1px 5px 19px 0px rgba(194, 188, 194, 0.31);
                -moz-box-shadow: -1px 5px 19px 0px rgba(194, 188, 194, 0.31);
                box-shadow: -1px 5px 19px 0px rgba(194, 188, 194, 0.31);
                padding: 20px;
                margin-bottom: 20px;
                background-color: themed("bg");

                span {
                    color: gray;
                }

                .user {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 20px 0;

                    .user-info {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        position: relative;

                        img {
                            height: 40px;
                            width: 40px;
                            border-radius: 50%;
                            object-fit: cover;
                        }

                        .online {
                            height: 12px;
                            width: 12px;
                            border-radius: 50%;
                            background-color: limegreen;
                            position: absolute;
                            top: 0;
                            left: 30px;
                        }

                        p {
                            color: themed("textColorSoft");
                        }

                        span {
                            font-weight: 500;
                            color: themed("textColor");
                        }
                    }

                    .buttons {
                        display: flex;
                        align-items: center;
                        gap: 10px;

                        button {
                            border: none;
                            padding: 5px;
                            color: white;
                            cursor: pointer;

                            &:first-child {
                                background-color: #5271ff;
                            }

                            &:last-child {
                                background-color: #f0544f;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>