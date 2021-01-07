import express from "express";
var router = express.Router();
import * as User from "../controller/user";
// 增
router.post("/add", User.addUserCtl);

// 删
router.get("/delete", User.delUser);

// 改
router.post("/edit", User.eidtUser);

// 查列表
router.get("/query", User.queryUser);

// 查详情
router.get("/queryOne", User.queryOneUser);

// 用户登录
router.post("/login", User.login);


export default router;
