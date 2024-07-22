import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
import tokenStore from "./tokenStore";
import tagsStore from "./tagsStore";
import permissionStore from "./permissionStore";
const store = new Vuex.Store({
  modules: {
    tagsStore,
    tokenStore,
    permissionStore
  },
});
export default store;
