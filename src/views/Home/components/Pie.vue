<template>
  <el-card>
    <div id="pie"></div>
  </el-card>
</template>

<script>
  import * as echarts from "echarts";
  export default {
    props: {
      videoData: {
        type: Array,
        default: [],
      },
    },
    watch: {
      videoData: {
        immediate: true,
        handler() {
          let chartDom = document.getElementById("pie");
          let myChart = echarts.init(chartDom);

          let option = {
            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "vertical",
              left: "right",
            },
            series: [
              {
                type: "pie",
                radius: "50%",
                data: this.videoData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          };

          myChart.setOption(option);
          myChart.resize({ height: 200, width: 400 });
        },
      },
    },
  };
</script>

<style lang="scss" scoped></style>
