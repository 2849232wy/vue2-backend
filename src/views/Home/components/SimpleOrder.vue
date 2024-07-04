<template>
  <div class="u-sim">
    <div
      v-for="item in data"
      :key="item.id"
      class="o-item"
    >
      <div
        :style="{ backgroundColor: item.color }"
        class="o-icon"
      >
        <i
          class="iconfont"
          :class="item.icon"
        ></i>
      </div>
      <div style="padding-left: 10px">
        <div>￥{{ item.order }}</div>
        <div style="padding-top: 5px; font-size: 12px">
          {{ obj[item.type] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        obj: {
          1: "今日支付订单",
          2: "今日收藏订单",
          3: "今日未支付订单",
          4: "当月支付订单",
          5: "当月收藏订单",
          6: "当月未支付订单",
        },
        data: [
          {
            id: 1,
            color: "green",
            order: 1234,
            type: 1,
            icon: "icon-trues",
          },
          {
            id: 2,
            color: "yellow",
            order: 454,
            type: 2,
            icon: "icon-shoucang",
          },
          {
            id: 3,
            color: "gray",
            order: 563,
            type: 3,
            icon: "icon-daifukuan",
          },
          {
            id: 4,
            color: "green",
            order: 1234,
            type: 4,
            icon: "icon-trues",
          },
          {
            id: 5,
            color: "yellow",
            order: 454,
            type: 5,
            icon: "icon-shoucang",
          },
          {
            id: 6,
            color: "gray",
            order: 563,
            type: 6,
            icon: "icon-daifukuan",
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .u-sim {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    .o-item {
      display: flex;
      align-items: center;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      .o-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        font-size: 40px;
        color: white;
        .iconfont {
          font-size: 30px;
        }
      }
    }
  }
</style>
