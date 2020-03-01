<template>
  <div class="login">
    <div class="login_left">
      <div class="login_title">
        <img class="login_logo" src="./img/login_logo.png" alt />
        <span class="l_text">黑马面面</span>
        <span class="l_s"></span>
        <span class="l_text">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input clearable prefix-icon="el-icon-user" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            clearable
            show-password
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input
                clearable
                prefix-icon="el-icon-key"
                v-model="form.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="img_code" class="img_code" :src="imgUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-row>
            <el-col>
              <el-button type="primary" @click="submitForm">立即登录</el-button>
              <el-button type="primary" @click="Login_reg">注册</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册 -->
    <reg ref="reg"></reg>
    <img src="./img/login_banner_ele.png" alt />
  </div>
</template>

<script>
import {login} from "@/api/login.js"
import reg from "./components/register"

import {setToken} from "@/utils/token.js"
export default {
  components: {
    reg
  },
  data() {
    return {
      // 图片验证码
      imgUrl: process.env.VUE_APP_URL+"/captcha?type=login",
      form: {
        phone: "18511111111",
        password: "12345678",
        code: "",
        checked: true
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^0?(13|14|15|18)[0-9]{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],

        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { max: 12, min: 6, message: "密码在6-12位", trigger: "change" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len:4, message: "验证码是4位", trigger: "blur" }
        ],
        checked: [
          {
            pattern: /true/,
            message: "请勾选我已阅读并同意用户协议和隐私条款",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 点击登录
    submitForm() {
      this.$refs.form.validate(v => {
        if (v) {
          login({
            phone:this.form.phone,
            password:this.form.password,
            code:this.form.code
          }).then(res=>{
            // console.log(res)
            if(res.data.code==200){
              // window.localStorage.setItem("token",res.data.data.token);
              setToken(res.data.data.token)
              this.$router.push('/index');
            }else{
              this.img_code()
              this.$message.error(res.data.message)
            }
          })
        }
      });
    },
    // 点击注册
    Login_reg() {
      this.$refs.reg.dialogFormVisible = true;
    },
    // 点击图片验证码
    img_code(){
      this.imgUrl= process.env.VUE_APP_URL+"/captcha?type=login"+"&a="+Date.now()
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .login_left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .login_title {
      display: flex;
      align-items: center;
      margin-bottom: 29px;
      .login_logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .l_s {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-left: 14px;
        margin-right: 12px;
      }
      .l_text {
        font-size: 24px;
        color: rgba(12, 12, 12, 1);
      }
    }
    .el-button {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
    .img_code {
      width: 100%;
      height: 40px;
    }
  }
}
html,
body {
  height: 100%;
}
</style>