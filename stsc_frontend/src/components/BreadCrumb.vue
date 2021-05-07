<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in info" :key="index" :to="item.path">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props:{
    info:{
      type:Array
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
