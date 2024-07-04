const tagsStore = {
  namespaced: true,
  state: {
    tags: [],
  },
  actions: {
    setTags({ commit }, tags) {
      commit("SETTAGS", tags);
    },
    deleteTag({ commit }, tag) {
      commit("DELETETAG", tag);
    },
  },
  mutations: {
    SETTAGS(state, tags) {
      // 标签去重处理
      let newTags = tags
        .map((e) => {
          let flag = false;
          for (const tag of state.tags) {
            if (e.path === tag.path) {
              flag = true;
            }
          }
          if (!flag) {
            return e;
          }
        })
        .filter((e) => e);
      state.tags.push(...newTags);
    },
    DELETETAG(state, tag) {
      let index = state.tags.findIndex((e) => {
        return e.path === tag.path;
      });

      state.tags.splice(index, 1);
    },
  },
};
export default tagsStore;
