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
      <template v-for="(item, index) in list">
        <el-submenu
          v-if="Array.isArray(item.children)"
          :index="index + ''"
          :key="index"
        >
          <template slot="title">
            <i
              :class="item.icon"
              class="iconfont"
              :style="{ color: item.iconColor }"
            ></i>
            <span class="nav-title">{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(child, index_c) in item.children"
              :index="index + '-' + index_c"
              :key="index + '-' + index_c"
              class="nav_second-title"
              @click="goPage(child, index + '-' + index_c)"
            >
              {{ child.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="index + ''" :key="index">
          <i
            :class="item.icon"
            class="iconfont"
            :style="{ color: item.iconColor }"
          ></i>
          <span slot="title" class="nav-title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      activeIndex: "0-0",
      list: [
        {
          title: "HTML5",
          path: "",
          icon: "icon-html5",
          children: [
            {
              title: "JavaScript",
              url: "JavaScript",
              path: "",
            },
            {
              title: "Html",
              url: "Html",
              path: "",
            },
            {
              title: "Css",
              url: "Css",
              path: "",
            },
          ],
        },
        {
          title: "Vue",
          path: "",
          icon: "icon-vuejs",
          children: [
            {
              title: "Vue-Router",
              url: "VueRouter",
              path: "",
            },
            {
              title: "Vux",
              url: "Vux",
              path: "",
            },
          ],
        },
        {
          title: "React",
          path: "",
          icon: "icon-react",
          children: [],
        },
        {
          title: "Angular",
          path: "",
          icon: "icon-angular",
          children: [],
        },
      ],
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
  watch: {},
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    //
    goPage(item) {
      this.$router.push("/home/index/" + item.url);
    },
    // 刷新获取单签active
    getActiveIndex() {
      this.list.forEach((element, index) => {
        if (Array.isArray(element.children)) {
          element.children.forEach((item, index2) => {
            if (item.url === this.$route.params.type) {
              this.activeIndex = index + "-" + index2;
            }
          });
        }
      });
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {
    this.getActiveIndex();
  }, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.the-sidebar {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px 4px rgba(0,0,0,.2);
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
