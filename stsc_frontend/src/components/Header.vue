<template>
  <div class="header">
    <div class="header-top">
     <div class="container">
       <div class="header-login-nav">
         <div class="header-login-nav-left fl">欢迎您的到来!</div>
         <div class="header-login-nav-right fr" v-if="isLogin">
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
                 <el-dropdown @command="handleCommand">
                   <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                   <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item command="pc">个人中心</el-dropdown-item>
                     <el-dropdown-item command="quit">退出登录</el-dropdown-item>
                   </el-dropdown-menu>
                 </el-dropdown>
               </div>
             </el-col>
           </el-row>
           <div class="header-login-nav-right-notification" v-if="notificationShow">
             <message-notification class="myPanel"></message-notification>
           </div>
         </div>
         <div class="header-login-nav-right fr" v-else>
           <el-row :gutter="20">
             <el-col :span="12">
                <router-link to="/signup">注册</router-link>
             </el-col>
             <el-col :span="12">
               <router-link to="/login">登录</router-link>
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
import MessageNotification from "./MessageNotification";

export default {
  name: "Header",
  components: {MessageNotification},
  data(){
    return {
      notificationShow:false,
    }
  },
  mounted() {
    this.handleHeader()
    this.myPanel()
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
    },
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
    },
    myPanel(){
      document.addEventListener('click', (e)=> {
        if (e.target.className ==='el-icon-bell header-login-nav-i' || e.target.className ==='el-badge__content el-badge__content--undefined is-fixed'){
          this.notificationShow = !this.notificationShow
        }else {
          let arr = Array.from(e.path);
          let result = arr.filter((item,index) => {
            if (item.classList){
              let arr1 = Array.from(item.classList)
              if( arr1.length !==0){
                arr1 = Array.from(arr1)
                return arr1.indexOf("myPanel") === 1
              }
            }
          })
          if(result.length === 0){
            this.notificationShow = false
          }
        }
      })
    },
    handleCommand(command){
      if(command === "pc") {
        this.$router.push("/pc")
      }else if(command === "quit"){
        console.log("退出成功")
      }
    }
  },
  computed:{
    isLogin(){
      return this.$store.getters.getIsLogin
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/mixin';
.header {
  position: fixed;
  top: 0;
  z-index:1999;
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
            /deep/ .el-dropdown {
              height:28px;
            }
            .header-login-nav-usermenu {
              height:100px;
              width:60px;
              background:pink;
            }
          }
          .header-login-nav-right-notification {
            position: absolute;
            top: 40px;
            left: -120px;
            z-index:9999;
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
