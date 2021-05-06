<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String
    }
  },
  name: "BreadCrumb"
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  /deep/ .el-breadcrumb {
    height:57px;
    line-height:57px;
  }
}
</style>
