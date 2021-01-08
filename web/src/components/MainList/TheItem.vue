<template>
  <div class="item">
    <div class="item-left">
      <p class="item-left-top">
        大帅搞全栈/16小时前/{{item.type}}
      </p>
      <p class="item-left-title" @click="goArticelDtl">
        {{item.title}}
      </p>
      <ul class="item-left-handle">
        <li>
          <i class="iconfont icon-tubiaozhizuo-"></i>
          <span>999+</span>
        </li>
        <li>
          <i class="iconfont icon-pinglun"></i>
          <span>999+</span>
        </li>
      </ul>
    </div>
    <div class="item-right">
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 去文章详情
    goArticelDtl() {
      this.$router.push(`/article/detail/${item._id}`);
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
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.item{
  display: flex;
  height: 100px;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.item-left{
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-left-top{
  font-size: 14px;
  color: #b2bac2;
}
.item-left-title{
  font-size: 20px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    color: $--color-main;
  }
}
.item-left-handle{
  display: flex;
  font-size: 16px;
  color: #b2bac2;
  >li{
    margin-right: 20px;
  }
  .iconfont{
    padding-right: 10px;
  }
}
.item-top-left{
  width: 20%;
}
</style>
