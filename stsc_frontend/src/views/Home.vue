<template>
  <div>
    <router-view />
    {{list}}
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      list:[]
    }
  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">

</style>
