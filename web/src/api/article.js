import request from "@/utils/request";

// 後台接口路由
const BSL = "/articleApi";

// 添加
export function addArticle(data) {
  return request({
    url: `${BSL}/add`,
    method: "post",
    data
  });
}

// 查询列表
export function queryArticle(params) {
  return request({
    url: `${BSL}/query`,
    method: "get",
    params
  });
}

// 删除
export function delArticle(params) {
  return request({
    url: `${BSL}/delete`,
    method: "get",
    params
  });
}

// 查询详情
export function queryOneArticle(params) {
  return request({
    url: `${BSL}/queryOne`,
    method: "get",
    params
  });
}


