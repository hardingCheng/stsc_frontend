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
          <el-menu-item index="1" route="createlab">
            <i class="el-icon-location"></i>
            <span>创建虚拟实验室</span>
          </el-menu-item>
          <el-menu-item index="2" route="mycreatelabs">
            <i class="el-icon-menu"></i>
            <span slot="title">我创建的虚拟实验室</span>
          </el-menu-item>
          <el-menu-item index="3" route="myjoinlabs">
            <i class="el-icon-document"></i>
            <span slot="title">我加入的虚拟实验室</span>
          </el-menu-item>
          <el-menu-item index="4" route="mymessages">
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
      case '/pc/virtual-laboratory/createlab':
        this.activeIndex = '1'
        break
      case '/pc/virtual-laboratory/mycreatelabs':
        this.activeIndex = '2'
        break
      case '/pc/virtual-laboratory/myjoinlabs':
        this.activeIndex = '3'
        break
      case '/pc/virtual-laboratory/mymessages':
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

<style>
.message-button{display:flex;flex-direction: row;justify-content: space-between}
</style>