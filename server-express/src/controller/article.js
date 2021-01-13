"use strict";

import ArticleModel from "../model/article";

// 增
export function addArticle(req, res, next) {
  let { creatman, content, type, link, title } = req.body;
  let article = {
    creatman,
    content,
    link,
    title,
    type,
    changetime: new Date(), // 修改时间
    creattime: new Date(), // 创建时间
  };
  ArticleModel.create(article, (err, article) => {
    if (err) {
      res.send({
        code: 300,
        type: "error",
        msg: err.message,
      });
    } else {
      res.send({
        code: 200,
        type: "success",
      });
    }
  });
}
// 删
export function delArticle(req, res, next) {
  if (!req.query.id) {
    res.send({
      code: 300,
      type: "error",
      msg: "文章id不能为空",
    });
    return;
  }
  ArticleModel.findOneAndUpdate(
    { _id: req.query.id },
    { delStatus: 0 },
    function (err) {
      if (err) {
        res.send({
          code: 300,
          type: "error",
          msg: err.message,
        });
      } else {
        res.send({
          code: 200,
          type: "success",
        });
      }
    }
  );
}
// 改
export function eidtArticle(req, res, next) {
  let { content, type, link, title, id } = req.body;
  let article = {
    content,
    link,
    title,
    type,
    changetime: new Date(), // 修改时间
  };

  if (!id) {
    res.send({
      code: 300,
      type: "error",
      msg: "文章id不能为空",
    });
    return;
  }
  ArticleModel.findOneAndUpdate({ _id: id }, article, (err, user) => {
    if (err) {
      res.send({
        code: 300,
        type: "error",
        msg: err.message,
      });
    } else {
      res.send({
        code: 200,
        type: "success",
      });
    }
  });
}
// 查列表
export async function queryArticle(req, res, next) {
  let { pageSize, pageNum, filter, ...queryInfo } = req.query;
  if (queryInfo.title) {
    queryInfo.title = new RegExp(queryInfo.title, "i");
  }
  let queryObj = { ...queryInfo, delStatus: 1 };
  let articleLength = await ArticleModel.find(queryObj, "-delStatus")
    .count()
    .exec();
  ArticleModel.find(queryObj, "-delStatus")
    .sort(
      (() => {
        if (filter === "new") {
          return {
            creattime: -1,
          };
        } else if (filter === "hot") {
          return {
            commentnum: -1,
          };
        }
      })()
    )
    // populate 填充用戶集合
    .populate({ path: "creatman", select: "username" })
    .skip(+pageSize * (+pageNum - 1))
    .limit(+pageSize)
    .exec(function (err, list) {
      if (err) {
        res.send({
          code: 300,
          type: "error",
          msg: err.message,
        });
      } else {
        res.send({
          code: 200,
          type: "success",
          data: {
            list,
            total: articleLength,
          },
        });
      }
    });
}

// 查详情
export function queryOneArticle(req, res, next) {
  if (!req.query.id) {
    res.send({
      code: 300,
      type: "error",
      msg: "文章id不能为空",
    });
    return;
  }
  ArticleModel.findById(req.query.id, "-delStatus")
    .populate({ path: "creatman", select: "username sex" })
    .exec(function (err, doc) {
      if (err) {
        res.send({
          code: 300,
          type: "error",
          msg: err.message,
        });
      } else {
        res.send({
          code: 200,
          type: "success",
          data: doc,
        });
      }
    });
}
