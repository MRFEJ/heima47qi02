<template>
  <div>
    <!-- 行内表单 -->
    <el-card class="box-card">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>

        <el-form-item label="学科名称" prop="name">
          <el-input class="long" v-model="formInline.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="long" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sarch">搜索</el-button>
          <el-button @click="del">清除</el-button>
          <el-button @click="add" type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简写"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time | filterData }}</template>
        </el-table-column>
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

    <SubjectVCom ref="SubjectVCom"></SubjectVCom>
  </div>
</template>

<script>
// 导入子组件
import SubjectVCom from "./components/SubjectVCom.vue";
import { subjectList, subjectStatus, subjectRemove } from "@/api/Subject.js";
export default {
  name: "Subject",
  components: {
    SubjectVCom
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
    this.subject();
  },
  methods: {
    // 点击禁用
    Status(id) {
      subjectStatus({ id }).then(() => {
        this.subject();
      });
    },
    // 获取学科列表函数
    subject() {
      subjectList({
        // 要第几页的内容
        page: this.Page,
        // 要多少页容量
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // window.console.log(res)
        this.tableData = res.data.data.items;
        this.totals = res.data.data.pagination.total;
      });
    },

    // 分页的函数页容量改变事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.Page = 1;
      this.subject();
    },
    // 第几页的事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.Page = val;
      this.subject();
    },

    // 搜索的点击事件
    sarch() {
      this.Page = 1;
      this.subject();
    },
    // 点击清空筛选
    del() {
      this.$refs.form.resetFields();
      this.Page = 1;
      this.subject();
    },

    // 删除学科
    remov(id) {
      subjectRemove({ id }).then(() => {
        if (this.tableData.length == 1) {
          this.Page--;
        }
        if (this.Page == 0) {
          this.Page = 1;
        }
        this.subject();
      });
    },

    // 新增学科
    add() {
      this.$refs.SubjectVCom.isCom = true;
      this.$refs.SubjectVCom.dialogFormVisible = true;
      this.$refs.SubjectVCom.form = {};
    },
    // 编辑学科
    edit(item) {
      this.$refs.SubjectVCom.isCom = false;
      this.$refs.SubjectVCom.dialogFormVisible = true;
      // 如果后面点击的那行不是前面点击的那行 就重新赋值 如果2次点击是同一行就不赋值
      if (this.oldItem != item) {
        this.$refs.SubjectVCom.form = { ...item };
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