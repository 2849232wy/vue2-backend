import routes from "./routes";
import vueRouter from "vue-router";
import store from "@/store";

let MappingRoutes = {
  Goods: () => import("@/views/Goods/index.vue"),
  User: () => import("@/views/User/index.vue"),
  Pages1: () => import("@/views/PagesOne/index.vue"),
  Pages2: () => import("@/views/PagesTwo/index.vue"),
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
export const initDynamicRoutes = () => {
  let currentRoutes = store.state.permissionStore.permission;
  handleDynamicRoutes(currentRoutes);
  router.options.routes[0].children = [
    router.options.routes[0].children[0],
    ...currentRoutes,
  ];
  router.addRoutes(router.options.routes);
};

const handleDynamicRoutes = (currentRoutes) => {
  currentRoutes.forEach((element) => {
    element.component = MappingRoutes[element.component];
    element.meta = {};
    element.meta.operatePermission = element.operatePermission || [];
    if (element.children && element.children.length > 0) {
      handleDynamicRoutes(element.children);
    }
  });
};

export default router;
