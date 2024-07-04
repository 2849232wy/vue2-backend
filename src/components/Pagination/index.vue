<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      total: {
        type: Number,
        default: 0,
      },
      limit: {
        type: Number,
        default: 10,
      },
      page: {
        type: Number,
        default: 1,
      },
    },
    methods: {
      handleSizeChange(limit) {
        this.$emit("changeLimit", limit);
      },
      handleCurrentChange(page) {
        console.log(this);
        this.$emit("changePage", page);
      },
    },
  };
</script>

<style lang="scss" scoped></style>
