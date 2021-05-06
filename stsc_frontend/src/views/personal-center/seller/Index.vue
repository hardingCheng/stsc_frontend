<template>
  <div class="seller-index">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
          <el-menu-item index="1" route="/seller/realauth">
            <i class="el-icon-location"></i>
            <span>实名认证</span>
          </el-menu-item>
          <el-menu-item index="2" route="/seller/myservice">
            <i class="el-icon-menu"></i>
            <span slot="title">我的服务</span>
          </el-menu-item>
          <el-menu-item index="3" route="/seller/myorder">
            <i class="el-icon-document"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="4" route="/seller/mynews">
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
