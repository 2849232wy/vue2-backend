import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import VueRouter from "vue-router";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import "./element-ui";
import "@/assets/style/element-variables.scss";
import "@/assets/font/iconfont.css";
import "@/mock/index";
import store from "@/store";
import "@/dirctives";
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
