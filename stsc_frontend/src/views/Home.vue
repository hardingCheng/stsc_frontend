<template>
  <div>
    <Header/>
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from '../components/Header'
export default {
  name: "Home",
  components:{
    Header,
    Footer
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
