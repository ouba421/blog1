<template>
  <div class="layout">
    <the-sidebar></the-sidebar>
    <div class="layout_right">
      <the-head></the-head>
      <router-view class="layout_right-view" />
    </div>
  </div>
</template>
<script>
import TheHead from "./TheHead";
import TheSidebar from "./TheSidebar";
export default {
  components: {
    TheHead,
    TheSidebar
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
  .layout {
    height: 100%;
    display: flex;
  }
  .layout_right {
    flex:1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .layout_right-view {
    flex: 1;
    padding: 15px 25px;
    overflow: hidden;
  }
</style>
