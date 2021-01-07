// 初始化查询字段，空字符串就转成null
export function initNull(obj) {
  Object.keys(obj).forEach((item) => {
    if (obj[item] === "") {
      obj[item] = null;
    }
  });
  return obj;
}
