<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth"  prop="code">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img @click="goCode" class="img_code" :src="code_yz" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth"  prop="rcode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button :disabled="time!=0" @click="code_bt">{{ time==0? '获取用户验证码':'还有'+time+'秒'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 短信计时
      time: 0,
      // 验证码发送
      code_yz: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      dialogFormVisible: false,
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: ""
      },
      rules: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, mesage: "邮箱格式不正确", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { pattern: /0?(13|14|15|18)[0-9]{9}/, mesage: "手机号格式不正确", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { max: 12, min: 6, mesage: "密码必须在6-12位", trigger: "change" }
        ],
        code: [{ required: true, message: "图形码不能为空", trigger: "blur" }],
        rcode: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      },
      formLabelWidth: "65px"
    };
  },
  methods: {
    //   发送图片验证码
    goCode() {
      this.code_yz =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + "&l=" + new Date();
    },
    //   点击btn发送短信验证码
    code_bt() {
      this.time = 60;
      let times = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(times);
        }
      }, 1000);

      this.$axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          code: this.form.code,
          phone: this.form.phone
        },
        withCredentials: true
      }).then(res => {
        //成功回调
        console.log(res);
        if(res.data.code==200){
            alert('验证码为:'+res.data.data.captcha)
        }else{
            alert(res.data.message)
        }
      });
    },
    sure(){
        this.$refs.form.validate(v=>{
            if(v){
                alert('验证通过')
            }
        })
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #01c5fb, #1396fd);
  .el-dialog__title {
    color: #fff;
  }
}
.img_code {
  width: 100%;
}
</style>