<template>
  <!-- 用户管理 -->
  <div class="user-list">
    <div class="user-list-ctn">
      <!-- 查询 -->
      <div class="use-list-check">
        <h1 class="use-list-check_title">查询条件</h1>
        <el-row :gutter="30" class="use-list-check_detail">
          <el-form
            ref="queryForm"
            :model="queryForm"
            size="small"
            label-position="top"
            label-width="100px"
          >
            <el-col :lg="4" :md="6" :sm="8" :xs="12">
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="queryForm.username"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="4" :md="6" :sm="8" :xs="12">
              <el-form-item label="性别" prop="username">
                <el-select
                  v-model="queryForm.sex"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in sexList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="4" :md="6" :sm="8" :xs="12">
              <el-form-item label="类型" prop="type">
                <el-select
                  v-model="queryForm.type"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in userTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="4" :md="6" :sm="8" :xs="12">
              <div class="info-query-btn">
                <el-button
                  type="primary"
                  size="small"
                  :loading="loading"
                  @click="submitFormBtn"
                >
                  查询
                </el-button>
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="resetForm('queryForm')"
                  >重置</el-button
                >
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <!-- 查询结果 -->
      <div class="user-list-result">
        <div class="use-list-result-add">
          <h1 class="use-list-result_title">查询结果</h1>
          <el-button
@click="addUser"
type="primary"
size="small"
            >添加用户</el-button
          >
        </div>

        <!-- 表格 -->
        <el-table
          :data="tableDataList"
          header-row-class-name="table-header"
          stripe
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            type="index"
            :index="indexCpt"
            width="60"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            v-for="item in tableData"
            :key="item.label"
            :label="item.label"
            :prop="item.prop"
            :formatter="formatterData"
          >
          </el-table-column>
          <el-table-column width="260" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="detailHandle(scope.row)"
                type="primary"
                size="small"
                >查看</el-button
              >
              <el-button
                @click="editHandle(scope.row)"
                type="primary"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="deleteHandle(scope.row, scope.$index)"
                type="danger"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 页码 -->
      <page
        :total="total"
        @getCommand="getCommand"
        @changeCurrent="changeCurrent"
        @goPageNumF="goPageNumF"
        ref="page"
      ></page>
    </div>
  </div>
</template>
<script>
import Page from "@/components/Page";
import { queryUser, delUser } from "@/api/user";
import { initNull } from "@/utils/index";
import { userTypeList, sexList } from "@/utils/const";
export default {
  components: {
    Page,
  },
  data() {
    return {
      queryForm: {
        username: "", // 用户名
        type: "", // 类型
        sex: "", // 性别
      },
      loading: false,
      total: 0, // 总条数
      pageNum: 1,
      pageSize: 10,
      tableDataList: [],
      tableData: [
        {
          prop: "username",
          label: "姓名",
        },
        {
          prop: "type",
          label: "类型",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "creattime",
          label: "创建时间",
        },
      ],
      userTypeList,
      sexList,
    };
  },
  computed: {},
  watch: {},
  methods: {
    check() {},
    // 序号
    indexCpt(index) {
      return index + 1 + (this.pageNum - 1) * this.pageSize;
    },
    // 重置form
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // submit 初始化 重新点击按钮，切换每条数量的时候
    submitInit() {
      this.pageNum = 1;
      this.$refs.page.init();
    },
    // 点击按钮查询
    submitFormBtn() {
      this.submitInit();
      this.submitForm();
    },
    // 查询
    submitForm() {
      this.loading = true;
      let parmas = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...initNull(this.queryForm),
      };
      queryUser(parmas)
        .then((res) => {
          if (res.code === 200) {
            this.tableDataList = res.data.list;
            this.total = res.data.total;
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 3000,
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 改变pageSize
    getCommand(num) {
      this.pageSize = num;
      this.submitInit();
      this.submitForm();
    },
    // 改变pageNum
    changeCurrent(num) {
      this.pageNum = num;
      this.submitForm();
    },
    // 跳转的页码
    goPageNumF(num) {
      this.pageNum = num;
      this.submitForm();
    },
    // 跳转到添加页面
    addUser() {
      this.$router.push("/user/add");
    },
    // 详情
    detailHandle(row) {
      this.$router.push({
        path: "/user/detail",
        query: {
          id: row._id,
        },
      });
    },
    // 编辑
    editHandle(row) {
      this.$router.push({
        path: "/user/edit",
        query: {
          id: row._id,
        },
      });
    },
    // 删除
    deleteHandle(row, index) {
      this.$confirm("确定删除改用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteAjax(row._id, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除接口
    deleteAjax(id, index) {
      delUser({ id }).then((res) => {
        if (res.code === 200) {
          this.tableDataList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    // 过滤数据
    formatterData(row, column, cellValue, index) {
      let label;
      let ary;
      switch (column.property) {
        case "type":
          ary = this.userTypeList;
          break;
        case "sex":
          ary = this.sexList;
          break;
        default:
          break;
      }
      if (!ary) {
        return cellValue;
      }
      ary.forEach((item) => {
        if (item.value === cellValue) {
          label = item.label;
        }
      });
      return label;
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {
    this.submitForm();
  }, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* 下拉框 */
/deep/ .user-list-ctn .el-select {
  display: block;
}
/deep/ .user-list-ctn .el-input--small {
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
.user-list {
  .user-list-ctn {
    height: 100%;
    overflow: auto;
  }
  .use-list-check {
    border-radius: 6px;
    .use-list-check_detail {
      background: #fff;
      padding: 15px 0;
      margin: 0 !important;
    }
    .use-list-check_title {
      background: #f5f6fa;
      box-shadow: inset 0 -1px 0 0 #e6e7eb;
      font-size: 14px;
      color: #5584ff;
      line-height: 40px;
      text-indent: 15px;
    }
  }
  .use-list-result-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background: #f5f6fa;
    height: 60px;
  }
  .use-list-result_title {
    font-size: 14px;
    color: #5584ff;
  }
  .info-query-btn {
    margin-top: 42px;
  }
}
</style>
