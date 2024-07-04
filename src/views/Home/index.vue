<template>
  <el-row :gutter="8">
    <el-col :span="8">
      <div class="h-left">
        <UserData></UserData>
        <TableData :tableData="tableData"></TableData>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="h-right">
        <SimpleOrder></SimpleOrder>
        <OrderData :orderData="orderData"></OrderData>
        <div class="r-bottom">
          <Bar :userData="userData"></Bar>
          <Pie :videoData="videoData"></Pie>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { getHomeData } from "@/api/index";
  import UserData from "./components/UserInfo.vue";
  import TableData from "./components/TableData.vue";
  import SimpleOrder from "./components/SimpleOrder.vue";
  import OrderData from "./components/OrderData.vue";
  import Bar from "./components/Bar.vue";
  import Pie from "./components/Pie.vue";
  export default {
    components: {
      UserData,
      TableData,
      SimpleOrder,
      OrderData,
      Bar,
      Pie,
    },
    data: () => {
      return {
        orderData: {},
        tableData: [],
        userData: [],
        videoData: [],
      };
    },
    async mounted() {
      let res = await getHomeData();
      let { orderData, tableData, userData, videoData } = res.data;
      this.orderData = orderData;
      (this.tableData = tableData),
        (this.userData = userData),
        (this.videoData = videoData);
    },
  };
</script>

<style lang="scss" scoped>
  .h-left {
    display: flex;
    flex-direction: column;
    row-gap: 40px;
  }
  .h-right {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    .r-bottom {
      display: flex;
      column-gap: 10px;
    }
  }
</style>
