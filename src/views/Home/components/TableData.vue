<template>
  <el-card>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="课程名称"
      >
      </el-table-column>
      <el-table-column
        prop="todayBuy"
        label="进入购买"
      >
      </el-table-column>
      <el-table-column
        prop="monthBuy"
        label="当月购买"
      >
      </el-table-column>
      <el-table-column
        prop="totalBuy"
        label="总购买"
      >
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: Array,
        default: [],
      },
    },
  };
</script>

<style lang="scss" scoped></style>
