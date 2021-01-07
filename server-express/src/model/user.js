'use strict';

import mongoose from 'mongoose'
const Schema  = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required:true,
    minLength: 2,
    maxLength: 10
  }, // 用户名
  password: {
    type: String,
    required:true,
  }, // 密码
  type: String, // 用户类型
  sex: String, // 用户性别
  headimg: String, // 用户头像
  logintime: Date, // 最近登陆时间
  creattime: Date, // 创建时间
  delStatus: {
    type: Number,
    default: 1, // 用户是否是删除状态，0 为删除， 1为正常
  }
})

const User = mongoose.model('User', userSchema);

export default User