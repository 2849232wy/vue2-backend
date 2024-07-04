import routes from "./routes";
import vueRouter from "vue-router";
import store from "@/store";
const Goods = () => import("@/views/Goods/index.vue");
const User = () => import("@/views/User/index.vue");
const Pages1 = () => import("@/views/PagesOne/index.vue");
const Pages2 = () => import("@/views/PagesTwo/index.vue");

let MappingRoutes = {
  Goods,
  User,
  Pages1,
  Pages2,
};

const router = new vueRouter({
  routes,
  mode: "hash",
});
router.beforeEach((to, from, next) => {
  let localStorageToken = localStorage.getItem("token");
  if (!to.fullPath.includes("login")) {
    if (!localStorageToken) {
      next("/login");
    } else {
      // store的token丢失后重新赋值
      store.dispatch("tokenStore/setToken", localStorageToken);
      next();
    }
  } else {
    next();
  }
});
export const initDynamicRoutes = (currentRoutes) => {
  handleDynamicRoutes(currentRoutes);
  currentRoutes.forEach((route) => {
    router.addRoute("layout", route);
  });
  console.log(router.getRoutes);
};

const handleDynamicRoutes = (currentRoutes) => {
  currentRoutes.forEach((element) => {
    element.component = MappingRoutes[element.component];
    if (element.children && element.children.length > 0) {
      handleDynamicRoutes(element.children);
    }
  });
};

export default router;
