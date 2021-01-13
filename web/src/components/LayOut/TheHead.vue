<template>
  <div class="header" :class="[admin ? 'admin' : 'client']">
    <el-avatar :size="50" :src="headerImg"></el-avatar>
    <el-dropdown @command="command">
      <span class="el-dropdown-link">
        <b class="el-dropdown-link_name">{{ getUserInfo.username }}</b
        ><i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    admin() {
      return this.getUserInfo.type === "0";
    },
    headerImg() {
      return this.getUserInfo.sex === "0"
        ? require("@/assets/images/header_woman.png")
        : require("@/assets/images/header_man.png");
    },
  },
  watch: {},
  methods: {
    // 登出
    loginOut() {
      this.$router.push("/login");
      sessionStorage.clear();
    },
    command(key) {
      switch (key) {
        case "1":
          this.loginOut();
          break;
        default:
          break;
      }
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
.header {
  width: 100%;
  box-sizing: border-box;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.2);
}
.el-dropdown-link {
  cursor: pointer;
  margin-left: 20px;
  .el-dropdown-link_name {
    font-size: 18px;
    color: $--color-main;
    padding-right: 10px;
  }
}
.client {
  background: #fff;
  .el-dropdown-link {
    .el-dropdown-link_name {
      color: $--color-main;
    }
  }
}
.admin {
  background: $--color-dark;
  .el-dropdown-link {
    .el-dropdown-link_name {
      color: #fff;
    }
  }
}
</style>
