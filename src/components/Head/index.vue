<template>
  <div class="head">
    <div class="left">
      <div class="l-breadcrumb">
        <i
          class="iconfont icon-zhedie1"
          @click="changeCollapse"
        ></i>
        <BreadCrumb></BreadCrumb>
      </div>
    </div>
    <div>
      <el-dropdown>
        <div class="el-dropdown-link">
          <el-avatar
            icon="el-icon-user-solid"
            src="https://tse4-mm.cn.bing.net/th/id/OIP-C.tJQOwDiLLTXzTh7eeC1e1AHaLH?w=199&h=298&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          ></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="logout">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from "@/components/BreadCrumb/index.vue";
  import { mapActions } from "vuex";
  export default {
    components: {
      BreadCrumb,
    },
    methods: {
      ...mapActions("tokenStore", ["deleteToken"]),
      ...mapActions("permissionStore", ["deletePermission"]),
      changeCollapse() {
        this.$emit("changeCollapse");
      },
      async logout() {
        await this.deleteToken();
        await this.deletePermission();
        this.$router.replace("/login");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .head {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #000;
    color: white;
    :deep(.el-popover) {
      min-width: auto;
    }
    .left {
      display: flex;
      .l-breadcrumb {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 600;

        .iconfont {
          margin-right: 20px;
        }
      }
    }
  }
</style>
