import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
            darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
            homePosts: [],
        }
    },
    mutations: {
        curUserUpdate(state, payload) {
            state.currentUser = payload
            localStorage.setItem('currentUser', JSON.stringify(payload));
        },
        darkModeUpdate(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        },
        setHomePosts(state, payload) {
            state.homePosts = payload;
        }
    }
})

export default store