<template>
  <el-container>
    <el-header class="my_header">
      <div class="left">
        <i
          @click="isCollapse=!isCollapse"
          class="ico"
          :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'"
        ></i>
        <img class="index_logo" src="./img/index_logo.png" alt />
        <span class="text">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="$store.state.avatar" alt />
        <span class="name">{{$store.state.username}},您好</span>
        <el-button @click="goOut" type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my_aside" width="auto">
        <el-menu router default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">

          <template v-for="(item, index) in route" >
            <el-menu-item :index="/index/+item.path" :key="index" v-if="item.meta.role.includes($store.state.Role)">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>

        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入子路由
import route from "@/router/rout.js"
import { logout } from "@/api/index.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  beforeCreate() {
    if (!getToken()) {
      this.$message.error("还没有登录,请您先登录!");
      this.$router.push("/login");
    }
  },
  data() {
    return {
      route,
      // 是否收起
      isCollapse: false,
      // 用户名
      username: "",
      // 头像
      avatar: ""
    };
  },
  // created() {

  //   //   页面加载发送请求 获取用户名和头像信息
  //   info().then(res => {
  //     // window.console.log(res);
  //     this.username = res.data.data.username;
  //     // 注意这里返回的是没有基地址的图片路径 所以要给他添加上去  细节:中间还有斜杠 /
  //     this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
  //   });
  // },

  methods: {
    //   点击退出
    goOut() {
      this.$confirm("此操作将退出本系统, 是否继续退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              removeToken();
              // 清空vuex的记录
              this.$store.commit("changeUsername", "");
              this.$store.commit("changeAvatar", "");

              this.$message.success("退出成功!");
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "谢谢您还留下来!!!"
          });
        });
    }
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.el-container {
  height: 100%;
}
.my_header {
  background-color: #fff;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;

    .ico {
      font-size: 24px;
      color: #000;
      cursor: pointer;
    }
    .index_logo {
      width: 33px;
      height: 28px;
      margin-left: 22px;
      margin-right: 11px;
    }
    .text {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    .avatar {
      width: 43px;
      height: 43px;
      margin-right: 9px;
    }
    .name {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      margin-right: 38px;
    }
  }
}
.my_aside {
  background-color: #fff;
}
.my_main {
  background-color: yellowgreen;
  overflow: hidden !important;
}

// 侧边导航栏样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>