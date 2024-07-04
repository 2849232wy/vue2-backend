import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
import tokenStore from "./tokenStore";
import tagsStore from "./tagsStore";
const store = new Vuex.Store({
  modules: {
    tagsStore,
    tokenStore
  },
});
export default store;
