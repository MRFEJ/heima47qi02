<template>
  <el-container>
    <el-header class="my_header">Header</el-header>
    <el-container>
      <el-aside  class="my_aside" width="200px">Aside</el-aside>
      <el-main  class="my_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
html,body{
    height: 100%;
}
.el-container{
    height: 100%;
}
.my_header{
    background-color: skyblue;
}
.my_aside{
    background-color: pink;
}
.my_main{
    background-color: yellowgreen;
}
</style>