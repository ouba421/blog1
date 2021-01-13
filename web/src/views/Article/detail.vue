<template>
  <div class="detail">
    <div class="detail-content">
      <div class="article-create">
        <div class="article-create-header">
          <img src="@/assets/images/header_man.png" alt="" />
        </div>
        <div class="article-create-name">
          <span class="name">{{ creatman.username }}</span>
          <span class="time">{{ article.creattime }}</span>
        </div>
      </div>
      <!-- 内容 -->
      <div class="w-e-text-container">
        <div class="w-e-text" v-html="article.content"></div>
      </div>
      <!-- 评论 -->
      <div class="detail-comment">
        <div class="detail-comment_img">
          <img :src="headerImg(getUserInfo.sex)" alt="" />
        </div>
        <el-form :model="commentForm" :inline="true" ref="commentForm">
          <el-form-item
            prop="comment"
            :rules="{
              required: true,
              message: '评论内容不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="commentForm.comment"
              type="textarea"
              autosize
              placeholder="请输入评论内容"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="addComment('commentForm')"
              :loading="commentLoading"
              type="primary"
              >评论</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 已评论列表 -->
      <ul>
        <li class="user-comment" v-for="item in articleList" :key="item._id">
          <div class="user-comment_left">
            <img :src="headerImg(item.commentman.sex)" alt="" />
          </div>
          <div class="user-comment_right">
            <span class="user-comment_right_name">{{item.commentman.username}}</span>
            <span class="user-comment_right_content">{{item.content}}</span>
            <span class="user-comment_right_time">{{item.commenttime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { queryOneArticle } from "@/api/article";
import { addComment, queryComment } from "@/api/comment";
export default {
  components: {},
  data() {
    return {
      article: "",
      creatman: "",
      commentForm: {
        comment: "", // 评论
      },
      articleId: this.$route.query.id, // 文章ID
      commentLoading: false, // 评论button
      articleList: [], // 评论列表
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),

  },
  watch: {},
  methods: {
    headerImg(status) {
      return status === "0"
        ? require("@/assets/images/header_woman.png")
        : require("@/assets/images/header_man.png");
    },
    // 查询文章详情
    queryDetail() {
      let parmas = {
        id: this.articleId,
      };
      queryOneArticle(parmas).then((res) => {
        if (res.code === 200) {
          this.article = res.data;
          this.creatman = res.data.creatman;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    // 添加评论
    addComment(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.commentLoading = true;
          let data = {
            commentman: this.getUserInfo._id,
            articleid: this.articleId,
            content: this.commentForm.comment,
          };
          addComment(data)
            .then((res) => {
              if (res.code === 200) {
                this.resetForm(formName);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                  duration: 3000,
                });
              }
            })
            .finally(() => {
              this.commentLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询评论列表
    queryCommentF() {
      let params = {
        id: this.articleId,
      };
      queryComment(params).then((res) => {
        if (res.code === 200) {
          this.articleList = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {
    this.queryDetail();
    this.queryCommentF();
  }, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* 下拉框 */
/deep/ .detail-content .el-textarea__inner {
  min-height: 40px !important;
}
</style>

<style lang="scss" scoped>
.detail-content {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background-color: #fff;
}
.article-create {
  margin: 20px;
  min-height: 40px;
  display: flex;
  .article-create-header {
    width: 40px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .article-create-name {
    padding-left: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      color: #333;
      font-size: 20px;
    }
    .time {
      color: #909090;
      font-size: 14px;
    }
  }
}
.detail-comment {
  display: flex;
  background-color: #eee;
  padding: 20px;
}
.detail-comment_img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 40px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
}
.user-comment {
  padding: 20px 20px 20px 40px;
  display: flex;
  background-color: #eee;
}
.user-comment {
  display: flex;
}
.user-comment_left {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 30px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
}
.user-comment_right {
  display: flex;
  flex-direction: column;
  line-height: 1.8;
}
.user-comment_right_name {
  font-size: 13px;
  color: #333;
}
.user-comment_right_content {
  font-size: 12px;
  color: #505050;
}
.user-comment_right_time {
  font-size: 12px;
  color: #8a9aa9;
}
</style>
