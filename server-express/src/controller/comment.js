"use strict";

import CommentModel from "../model/comment";
import ArticleModel from "../model/article";

// 增
export function addComment(req, res, next) {
  let { commentman, content, articleid } = req.body;
  try {
    if (!commentman) {
      throw "评论人不能为空";
    }
    if (!content) {
      throw "内容不能为空";
    }
    if (!articleid) {
      throw "文章ID不能为空";
    }
  } catch (error) {
    res.send({
      code: 300,
      type: "error",
      msg: error,
    });
    return;
  }
  let comment = {
    commentman,
    content,
    articleid,
    commenttime: new Date(),
  };
  CommentModel.create(comment, (err, article) => {
    if (err) {
      res.send({
        code: 300,
        type: "error",
        msg: err.message,
      });
    } else {
      ArticleModel.findOneAndUpdate(
        { _id: articleid },
        { $inc: { commentnum: 1 } },
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
  });
}

// 查列表
export async function queryComment(req, res, next) {
  if (!req.query.id) {
    res.send({
      code: 300,
      type: "error",
      msg: "文章ID不能为空",
    });
    return;
  }
  CommentModel.find({ articleid: req.query.id })
    .populate({ path: "commentman", select: "username sex" })
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
          data: list,
        });
      }
    });
}
