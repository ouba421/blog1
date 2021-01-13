<template>
  <div class="home">
    <main-list
      v-if="flag"
      class="home-left"
      :list="list"
      @load="submitForm"
      @query="queryNew"
    ></main-list>
  </div>
</template>
<script>
import MainList from "@/components/MainList";
import { queryArticle } from "@/api/article";
export default {
  components: {
    MainList,
  },
  data() {
    return {
      pageNum: 0,
      pageSize: 5,
      list: [],
      filterType: "", // 过滤字段
      flag: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 查询初始化
    init() {
      this.pageNum = 0;
      this.list.length = 0;
      // 初始化组件
      this.flag = false;
      this.$nextTick(() => {
        this.flag = true;
      });
    },
    // 查询
    submitForm() {
      let params = {
        pageNum: ++this.pageNum,
        pageSize: this.pageSize,
        type: this.$route.params.type,
      };
      this.filterType && (params.filter = this.filterType);
      queryArticle(params)
        .then((res) => {
          if (res.code === 200) {
            this.list = this.list.concat(res.data.list);
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 3000,
            });
          }
        })
        .finally(() => {});
    },
    // 排序查询
    queryNew(filterName) {
      this.filterType = filterName;
      this.init();
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
.home {
}
.home-left {
}
</style>
