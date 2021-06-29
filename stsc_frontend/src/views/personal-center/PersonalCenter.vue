<template>
  <div class="personal-center">
   <div class="container">
     <bread-crumb></bread-crumb>
     <div class="common-head-classification">
       <div class="common-head-classification-top">
         <div class="common-head-classification-tab fl">
           <a @click="selecttab(1)" :class="[tabIndex === 1 ?'is_active':'']">我是买家</a>
         </div>
         <div class="common-head-classification-tab fl">
           <a @click="selecttab(2)" :class="[tabIndex === 2 ?'is_active':'']">我是卖家</a>
         </div>
         <div class="common-head-classification-tab fl">
           <a @click="selecttab(3)" :class="[tabIndex === 3 ?'is_active':'']">基本信息</a>
         </div>
       </div>
     </div>
     <router-view/>
   </div>
  </div>
</template>

<script>
import BreadCrumb from "../../components/BreadCrumb";
export default {
  name: "PersonalCenter",
  components: {BreadCrumb},
  data() {
    return {
      tabIndex:3
    }
  },
  beforeMount() {
    switch(this.$route.path.split("/")[2]){
      case 'seller':
        this.tabIndex = 2
        break;
      case 'buyer':
        this.tabIndex = 1
        break;
      case 'basicinfo':
        this.tabIndex = 3
        break;
    }
  },
  watch: {
    $route: {
      handler(to,from) {
        switch(to.path.split("/")[2]){
          case 'seller':
            this.tabIndex = 2
            break;
          case 'buyer':
            this.tabIndex = 1
            break;
          case 'basicinfo':
            this.tabIndex = 3
            break;
        }
      },
      // deep:true,
      // immediate: true
    }
  },
  methods:{
    selecttab(index){
      switch(index) {
        case 1:
          this.tabIndex=index
          this.$router.push("/pc/buyer")
          break
        case 2:
          this.tabIndex=index
          this.$router.push("/pc/seller")
          break
        case 3:
          this.tabIndex=index
          this.$router.push("/pc/basicinfo")
          break
        default:
          this.$router.push("/pc/basicinfo")
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-center {
  .container {
    .common-head-classification {
      background: #FFFFFF;
      border: 1px solid #E7E7E7;
      margin-bottom: 20px;
      .common-head-classification-top {
        height: 50px;
        background: #F1F1F1;
        .common-head-classification-tab {
          text-align: center;
          line-height:50px;
          a {
            height:48px;
            width: 120px;
            display:block;
            font-size: 18px;
            color:#111111;
            font-weight: 400;
            cursor: pointer;
          }

        }
      }
    }
  }
}
.is_active {
  color: #1794FF !important;
  background: #FFFFFF !important;
  border-top: 2px solid #1794FF !important;
}
</style>
