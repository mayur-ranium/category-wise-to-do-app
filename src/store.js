import { createStore } from 'vuex'

const authStore = {
  state: () => ({
    user: {
      loggedIn: false,
      loading: false,
      data: null
    }
  }),
  mutations: {
    SET_LOADING(state, value){
      state.user.loading = value
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  getters : {
    user(state){
      return state.user
    },
    loading(state){
        return state.loading;
    }
    
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit('SET_LOADING', false)
        commit("SET_USER", {
          email: user.email,
          uid : user.uid,
        });
      } else {
        commit("SET_USER", null);
      }
    }
  },
}

export default createStore({
  modules: {
    auth: authStore,
  }
});