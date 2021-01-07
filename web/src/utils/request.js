import axios from "axios";
import Vue from "vue";
import { MessageBox } from "element-ui";
import router from "@/router";
// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000 // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url !== "/userApi/login" && sessionStorage.userInfo) {
      config.headers.token = JSON.parse(sessionStorage.userInfo).token;
    }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);
// response interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;
    if (res.code !== 200) {
      // 401:Token 过期了;
      if (res.code === 401) {
        // 请自行在引入 MessageBox
        MessageBox.confirm("登录失效请重新登录", "登录失效", {
          confirmButtonText: "重新登录",
          closeOnClickModal: false,
          showClose: false,
          type: "warning"
        }).then(() => {
          router.push("/login");
          sessionStorage.clear();
        });
      }
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    Vue.prototype.$message({
      message: error.message,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default service;
