<template>
  <div class="buyer-index">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
          <el-menu-item index="1" route="/buyer/realauth">
            <i class="el-icon-location"></i>
            <span>实名认证</span>
          </el-menu-item>
          <el-menu-item index="2" route="/buyer/mydemand">
            <i class="el-icon-menu"></i>
            <span slot="title">我的需求</span>
          </el-menu-item>
          <el-menu-item index="3" route="/buyer/myorder">
            <i class="el-icon-document"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="4" route="/buyer/mynews">
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
  watch: {
    $route(to,from){
      switch(to.path){
        case '/buyer/realauth':
          this.activeIndex = '1'
          break
        case '/buyer/mydemand':
          this.activeIndex = '2'
          break
        case '/buyer/myorder':
          this.activeIndex = '3'
          break
        case '/buyer/mynews':
          this.activeIndex = '4'
          break
        default:
          this.activeIndex = '1'
          break
      }
    }
  },
  mounted() {
    switch(this.$route.path){
      case '/buyer/realauth':
        this.activeIndex = '1'
        break
      case '/buyer/mydemand':
        this.activeIndex = '2'
        break
      case '/buyer/myorder':
        this.activeIndex = '3'
        break
      case '/buyer/mynews':
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
.buyer-index {
  /deep/ .el-menu-item {
    padding :0 !important;
    text-align: center;
  }
}

</style>
