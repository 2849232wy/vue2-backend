<template>
  <el-card>
    <div
      id="orderData"
      style="height: 240px; width: 100%"
    ></div>
  </el-card>
</template>

<script>
  import * as echarts from "echarts";
  export default {
    props: {
      orderData: {
        type: Object,
        default: {},
      },
    },
    watch: {
      orderData: {
        immediate: true,
        deep: true,
        handler() {
          this.$nextTick(() => {
            if (this.orderData.data) {
              let myChart = echarts.init(document.getElementById("orderData"));
              let brands = {};
              for (let brand of this.orderData.data) {
                for (let key in brand) {
                  brands[key]
                    ? brands[key].push(brand[key])
                    : (brands[key] = [brand[key]]);
                }
              }
              let series = [];
              for (let key in brands) {
                series.push({
                  name: key,
                  type: "line",
                  data: brands[key],
                });
              }
              // 指定图表的配置项和数据
              let option = {
                tooltip: {},
                legend: {
                  data: Object.keys(brands),
                },
                xAxis: {
                  data: this.orderData.date,
                },
                yAxis: {},
                series: series,
              };

              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);
              myChart.resize({ width: 800, height: 240 });
            }
          });
        },
      },
    },
  };
</script>

<style lang="scss" scoped></style>
