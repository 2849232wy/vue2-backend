
const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        icon: "icon-home1",
        title: "首页",
        name: "home",
        component: () => import("@/views/Home/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    title: "登录",
    component: () => import("@/views/Login/index.vue"),
  },
];

export default routes;
