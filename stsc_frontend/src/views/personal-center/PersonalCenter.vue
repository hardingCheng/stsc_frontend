<template>
  <div class="personal-center">
   <div class="container">
     <div class="breadcrumb">
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>个人中心</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <div class="common-head-classification">
       <div class="common-head-classification-top">
         <div class="common-head-classification-tab fl">
           <router-link to="/buyer">我是买家</router-link>
         </div>
         <div class="common-head-classification-tab fl">
           <router-link to="/seller">我是卖家</router-link>
         </div>
         <div class="common-head-classification-tab fl">
           <router-link to="/basicinfo">基本信息</router-link>
         </div>
       </div>
     </div>
     <router-view/>
   </div>
  </div>
</template>

<script>
export default {
  name: "PersonalCenter"
}
</script>

<style lang="scss" scoped>
.personal-center {
  .container {
    .breadcrumb {
      /deep/ .el-breadcrumb {
        height:57px;
        line-height:57px;
      }
    }
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
          }
          &:last-child a{
            color: #1794FF;
            background: #FFFFFF;
            border-top: 2px solid #1794FF;
          }
        }
      }
    }
  }
}
</style>
