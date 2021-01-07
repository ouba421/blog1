"use strict";

import UserModel from "../model/user";
import bcyptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { secret } from "../utils/const";

// 添加用户
export async function addUserCtl(req, res, next) {
  let { username, type, sex, password } = req.body;
  let user = await UserModel.findOne({ username });
  if (user) {
    res.send({
      code: 300,
      type: "error",
      msg: "用户名已被注册",
    });
    return;
  }
  // 密码加密处理
  let newPsw = bcyptjs.hashSync(password, 10);
  let newUser = {
    username,
    type,
    sex,
    password: newPsw,
    logintime: new Date(),
    creattime: new Date(),
  };
  UserModel.create(newUser, (err, user) => {
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

// 查询用户分页查询列表
export function queryUser(req, res, next) {
  let { pageSize, pageNum, ...queryInfo } = req.query;
  if (queryInfo.username) {
    queryInfo.username = new RegExp(queryInfo.username, "i");
  }
  let queryObj = { ...queryInfo, delStatus: 1 };
  UserModel.find(queryObj, "-delStatus")
    .count()
    .exec((err, count) => {
      UserModel.find(queryObj, "-delStatus")
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
                total: count,
              },
            });
          }
        });
    });
}

// 查询用户详情
export function queryOneUser(req, res, next) {
  if (!req.query.id) {
    res.send({
      code: 300,
      type: "error",
      msg: "用户id不能为空",
    });
    return;
  }
  UserModel.findById(req.query.id, "username type sex", function (err, doc) {
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

// 编辑
export function eidtUser(req, res, next) {
  let { username, type, sex, id } = req.body;
  let newUser = {
    username,
    type,
    sex,
    logintime: new Date(),
  };

  if (!id) {
    res.send({
      code: 300,
      type: "error",
      msg: "用户id不能为空",
    });
    return;
  }

  UserModel.findOneAndUpdate({ _id: id }, newUser, (err, user) => {
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
// 删除用户
export function delUser(req, res, next) {
  if (!req.query.id) {
    res.send({
      code: 300,
      type: "error",
      msg: "用户id不能为空",
    });
    return;
  }
  UserModel.findOneAndUpdate({ _id: req.query.id }, { delStatus: 0 }, function (
    err,
    user
  ) {
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

// 用户登录
export async function login(req, res, next) {
  let { username, password } = req.body;
  // lean 用于返回普通Js对象，从而可以操作属性
  let user = await UserModel.findOne({ username }, "-delStatus").lean().exec();
  if (!user) {
    res.send({
      code: 300,
      type: "error",
      msg: "用户名错误",
    });
    return;
  }
  // 对比密码
  let comparePwd = bcyptjs.compareSync(password, user.password);
  if (!comparePwd) {
    res.send({
      code: 300,
      type: "error",
      msg: "密码错误",
    });
    return;
  }
  delete user.password;
  // 生成token
  let token = await jsonwebtoken.sign(
    { username: user.username, type: username.type },
    secret,
    { expiresIn: "12h" }
  );
  user.token = token;
  res.send({
    code: 200,
    type: "success",
    data: user,
  });
}
