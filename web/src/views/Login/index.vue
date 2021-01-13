<template>
  <div class="login">
    <!-- 气泡 -->
    <ul class="bg-bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
    <!-- form -->
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="0"
      class="login-form"
    >
      <el-form-item>
        <span class="login-title">欢迎，请登录</span>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          :loading="loading"
          type="primary"
          @click="submitForm('loginForm')"
          >登 陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { login } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {
  },
  watch: {},
  methods: {
    ...mapMutations(["setAdmin", "setUserInfo"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userLogin();
        } else {
          return false;
        }
      });
    },
    // 用户登录
    userLogin() {
      this.loading = true;
      login(this.loginForm)
        .then((res) => {
          if (res.code === 200) {
            let user = res.data;
            this.setUserInfo(user);
            // "0" 是管理员
            if (user.type === "0") {
              this.$router.push("/user");
            } else {
              this.$router.push("/home");
            }
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
  },
  created() {},
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #3797ef, #85bff3);
}
.login-title {
  display: inline-block;
  width: 100%;
  font-size: 26px;
  color: #fff;
  text-align: center;
}
.login-form {
  width: 300px;
  position: relative;
  z-index: 2;
}
.login-btn {
  width: 100%;
  font-size: 18px;
  height: 40px;
  padding: 0;
  box-sizing: border-box;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  li {
    position: absolute;
    bottom: -160px;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    list-style: none;
    animation: square 15s infinite;
    transition-timing-function: linear;
    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 90px;
      height: 90px;
      animation-delay: 2s;
      animation-duration: 7s;
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-duration: 8s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 85%;
      width: 160px;
      height: 160px;
      animation-delay: 5s;
    }
  }
  // 自定义 square 动画；
  @keyframes square {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
}
</style>
