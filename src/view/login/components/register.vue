<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img @click="goCode" class="img_code" :src="code_yz" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
              <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
        // 验证码发送
        code_yz:process.env.VUE_APP_URL+'/captcha?type=sendsms',
      dialogFormVisible: false,
      form: {},
      rules: {},
      formLabelWidth: "65px"
    };
  },
  methods: {
      goCode(){
          this.code_yz=process.env.VUE_APP_URL+'/captcha?type=sendsms'+'&l='+new Date();
      }
  },
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #01c5fb, #1396fd);
  .el-dialog__title {
    color: #fff;
  }
}
.img_code{
    width: 100%;
}
</style>