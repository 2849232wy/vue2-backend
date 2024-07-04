const Mock = require("mockjs");
import mockHome from "./mockServeData/home";
import mockUser from "./mockServeData/user";
import mockPermission from "./mockServeData/permission"
export const getHomeData = Mock.mock("/api/home/getData", "get", function () {
  return mockHome.getStatisticalData();
});

// name, page, limit
export const getUserList = Mock.mock(
  RegExp("/api/user/getUserList" + ".*"),
  "get",
  function (config) {
    return mockUser.getUserList(config);
  }
);
// name, addr, age, birth, sex
export const createUser = Mock.mock(
  "/api/user/createUser",
  "post",
  function (data) {
    return mockUser.createUser(data);
  }
);
// id
export const deleteUser = Mock.mock(
  "/api/user/deleteUser",
  "post",
  function (id) {
    return mockUser.deleteUser(id);
  }
);
// id
export const getUser = Mock.mock(
  RegExp("/api/user/getUser" + ".*"),
  "get",
  function (id) {
    return mockUser.getUser(id);
  }
);

export const batchDeleteUser = Mock.mock(
  RegExp("/api/user/batchDeleteUser" + ".*"),
  "get",
  function (ids) {
    return mockUser.batchremove(ids);
  }
);

// id, name, addr, age, birth, sex
export const updateUser = Mock.mock(
  "/api/user/updateUser",
  "post",
  function (data) {
    console.log(data);
    return mockUser.updateUser(data);
  }
);

export const login = Mock.mock(
  "/api/user/login",
  "post",
  function (data) {
    return mockPermission.getMenu(data);
  }
);

