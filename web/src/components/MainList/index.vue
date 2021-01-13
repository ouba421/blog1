<template>
  <div class="main-list" v-infinite-scroll="load">
    <ul class="main-list-select">
      <li @click="emit('hot')">热门</li>
      <li @click="emit('new')">最新</li>
    </ul>
    <the-item v-for="item in list" :key="item._id" :item="item"></the-item>
  </div>
</template>
<script>
import TheItem from "./TheItem";
export default {
  components: {
    TheItem,
  },
  data() {
    return {
      count: 0,
      activeType: ""
    };
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {},
  watch: {
  },
  methods: {
    load() {
      this.$emit("load");
    },
    emit(type) {
      this.$emit("query", type);
    }
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
.main-list {
  height: 100%;
  overflow: auto;
  background: #fff;
}
.main-list-select {
  height: 60px;
  font-size: 16px;
  color: #666;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  > li {
    padding: 0 30px;
    border-right: 1px solid #f1f1f1;
    cursor: pointer;
    &:hover {
      color: $--color-main;
    }
  }
}
</style>
