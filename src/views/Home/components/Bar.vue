<template>
  <el-card>
    <div id="bar"></div>
  </el-card>
</template>

<script>
  import * as echarts from "echarts";
  export default {
    props: {
      userData: {
        type: Array,
        default: [],
      },
    },
    watch: {
      userData: {
        immediate: true,
        handler() {
          this.$nextTick(() => {
            var chartDom = document.getElementById("bar");
            var myChart = echarts.init(chartDom);
            let source = this.userData.map((e) => ({
              date: e.date,
              已售: e.active,
              新增: e.new,
            }));
            let option = {
              legend: {},
              tooltip: {},
              dataset: {
                dimensions: ["date", "已售", "新增"],
                source,
              },
              xAxis: { type: "category" },
              yAxis: {},
              series: [{ type: "bar" }, { type: "bar" }],
            };

            myChart.setOption(option);
            myChart.resize({ height: 200, width: 400 });
          });
        },
      },
    },
  };
</script>

<style lang="scss" scoped></style>
