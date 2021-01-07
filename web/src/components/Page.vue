<template>
  <div class="page-box">
    <footer class="page">
      <!-- 共  条记录 -->
      <span class="page-total">共 {{ total }} 条记录</span>
      <!-- 上一页 下一页 -->
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        class="page-page"
        @current-change="changeCurrent"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
      ></el-pagination>
      <div class="page-right">
        <el-dropdown
          class="self-pagination-drop"
          @command="getCommand"
          trigger="click"
          style="cursor: pointer"
        >
          <span class="el-dropdown-link">
            <!-- 每页/行 -->
            每页/行
            <b class="drop-b" style="color: #1790ff">
              {{ pageSize }}
            </b>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="10">10</el-dropdown-item>
            <el-dropdown-item command="20">20</el-dropdown-item>
            <el-dropdown-item command="30">30</el-dropdown-item>
            <el-dropdown-item command="40">40</el-dropdown-item>
            <el-dropdown-item command="50">50</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="page-one">
          <!-- 共 -->
          共
          <b v-show="total < 1">0</b>
          <b v-show="total <= pageSize && total > 0">1</b>
          <b v-show="total > pageSize">{{
            (total - (total % pageSize)) / pageSize + 1
          }}</b>
          <!-- 页 -->
          页
        </div>
        <div class="page-to">
          <!-- 转到 -->
          <span>转到</span>
          <el-input
            size="mini"
            @keyup.native.enter="goPageNumF"
            v-model.number="toPageIndex"
            class="input-medium"
          />
          <span> 页</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["total"],
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      toPageIndex: "",
    };
  },
  methods: {
    getCommand(pageSize) {
      // 切换每页条数
      this.pageNum = 1;
      this.pageSize = parseInt(pageSize);
      this.$emit("getCommand", pageSize);
    },
    changeCurrent(pageNum) {
      // 获取切换页的值，并转给父组件
      this.$emit("changeCurrent", pageNum);
    },
    goPageNumF() {
      // 跳转到多少页
      if (this.toPageIndex <= 0) this.toPageIndex = 1;
      this.pageNum = this.toPageIndex;
      this.$emit("goPageNumF", this.toPageIndex);
    },
    // 初始化 pageNum toPageIndex
    init() {
      this.pageNum = 1;
      this.toPageIndex = "";
    }
  },
};
</script>

<style lang="scss" scoped>
.page-box {
  background-color: #fff;
  padding: 40px 0px;
}
.page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  font-weight: 400;
  color: #4a5b6d;
  position: relative;
  padding: 0px 30px;
  .page-right {
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .self-pagination-drop {
      border: 1px solid #c0c0c0;
      border-radius: 3px;
      height: 28px;
      width: 78px;
      line-height: 28px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: #666666;
    }
    .page-one {
      b {
        color: #1790ff;
      }
    }
  }
  .input-medium {
    width: 36px;
  }
}
</style>
<style scoped>
.page >>> .el-pagination {
  display: flex;
  flex-wrap: wrap;
}
.page >>> .el-input__inner {
  padding: 0px;
}
.page >>> .btn-prev {
  padding: 0 10px;
  background-color: #fff;
  border: 1px solid #c4c6cf;
}
.page >>> .btn-next {
  padding: 0 10px;
  background-color: #fff;
  border: 1px solid #c4c6cf;
}
.page >>> .btn-prev span::before {
  content: "<";
  margin-right: 6px;
}
.page >>> .btn-next span::after {
  content: ">";
  margin-left: 6px;
}
.page >>> .page-page .number {
  background: #ffffff;
  border: 1px solid #c4c6cf;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 500;
}
.page >>> .page-page .active {
  border: none;
}
</style>
