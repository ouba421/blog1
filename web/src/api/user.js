import request from "@/utils/request";

// 後台接口路由
const BSL = "/userApi";

// 添加用户
export function addUser(data) {
  return request({
    url: `${BSL}/add`,
    method: "post",
    data
  });
}

// 查询用户列表
export function queryUser(params) {
  return request({
    url: `${BSL}/query`,
    method: "get",
    params
  });
}

// 查询用户详情
export function queryOneUser(params) {
  return request({
    url: `${BSL}/queryOne`,
    method: "get",
    params
  });
}

// 编辑用户
export function editUser(data) {
  return request({
    url: `${BSL}/edit`,
    method: "post",
    data
  });
}

// 删除用户
export function delUser(params) {
  return request({
    url: `${BSL}/delete`,
    method: "get",
    params
  });
}

// 用户登录
export function login(data) {
  return request({
    url: `${BSL}/login`,
    method: "post",
    data
  });
}

