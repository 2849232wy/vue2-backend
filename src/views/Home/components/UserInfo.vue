<template>
  <el-card>
    <div class="top">
      <el-avatar
        :size="140"
        src="https://tse3-mm.cn.bing.net/th/id/OIP-C.ZhAC_olTvV6po6JH3XylPwAAAA?rs=1&pid=ImgDetMain"
      ></el-avatar>
      <div class="name">
        <h2>Admin</h2>
        <div>超级管理员</div>
      </div>
    </div>
    <hr style="margin: 20px 0" />
    <div>
      <div class="time">
        上次登录时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2017-12-12
      </div>
      <div>
        上次登录地点:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;武汉
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .top {
    display: flex;
    align-items: center;
    .name {
      padding: 0 10px;
      h2 {
        padding: 10px 0;
      }
    }
  }
  .time {
    padding: 10px 0;
  }
</style>
