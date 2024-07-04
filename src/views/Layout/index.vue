<template>
  <div>
    <el-container>
      <el-aside width="auto"><NavBar :collapse="isCollapse"></NavBar></el-aside>
      <el-container>
        <el-header style="height: auto"
          ><Head @changeCollapse="changeCollapse"></Head
        ></el-header>
        <el-main>
          <div class="tags">
            <el-tag
              type="primary"
              v-for="item in tags"
              :key="item.path"
              closable
              @close="handleClose(item)"
              @click="handleClick(item)"
              :effect="$route.path === item.path ? 'dark' : ''"
              >{{ item.title }}</el-tag
            >
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar/index.vue";
  import Head from "@/components/Head/index.vue";
  import { mapState, mapActions } from "vuex";
  export default {
    data: () => {
      return {
        isCollapse: false,
      };
    },
    components: {
      NavBar,
      Head,
    },
    methods: {
      ...mapActions("tagsStore", ["deleteTag"]),
      changeCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      handleClose(tag) {
        this.deleteTag(tag);
      },
      handleClick(tag) {
        this.$router.push(tag.path);
      },
    },
    computed: {
      ...mapState("tagsStore", ["tags"]),
    },
  };
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100vh;
    .el-aside {
      background-color: #545c64;
    }
  }
  .el-header {
    padding: 0;
  }
  .tags {
    display: flex;
    padding-bottom: 20px;
    column-gap: 10px;
  }
</style>
