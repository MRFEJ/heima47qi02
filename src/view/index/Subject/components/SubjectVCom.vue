<template>
  <el-dialog width="600px" center :title="isCom? '新增学科':'编辑学科'" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd,subjectEdit } from "@/api/Subject.js";
export default {
  data() {
    return {
      isCom: true,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      rules: {
        rid: [{ required: true, message: "学科编号不能留空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能留空", trigger: "blur" }]
      }
    };
  },
  methods: {
    sure() {
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isCom) {
            subjectAdd(this.form).then(res => {
              //   window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增成功!");
                this.$parent.Page = 1;
                this.$parent.subject();
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            });
          }else{
            subjectEdit(this.form).then(res => {
              //   window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功!");
                this.$parent.subject();
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>