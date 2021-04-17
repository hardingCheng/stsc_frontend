<template>
  <div class="header">
    <div class="header-top">
     <div class="container">
       <div class="header-login-nav">
         <div class="header-login-nav-left fl">欢迎您的到来!</div>
         <div class="header-login-nav-right fr">
           <el-row :gutter="20">
             <el-col :span="12"><div class="header-login-nav-info">
               <el-badge :value="12" class="item">
                 <i class="el-icon-bell header-login-nav-i"></i>
               </el-badge>
             </div></el-col>
             <el-col :span="12"><div class="header-login-nav-avatar">
               <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
             </div></el-col>
           </el-row>
         </div>
       </div>
     </div>
    </div>
    <div class="header-bottom" id="header-bottom">
      <div class="container">
       <div class="header-main-nav">
         <el-row :gutter="20">
           <el-col :span="4">
             <div class="header-main-logo">
              <router-link to="/login">LOGO</router-link>
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
export default {
  name: "Header",
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollY = document.documentElement.scrollTop
      if (scrollY > 250) {
        document.getElementById('header-bottom').style.setProperty("background","#1794FF")
      } else {
        document.getElementById('header-bottom').style.setProperty("background","")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  .header-top {
    width:100%;
    height:40px;
    background: #FBFBFB;
    overflow:hidden;
    .container {
      .header-login-nav {
        line-height:40px;
        .header-login-nav-left {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .header-login-nav-right {
          margin-top:5px;
          .header-login-nav-info {
            .header-login-nav-i {
              font-size: 25px;
            }
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
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
      .header-main-bar {
        .header-main-bar-tab {
          display: flex;
          justify-content:flex-end;
          li {
            height:69px;
            line-height:70px;
            margin-left:59px;
            font-size: 16px;
            font-weight: 500;
            color: #FFFFFF;
            cursor: pointer;
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
            height: 40px;
            width: 92px;
            border:1px solid #FFFFFF;
            cursor: pointer;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
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
  top: 5px;
  right: 15px;
  transform: translateY(-50%) translateX(100%);
}
</style>
