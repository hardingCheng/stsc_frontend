<template>
  <div class="header">
    <div class="header-top">
     <div class="container">
       <div class="header-login-nav">
         <div class="header-login-nav-left fl">欢迎您的到来!</div>
         <div class="header-login-nav-right fr">
           <div class="header-login-nav-info">
             <el-badge :value="12" class="item">
               <i class="el-icon-bell header-login-nav-i"></i>
             </el-badge>
           </div>
           <div class="header-login-nav-avatar">
             <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
           </div>
         </div>
       </div>
       <div class="header-main-nav">

       </div>
     </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  .header-top {
    width:100%;
    height:40px;
    background: #FBFBFB;
    border: 1px solid black;
    .container {
      .header-login-nav {
        line-height:40px;
        .header-login-nav-left {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .header-login-nav-right {
          .header-login-nav-info {
            .header-login-nav-i {
              font-size: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
