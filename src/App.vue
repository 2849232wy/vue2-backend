<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { initDynamicRoutes } from "@/router";
  export default {
    created() {
      initDynamicRoutes();
    },
  };
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
</style>
