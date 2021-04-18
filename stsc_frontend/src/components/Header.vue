<template>
  <div class="header">
    <div class="header-top">
     <div class="container">
       <div class="header-login-nav">
         <div class="header-login-nav-left fl">欢迎您的到来!</div>
         <div class="header-login-nav-right fr">
           <el-row :gutter="20">
             <el-col :span="12">
               <div class="header-login-nav-info">
               <el-badge :value="12" class="item">
                 <i class="el-icon-bell header-login-nav-i"></i>
               </el-badge>
             </div>
             </el-col>
             <el-col :span="12">
               <div class="header-login-nav-avatar">
                <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
               </div>
             </el-col>
           </el-row>
         </div>
       </div>
     </div>
    </div>
    <div class="header-bottom clearfix" id="header-bottom">
      <div class="container">
       <div class="header-main-nav">
         <el-row :gutter="20">
           <el-col :span="4">
             <div class="header-main-logo">
              <router-link to="/index">LOGO</router-link>
             </div>
           </el-col>
           <el-col :span="16">
             <div class="header-main-bar">
               <ul class="header-main-bar-tab">
                 <router-link to="/index"><li>首页</li></router-link>
                 <router-link to="/ld"><li>找需求</li></router-link>
                 <router-link to="/ls"><li>找服务</li></router-link>
                 <router-link to="/sc"><li>科技咨询</li></router-link>
                 <router-link to="/pc"><li>个人中心</li></router-link>
               </ul>
             </div>
           </el-col>
           <el-col :span="4">
             <div class="header-main-bar">
               <ul class="header-main-bar-btn">
                 <router-link to="/sd"><li>发需求</li></router-link>
                 <router-link to="/ss"><li>发服务</li></router-link>
               </ul>
             </div>
           </el-col>
         </el-row>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "Header",
  data(){
    return {

    }
  },
  mounted() {
    this.handleHeader()
  },
  watch: {
    $route(to,from) {
      if (to.name === 'index'){
        document.getElementById('header-bottom').style.setProperty("background","transparent")
        window.addEventListener("scroll",this.handleScroll)
      }else {
        document.getElementById('header-bottom').style.setProperty("background","#1794FF")
        window.removeEventListener("scroll",this.handleScroll)
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleScroll() {
      let scrollY = document.documentElement.scrollTop
      if (scrollY > 250) {
        document.getElementById('header-bottom').style.setProperty("background","#1794FF")
      } else {
        document.getElementById('header-bottom').style.setProperty("background","transparent")
      }
    },
    handleHeader(){
      if (this.$router.history.current.name === 'index'){
        document.getElementById('header-bottom').style.setProperty("background","transparent")
        window.addEventListener("scroll",this.handleScroll)
      }else {
        document.getElementById('header-bottom').style.setProperty("background","#1794FF")
        window.removeEventListener("scroll",this.handleScroll)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixin';
.header {
  position: fixed;
  top: 0;
  z-index:99999;
  width: 100%;
  height: 110px;
  .header-top {
    @include wh(100%,40px);
    background: #FBFBFB;
    .container {
      .header-login-nav {
        line-height:40px;
        .header-login-nav-left {
          @include font-config(14px,'PingFangSC-Regular, PingFang SC',400,#666666)
        }
        .header-login-nav-right {
          position: relative;
          height:40px;
          .header-login-nav-info {
            .header-login-nav-i {
              padding-top: 5px;
              font-size: 25px;
            }
          }
          .header-login-nav-avatar {
            padding-top: 5px;
          }
        }
      }
    }
  }
  .header-bottom {
    height: 70px;
    .header-main-nav {
      .header-main-logo {
        a {
          line-height:70px;
          @include font-config(30px,'PingFangSC-Regular, PingFang SC',500,#FFFFFF)
        }
      }
      .header-main-bar {
        .header-main-bar-tab {
          display: flex;
          justify-content:flex-end;
          li {
            height:69px;
            line-height:69px;
            margin-left:59px;
            cursor: pointer;
            @include font-config(16px,'PingFangSC-Regular, PingFang SC',500,#FFFFFF);
            &:last-child{
              margin-right: 20px;
            }
            &:hover {
              border-bottom: 1px solid #fff;
            }
          }
        }
        .header-main-bar-btn {
          display: flex;
          justify-content:space-between;
          align-items:center;
          height:70px;
          li {
            text-align: center;
            line-height:40px;
            box-sizing: border-box;
            border:1px solid #FFFFFF;
            cursor: pointer;
            @include wh(92px,40px);
            @include font-config(16px,'PingFangSC-Regular, PingFang SC',400,#FFFFFF);
            &:first-child {
              margin-right: 10px;
            }
            &:hover {
              background:#FFFFFF;
              color: #000;
            }
          }
        }
      }
    }
  }
}
/deep/.el-badge__content.is-fixed {
  position: absolute;
  top: 8px;
  right: 15px;
  transform: translateY(-50%) translateX(100%);
}
</style>
