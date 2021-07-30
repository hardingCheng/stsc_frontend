<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
        <router-link to="/" v-if="index === 0">{{
            item.meta.name
          }}</router-link>
        <span v-else>{{ item.meta.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
/**
 * 面包屑是和路由仅仅的绑在一起的，因路由设计混乱导致没发进行一些适配
 */
export default {
  // 传递路由的match 来生成相应的配置
  props:{
    info:{
      type:Array
    }
  },
  name: "BreadCrumb",
  data() {
    return {
      routeInfo:[]
    }
  },
  mounted() {
  },
  computed: {
    breadList() {
      return this.$route.matched;
    },
  },
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
