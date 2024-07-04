import axios from "axios";
import store from "@/store/index";
let request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token");
  }
  return config;
});
request.interceptors.response.use((res) => {
  if (res.data.data?.token) {
    store.dispatch("tokenStore/setToken", res.data.data.token);
  }
  return res.data;
});

export const getHomeData = () => {
  return request({
    method: "get",
    url: "/api/home/getData",
  });
};

// name, page, limit
export const getUserList = (data) => {
  return request({
    method: "get",
    url: "/api/user/getUserList",
    params: data,
  });
};
// name, addr, age, birth, sex
export const createUser = (data) => {
  return request({
    method: "post",
    url: "/api/user/createUser",
    data,
  });
};

// id
export const deleteUser = (id) => {
  return request({
    method: "post",
    url: "/api/user/deleteUser",
    data: {
      id,
    },
  });
};

// id
export const getUser = (id) => {
  return request({
    method: "get",
    url: "/api/user/getUser",
    params: { id },
  });
};

export const batchDeleteUser = (ids) => {
  return request({
    method: "get",
    url: "/api/user/batchDeleteUser",
    params: { ids },
  });
};

// id, name, addr, age, birth, sex
export const updateUser = (data) => {
  return request({
    method: "post",
    url: "/api/user/updateUser",
    data,
  });
};

// username, password
export const login = (data) => {
  return request({
    method: "post",
    url: "/api/user/login",
    data,
  });
};
