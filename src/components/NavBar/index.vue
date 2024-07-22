<template>
  <div class="navbar">
    <el-menu
      v-bind="$attrs"
      default-active="1"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="yellow"
      :router="true"
    >
      <h4>后台管理系统通用平台</h4>
      <template v-for="(item, index) in routes">
        <el-submenu
          v-if="item.children && item.children.length > 0"
          :index="item.fatherPath + item.path"
        >
          <template slot="title">
            <i
              class="iconfont"
              :class="item.icon"
            ></i>
            <span>&nbsp;&nbsp;{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(submenu, index) in item.children"
              :index="submenu.fatherPath + submenu.path"
              >{{ submenu.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          v-else
          :index="item.fatherPath + item.path"
        >
          <i
            class="iconfont"
            :class="item.icon"
          ></i>
          <span slot="title">&nbsp;&nbsp;{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    computed: {
      routes() {
        return this.addFatherPathForRoutes(
          JSON.parse(JSON.stringify(this.$router.options.routes[0].children))
        );
      },
    },
    
    methods: {
      addFatherPathForRoutes(routes, fatherPath = "") {
        for (let route of routes) {
          route.fatherPath = fatherPath.endsWith("/")
            ? fatherPath
            : fatherPath + "/";
          if (route.children && route.children.length > 0) {
            fatherPath = (route.path.startsWith("/") ? "" : "/") + route.path;
            this.addFatherPathForRoutes(route.children, fatherPath);
          }
        }
        return routes;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .navbar {
    font-size: 18px;
    font-weight: 600;
    .el-menu-vertical {
      padding: 0 10px;
    }
    h4 {
      text-align: center;
      padding: 30px 0;
    }
  }
</style>
