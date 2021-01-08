<template>
  <div class="add-user">
    <div class="add-user-ctn">
      <h1 class="add-user-title">添加用户</h1>
      <!-- form 表单 -->
      <div class="add-user-form">
        <el-form
          :model="userForm"
          :rules="rules"
          ref="userForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model.trim="userForm.username"
              :maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="path == '/user/add'" label="密码" prop="password">
            <el-input
              v-model.trim="userForm.password"
              :maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="type">
            <el-select v-model="userForm.type" placeholder="请选择用户类型">
              <el-option
                v-for="item in userTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userForm.sex">
              <el-radio
                v-for="item in sexList"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="path !== '/user/detail'">
            <el-button
              type="primary"
              :loading="loading"
              @click="submitForm('userForm')"
              >{{ path === "/user/add" ? "立即创建" : "编辑" }}</el-button
            >
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
          <el-form-item v-else>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { addUser, queryOneUser, editUser } from "@/api/user";
import { userTypeList, sexList } from "@/utils/const";
export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        let rdg = /^([A-Za-z]|[\u4e00-\u9fa5]|[\s]|[0-9])+$/;
        if (!rdg.test(value)) {
          callback(new Error("只能输入中英文或数字"));
        } else {
          callback();
        }
      }
    };
    var validatePassPsw = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        let rdg = /^([A-Za-z]|[0-9])+$/;
        if (!rdg.test(value)) {
          callback(new Error("只能输入数字和英文"));
        } else {
          callback();
        }
      }
    };

    return {
      loading: false,
      path: this.$route.path,
      userForm: {
        username: "", // 用户名
        password: "", // 密码
        type: "", // 类型
        sex: "", // 性别
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { validator: validatePass, trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { validator: validatePassPsw, trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择用户类型", trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择用户性别", trigger: "change" }],
      },
      userTypeList,
      sexList,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 添加用户
    addUserF() {
      this.loading = true;
      addUser(this.userForm)
        .then((res) => {
          if (res.code === 200) {
            this.$confirm("用户创建成功", "提示", {
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
          if (this.path === "/user/add") {
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
      queryOneUser(parmas).then((res) => {
        if (res.code === 200) {
          this.userForm = res.data;
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
      if (["/user/detail", "/user/edit"].includes(this.path)) {
        this.queryDetail();
      }
    },
    // 取消
    cancel() {
      this.$router.go(-1);
    },
  },
  created() {},
  mounted() {},
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
  max-width: 500px;
}
.add-user-form {
  padding: 40px 20px 0 0;
}
</style>
