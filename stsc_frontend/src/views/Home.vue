<template>
  <div>
    <div class="header-nav clearfix">
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
    return{}
  },
};
</script>

<style scoped lang="scss">
.header-nav {
  height: 110px;
}
</style>
