<template>
    <div className="shop">
        <div className="itemList">
            <ul>
                <li>
                    <shopItemVue />
                </li>
                <li>
                    <shopItemVue />
                </li>
                <li>
                    <shopItemVue />
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import shopItemVue from '../components/shopItem.vue'

export default {
    name: 'shop',
    components: {
        shopItemVue
    }
}
</script>
<style lang="scss">
@import '../style.scss';

.shop {
    @include themify($themes) {
        // -webkit-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
        // -moz-box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
        // box-shadow: -14px 8px 55px -27px rgba(0, 0, 0, 0.37);
        // border-radius: 20px;
        background-color: themed("bgSoft");
        // color: themed("textColor");

        /* background-color: themed('bgSoft'); */
        height: 100%;

        .itemList {
            ul {
                list-style: none;
            }
        }

    }
}
</style>