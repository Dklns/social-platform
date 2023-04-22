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
            }
        ]
    },
    { path: '/login/:username?', component: Login },
    { path: '/register', component: Register }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).use(Antd).use(store).mount('#app');
