<template>
    <div :className="`app theme-${darkMode ? 'dark' : 'light'}`">
        <NavBar />
        <div :style="{ display: 'flex', padding: 0 }">
            <LeftBar />
            <div :style="{ flex: 6 }">
                <router-view />
            </div>
            <RightBar />
        </div>
    </div>
</template>


<script>
import NavBar from '../components/navBar.vue';
import LeftBar from '../components/leftBar.vue';
import RightBar from '../components/rightBar.vue';

import { mapState } from 'vuex';

export default {
    name: 'layout',
    components: {
        NavBar,
        LeftBar,
        RightBar,
    },
    computed: {
        ...mapState({
            darkMode: state => state.darkMode
        })
    }
}
</script>