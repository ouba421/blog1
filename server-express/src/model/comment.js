"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentman: { type: Schema.Types.ObjectId, ref: 'User' }, // 评论人
  commenttime: Date, // 评论时间
  articleid: Schema.Types.ObjectId,
  content: String, // 评论内容
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
