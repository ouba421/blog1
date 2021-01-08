<template>
  <div class="add-user">
    <div class="add-user-ctn">
      <h1 class="add-user-title">添加文章</h1>
      <!-- form 表单 -->
      <div class="add-user-form">
        <el-form
          :model="articleForm"
          :rules="rules"
          ref="articleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="articleForm.type" placeholder="请选择文章类型">
              <el-option
                v-for="item in articleType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标题" prop="title">
            <el-input
              v-model.trim="articleForm.title"
              :maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="链接地址" prop="link">
            <el-input
              v-model.trim="articleForm.link"
              :maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <div id="edit">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="submitForm('articleForm')"
              >{{ path === "/article/add" ? "立即创建" : "编辑" }}</el-button
            >
            <el-button @click="resetForm('articleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { addArticle, queryOneArticle } from "@/api/article";
import { articleType } from "@/utils/const";
import { mapGetters } from "vuex";
import E from 'wangeditor';
import xss from "xss";
export default {
  components: {},
  data() {
    return {
      loading: false,
      path: this.$route.path,
      articleForm: {
        type: "", // 文章类型
        title: "",// 文章标题,
        link: "", // 文章链接
        content: "", // 文章内容
      },
      rules: {
        type: [
          { required: true, message: "请选择文章类型", trigger: "change" },
        ],
        title: [
          { required: true, message: "请输入文章标题", trigger: "change" },
        ],
      },
      editor: {}, // 文本編輯器
      articleType,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  watch: {},
  methods: {
    eidtInit(){
      this.editor = new E('#edit');
      this.editor.config.zIndex = 500;
      this.editor.create();
    },
    // 添加用户
    addUserF() {
      this.loading = true;
      this.articleForm.content = xss(this.editor.txt.html());
      this.articleForm.creatman = this.getUserInfo._id;
      addArticle(this.articleForm)
        .then((res) => {
          if (res.code === 200) {
            this.$confirm("文章创建成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
            }).finally(() => {

            });
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 3000,
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editUserF() {
      this.loading = true;
      this.userForm.id = this.userForm._id;
      delete this.userForm._id;
      editUser(this.userForm)
        .then((res) => {
          if (res.code === 200) {
            this.$confirm("用户编辑成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
            }).finally(() => {
              this.$router.go(-1);
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 3000,
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.path === "/article/add") {
            this.addUserF();
          } else {
            this.editUserF();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询用户
    queryDetail() {
      let parmas = {
        id: this.$route.query.id,
      };
      queryOneArticle(parmas).then((res) => {
        if (res.code === 200) {
          this.articleForm = res.data;
          this.editor.txt.html(this.articleForm.content);
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    init() {
      if (["/article/edit"].includes(this.path)) {
        this.queryDetail();
      }
    },
    // 取消
    cancel() {
      this.$router.go(-1);
    },
  },
  created() {},
  mounted() {
    this.eidtInit();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {
    this.init();
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
/deep/ .add-user-form .el-select {
  display: block;
}
</style>
<style lang="scss" scoped>
.add-user-ctn {
  height: 100%;
  overflow: auto;
  background: #fff;
  box-shadow: 0 4px 10px 4px rgba(0,0,0,.2);
}
.add-user-title {
  background: #f5f6fa;
  box-shadow: inset 0 -1px 0 0 #e6e7eb;
  font-size: 14px;
  color: #5584ff;
  line-height: 40px;
  text-indent: 15px;
}
.demo-ruleForm {
  max-width: 1200px;
}

.add-user-form {
  padding: 40px 20px 0 0;
}
#edit {
}
</style>
