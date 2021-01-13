<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.$router.go(-1);
    });
  }
};
</script>

<style></style>
