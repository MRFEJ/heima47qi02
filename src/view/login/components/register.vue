<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          name="image"
          v-model="form.avatar"
          class="avatar-uploader"
          :action="imgUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

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

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img @click="goCode" class="img_code" :src="code_yz" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
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
import { cell, reg } from "@/api/register.js";
export default {
  data() {
    return {
      imgUrl: process.env.VUE_APP_URL + "/uploads",
      // 头像路径
      imageUrl: "",
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
        rcode: "",
        avatar: ""
      },
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
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
          { max: 12, min: 6, message: "密码必须在6-12位", trigger: "change" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { len: 4, message: "图形码是4位", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 4, message: "验证码是4位", trigger: "blur" }
        ]
      },
      formLabelWidth: "65px"
    };
  },
  methods: {
    //   发送图片验证码
    goCode() {
      this.code_yz =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + "&l=" + Date.now();
    },
    //   点击btn发送短信验证码
    code_bt() {
      if (!/^0?(13|14|15|18)[0-9]{9}$/.test(this.form.phone)) {
        return this.$message.error("手机号格式不正确");
      }
      if (this.form.code.length != 4) {
        return this.$message.error("验证码是4位");
      }
      this.time = 60;
      let times = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(times);
        }
      }, 1000);

      cell({
        code: this.form.code,
        phone: this.form.phone
      }).then(res => {
        //成功回调
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success("验证码为:" + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    sure() {
      this.$refs.form.validate(v => {
        if (v) {
          reg({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            // console.log(res)
            if (res.data.code == 200) {
              this.$message.success("注册成功!");
              this.$refs.form.resetFields();
              this.imageUrl = null;
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },

    // 头像函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);

      this.form.avatar = res.data.file_path;

      this.$refs.form.validateField("avatar");
      // console.log(res, file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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

// 头像样式
.avatar-uploader {
  text-align: center;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>