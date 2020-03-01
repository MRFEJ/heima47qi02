<template>
  <div>
    <!-- 行内表单 -->
    <el-card class="box-card">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input class="long" v-model="formInline.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select class="long" v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sarch">搜索</el-button>
          <el-button @click="del">清除</el-button>
          <el-button @click="add" type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else class="jy">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" size="mini" type="text">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="Status(scope.row.id)"
            >{{ scope.row.status==1? '禁用':'启用'}}</el-button>
            <el-button size="mini" type="text" @click="remov(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="fy">
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        ></el-pagination>
      </div>
    </el-card>

    <userCom ref="userCom"></userCom>
  </div>
</template>

<script>
// 导入子组件
import userCom from "./components/userCom.vue";
import { userList, userStatus, userRemove } from "@/api/user.js";
export default {
  name: "user",
  components: {
    userCom
  },
  data() {
    return {
      // 当前页
      Page: 1,
      // 页容量
      size: 5,
      // 总条数
      totals: 0,
      // 表单
      tableData: [],

      // 行内表格
      formInline: {},
      // 保存老数据
      oldItem: ""
    };
  },
  created() {
    this.user();
  },
  methods: {
    // 点击禁用
    Status(id) {
      userStatus({ id }).then(() => {
        this.user();
      });
    },
    // 获取用户列表函数
    user() {
      userList({
        // 要第几页的内容
        page: this.Page,
        // 要多少页容量
        limit: this.size,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.data.items;
        this.totals = res.data.data.pagination.total;
      });
    },

    // 分页的函数页容量改变事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.Page = 1;
      this.user();
    },
    // 第几页的事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.Page = val;
      this.user();
    },

    // 搜索的点击事件
    sarch() {
      this.Page = 1;
      this.user();
    },
    // 点击清空筛选
    del() {
      // 注意要让表单清空  要加prop属性  resetFields()才能生效
      this.$refs.form.resetFields();
      this.Page = 1;
      this.user();
    },

    // 删除用户
    remov(id) {
      userRemove({ id }).then(() => {
        if (this.tableData.length == 1) {
          this.Page--;
        }
        if (this.Page == 0) {
          this.Page = 1;
        }
        this.user();
      });
    },

    // 新增用户
    add() {
      this.$refs.userCom.isCom = true;
      this.$refs.userCom.dialogFormVisible = true;
      this.$refs.userCom.form = {};
    },
    // 编辑用户
    edit(item) {
      this.$refs.userCom.isCom = false;
      this.$refs.userCom.dialogFormVisible = true;
      // 如果后面点击的那行不是前面点击的那行 就重新赋值 如果2次点击是同一行就不赋值
      if (this.oldItem != item) {
        if (item.status) {
          this.$refs.userCom.ztai = "启用";
        } else {
          this.$refs.userCom.ztai = "禁用";
        }
        // if(item.)
        this.$refs.userCom.form = { ...item };
        this.oldItem = item;
      }
    }
  }
};
</script>

<style>
.box-card:nth-child(2) {
  margin-top: 19px;
}
.long {
  width: 140px !important;
}
.short {
  width: 100px !important;
}
.fy {
  margin: 0 auto;
  margin-top: 20px;
  width: 543px;
}
.jy {
  color: red;
}
</style>