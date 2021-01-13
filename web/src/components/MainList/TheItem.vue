<template>
  <div class="item">
    <div class="item-left">
      <p class="item-left-top">
        {{item.creatman.username}} | {{moment(item.creattime).calendar()}} | {{item.type | typeFilter}}
      </p>
      <p class="item-left-title" @click="goArticelDtl(item)">
        {{item.title}}
      </p>
      <ul class="item-left-handle">
        <li>
          <i class="iconfont icon-tubiaozhizuo-"></i>
          <span>999+</span>
        </li>
        <li>
          <i class="iconfont icon-pinglun"></i>
          <span>{{item.commentnum}}</span>
        </li>
      </ul>
    </div>
    <div class="item-right">
    </div>
  </div>
</template>
<script>
import { articleType } from "@/utils/const";
import moment from "moment";
moment.locale("zh-cn");
export default {
  components: {},
  data() {
    return {
      moment
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {},
  filters: {
    typeFilter(type) {
      let value;
      articleType.forEach(element => {
        if (element.value === type) {
          value = element.label;
        }
      });
      return value;
    }
  },
  watch: {},
  methods: {
    // 去文章详情
    goArticelDtl(item) {
      this.$router.push(`/article/detail/?id=${item._id}`);
    },
    //
  },
  created() {},
  mounted() {
  },
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
  color: #333;
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
