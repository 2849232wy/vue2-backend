import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "admin") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "goods",
              name: "goods",
              title: "商品管理",
              icon: "icon-shangpin",
              component: "Goods",
            },
            {
              path: "user",
              name: "user",
              title: "用户管理",
              component: "User",
              icon: "icon-yonghu",
            },
            {
              path: "other",
              name: "other",
              title: "其它",
              icon: "icon-qita",
              children: [
                {
                  path: "pages1",
                  name: "pages1",
                  title: "页面1",
                  component: "Pages1",
                },
                {
                  path: "pages2",
                  name: "pages2",
                  title: "页面2",
                  component: "Pages2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "xiaoxiao" && password === "xiaoxiao") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "goods",
              name: "goods",
              title: "商品管理",
              icon: "icon-shangpin",
              component: "Goods",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
