import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authenticated: false,
        user: null,
    },
    getters: {
        isAuthenticated: state => state.authenticated,
        getUser: state => state.user,
    },
    mutations: {
        setAuthenticated(state, status) {
            state.authenticated = status;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        setAuthStatus(context, status) {
            context.commit('setAuthenticated', status);
        },
        setUser(context, user) {
            context.commit('setUser', user);
        }
    },
    modules: {
    }
})
