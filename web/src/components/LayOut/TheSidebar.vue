<template>
  <div class="the-sidebar">
    <div class="the-sidebar-title">
      {{ admin ? "admin" : "web" }}
    </div>
    <el-menu
      :default-active="activeIndex"
      class="the-sidebar-menu"
      :backgroundColor="adminClass.bgColor"
      :textColor="adminClass.textColor"
      :unique-opened="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item
        v-for="(item, index) in list"
        :index="index + ''"
        :key="index"
        class="nav_second-title"
        @click="goPage(item, index)"
      >
        <i :class="item.icon" class="iconfont"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getMenu } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      activeIndex: "0",
      list: [],
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    admin() {
      return this.getUserInfo.type === "0";
    },
    //
    adminClass() {
      if (this.admin) {
        return {
          bgColor: "#303133",
          textColor: "#fff",
        };
      }
      return {};
    },
  },
  watch: {
    $route(n, o) {
      if (n.path.indexOf("/home/index") !== -1) {
        this.$router.push("/reload");
      }
    },
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    getMenuF() {
      getMenu().then((res) => {
        if (res.code === 200) {
          this.list = res.data;
          this.getActiveIndex();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    //
    goPage(item) {
      this.$router.push(item.path);
    },
    // 刷新获取单签active
    getActiveIndex() {
      this.list.forEach((element, index) => {
        if (element.path === this.$route.path) {
          this.activeIndex = index + "";
        }
      });
    },
  },
  created() {},
  mounted() {
    this.getMenuF();
  },
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
.the-sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.2);
}
.the-sidebar-title {
  height: 85px;
  line-height: 85px;
  text-align: center;
  font-size: 40px;
  font-style: italic;
  color: #fff;
  letter-spacing: 20px;
  background: $--color-main;
}
.the-sidebar-menu {
  flex: 1;
  overflow: auto;
  .nav-title {
    font-size: 18px;
  }
  .iconfont {
    font-size: 22px;
    padding-right: 10px;
  }
  .nav_second-title {
    font-size: 16px;
  }
}
</style>
