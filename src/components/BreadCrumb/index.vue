<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      :to="item.path"
      v-for="item in breadCrumb"
      :key="item.path"
      >{{ item.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    computed: {
      breadCrumb() {
        let paths = this.splitRoute(this.$route.fullPath);

        let routesFlat = this.flatArray(
          JSON.parse(JSON.stringify(this.$router.options.routes))
        );
        let routes = paths
          .map((e) => {
            for (let r of routesFlat) {
              if (e === r.path) {
                return r;
              }
            }
          })
          .filter((e) => e && Object.keys(e).length > 0);
        this.setTags(routes);
        return routes;
      },
    },
    methods: {
      ...mapActions("tagsStore", ["setTags"]),
      flatArray(routesArray, fatherPath = "", acc = []) {
        for (let route of routesArray) {
          // 确保父路径以斜杠结尾，但不以双斜杠结尾
          const cleanFatherPath = fatherPath.endsWith("/")
            ? fatherPath
            : `${fatherPath}/`;
          // 拼接路径，同时确保子路径不以斜杠开头
          const cleanRoutePath = route.path.startsWith("/")
            ? route.path.substring(1)
            : route.path;
          const fullPath = `${cleanFatherPath}${cleanRoutePath}`;
          if (route.children && route.children.length > 0) {
            this.flatArray(route.children, fullPath, acc);
          }
          route.path = fullPath;
          acc.push(route);
        }
        return acc;
      },
      splitRoute(route) {
        let singeRoutes = route
          .split("/")
          .filter((e) => e && e.length > 0)
          .map((e) => "/" + e);
        let newRoutes = [];
        for (let i in singeRoutes) {
          if (i === 0) {
            newRoutes.push(singeRoutes[i]);
          } else {
            let path = "";
            for (let j = 0; j <= i; j++) {
              path += singeRoutes[j];
            }
            newRoutes.push(path);
          }
        }
        return newRoutes;
      },
    },
  };
</script>

<style lang="scss" scoped>
  :deep(.el-breadcrumb__inner) {
    color: white !important;
  }
</style>
