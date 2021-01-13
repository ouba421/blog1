import express from "express";
var router = express.Router();
import * as Comment from "../controller/comment";
// 增
router.post("/add", Comment.addComment);

// 查列表
router.get("/query", Comment.queryComment);

export default router;
