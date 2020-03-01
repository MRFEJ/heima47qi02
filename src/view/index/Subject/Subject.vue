<template>
  <div>
    <!-- 行内表单 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="学科名称">
          <el-input class="long" v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="创建者">
          <el-input class="short" v-model="formInline.user"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select class="long" v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button type="primary" @click="onSubmit" icon="el-icon-plus">新增学科</el-button>
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
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else class="jy">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="Status(scope.row.id)"
            >{{ scope.row.status==1? '禁用':'启用'}}</el-button>
            <el-button size="mini" type="text">删除</el-button>
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
  </div>
</template>

<script>
import { subjectList, subjectStatus } from "@/api/Subject.js";
export default {
  data() {
    return {
      // 当前页
      Page: 1,
      // 页容量
      size: 0,
      // 总条数
      totals: 0,
      // 表单
      tableData: [],

      // 行内表格
      formInline: {}
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
        page: 1,
        limit: 5
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
      });
    },
    // 点击禁用
    onSubmit() {
      // console.log("submit!");
    },

    // 分页的函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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