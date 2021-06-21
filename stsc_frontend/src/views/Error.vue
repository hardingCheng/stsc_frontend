<template>
  <div>
    {{type ? type : '有一个错误！'}}
  </div>
</template>

<script>
export default {
  props:['type'],
  name: "Error",
  data(){
    return {
      numType:null,
    }
  },
  mounted() {
    // 采用了路由组件传参
    this.numType = this.$route.params.type
  }
};
</script>

<style scoped>

</style>
