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
export default {
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
