import { createApp } from 'vue'
import './style.scss'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import Layout from './pages/layout.vue';
import Home from './pages/home.vue';
import Login from './pages/login.vue';
import Register from './pages/register.vue';
import Profile from './pages/profile.vue';
import Friends from './pages/friends.vue';
import Chat from './pages/chat.vue';
import BrowsingHistory from './pages/BrowsingHistory.vue';
import shop from './pages/shop.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: '/profile/:userId',
                component: Profile
            },
            {
                path: '/friends/:userId',
                component: Friends
            },
            {
                path: '/shop',
                component: shop
            },
            {
                path: '/chat/:userId',
                component: Chat
            },
            {
                path: '/history',
                component: BrowsingHistory
            }
        ]
    },
    { name: 'login', path: '/login/:username?', component: Login },
    { path: '/register', component: Register },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const currentUser = store.state.currentUser;

    // 如果未登录则重定向到登录
    if (currentUser === null && (to.name !== 'login' && to.name !== 'register')) {
        console.log('test');
        return { name: 'login' }
    }
})

createApp(App).use(router).use(Antd).use(store).mount('#app');
