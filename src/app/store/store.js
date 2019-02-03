import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        login: false,
        username: null,
        userId: null
    },
    mutations: {
        signIn: function (state, {username, userId}) {
            state.login = true;
            state.username = username;
            state.userId = userId;
        },
        signOut: function (state) {
            state.login = false;
        }
    },
    actions: {}
});
