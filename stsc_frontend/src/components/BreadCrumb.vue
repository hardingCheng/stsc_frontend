<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in routeInfo" :key="index" :to="item.path">
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
  name: "BreadCrumb",
  data() {
    return {
      routeInfo:[]
    }
  },
  mounted() {
    // console.log(this.$route)
    // if (this.$route?.redirectedFrom){
    //   console.log(this.$route.matched[1])
    // }
    // this.routeInfo.length = 0
    // this.routeInfo.push({
    //   title:this.$route.meta.name,
    //   path:this.$route.path
    // })
    let matched = this.$route.matched;
    matched = matched.filter(item => {
      return item && item.meta && item.meta.name;
    });
    const temp = matched.map((item) => {
      return {
        path: item.path,
        title: item.meta.name,
      }
    });
    this.routeInfo = [].concat(temp)
  },
  watch: {
    $route: {
      handler(to,from) {
        console.log(to,from)
      },
      // deep:true,
      immediate: true
    }
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
