import express from "express";
var router = express.Router();
import * as Article from "../controller/article";
// 增
router.post("/add", Article.addArticle);

// 删
router.get("/delete", Article.delArticle);

// 改
router.post("/edit", Article.eidtArticle);

// 查列表
router.get("/query", Article.queryArticle);

// 查详情
router.get("/queryOne", Article.queryOneArticle);


export default router;
