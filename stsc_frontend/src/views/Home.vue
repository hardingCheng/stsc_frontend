<template>
  <div>
    <div class="header-nav">
      <Header/>
    </div>
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
.header-nav {
  position: fixed;
  top: 0;
  z-index:99999;
  width: 100%;
}
</style>
