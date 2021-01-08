import express from "express";
import chalk from "chalk";
import jwt from "express-jwt";
import { secret } from "./utils/const";
import "./mongodb/db";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/user";
import articleRouter from "./routes/article";
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// token 验证
app.use(
  jwt({
    secret,
    algorithms: ["HS256"],
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.token) {
        return req.headers.token;
      }
      return null;
    },
  }).unless({path: ['/userApi/login']})
);

app.use("/userApi", indexRouter);
app.use("/articleApi", articleRouter);
// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send({
      code: 401,
      type: "error",
      message: "token失效，请重新登录"
    });
  }else{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("error");
  }
});
app.listen("10017", () => {
  console.log(chalk.green("成功监听端口：10017"));
});
export default app;
