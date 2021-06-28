<template>
  <div class="seller-index">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
          <el-menu-item index="1" route="realauth">
            <i class="el-icon-location"></i>
            <span>资质认证</span>
          </el-menu-item>
          <el-menu-item index="2" route="myservice">
            <i class="el-icon-menu"></i>
            <span slot="title">我的服务</span>
          </el-menu-item>
          <el-menu-item index="3" route="myorder">
            <i class="el-icon-document"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="4" route="mynews">
            <i class="el-icon-setting"></i>
            <span slot="title">我的消息</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      activeIndex:'1'
    }
  },
  mounted() {
    switch(this.$route.path){
      case '/pc/seller/realauth':
        this.activeIndex = '1'
        break
      case '/pc/seller/mydemand':
        this.activeIndex = '2'
        break
      case '/pc/seller/myorder':
        this.activeIndex = '3'
        break
      case '/pc/seller/mynews':
        this.activeIndex = '4'
        break
      default:
        this.activeIndex = '1'
        break
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.seller-index {
  /deep/ .el-menu-item {
    padding :0 !important;
    text-align: center;
  }
}

</style>
