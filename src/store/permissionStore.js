const permissionStore = {
  namespaced: true,
  state: () => ({
    permission: JSON.parse(localStorage.getItem("permission")) || [],
  }),
  actions: {
    setPermission({ commit }, permission) {
      commit("SETPERMISSION", permission);
    },
    deletePermission({ commit }) {
      commit("DELETEPERMISSION");
    },
  },
  mutations: {
    SETPERMISSION(state, permission) {
      state.permission = permission;
      localStorage.setItem("permission", JSON.stringify(permission));
    },
    DELETEPERMISSION(state) {
      localStorage.removeItem("permission");
      state.permission = [];
    },
  },
};
export default permissionStore;
