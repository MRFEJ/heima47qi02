<template>
  <div class="login">
    <div class="login-left"></div>
    <img src="./img/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
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
  .login-left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
  }
}
html,
body {
  height: 100%;
}
</style>