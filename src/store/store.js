import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            currentUser: JSON.parse(localStorage.getItem('curUser')) || null,
            darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
            homePosts: [],
            notReadCount: 0
        }
    },
    mutations: {
        curUserUpdate(state, payload) {
            state.currentUser = payload
            localStorage.setItem('curUser', JSON.stringify(payload));
        },
        darkModeUpdate(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        },
        setHomePosts(state, payload) {
            state.homePosts = payload;
        },
        logout(state) {
            localStorage.removeItem('curUser');
            state.currentUser = null;
        },
        setNotReadCount(state, count) {
            state.notReadCount = count;
        },
        addCount(state, count) {
            state.notReadCount += count;
        }
    }
})

export default store