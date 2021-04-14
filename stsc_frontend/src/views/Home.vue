<template>
  <div>
    <Header/>
    <router-view />
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: "Home",
  components:{
    Header
  },
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
