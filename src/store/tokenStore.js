const tokenStore = {
  namespaced: true,
  state: {
    token: "",
  },
  actions: {
    setToken({ commit }, token) {
      commit("SETTOKEN", token);
    },
    deleteToken({ commit }) {
     
      commit("DELETETOKEN");
    },
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    DELETETOKEN(state) {
      (state.token = ""), localStorage.removeItem("token");
    },
  },
};
export default tokenStore;
