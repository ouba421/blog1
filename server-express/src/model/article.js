"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  creatman: { type: Schema.Types.ObjectId, ref: 'User' },
  changetime: Date, // 修改时间
  creattime: Date, // 创建时间
  type: String, // 文章类型
  title: {
    // 文章标题
    type: String,
    required: true,
  },
  link: String, // 文章链接
  content: String, // 文章内容
  delStatus: {
    type: Number,
    default: 1, // 用户是否是删除状态，0 为删除， 1为正常
  },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
