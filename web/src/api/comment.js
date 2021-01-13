import request from "@/utils/request";

// 後台接口路由
const BSL = "/commentApi";

// 添加
export function addComment(data) {
  return request({
    url: `${BSL}/add`,
    method: "post",
    data
  });
}

// 查询列表
export function queryComment(params) {
  return request({
    url: `${BSL}/query`,
    method: "get",
    params
  });
}

