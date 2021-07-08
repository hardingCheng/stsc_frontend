<template>
  <div class="commpany_detail container">
    <BreadCrumb>企业详情</BreadCrumb>
    <div class="my_company-details container ">
      <div class="my_company-details-img"><img :src="this.info.avatar?this.info.avatar:default_img"   width="300px" height="300px"></div>
      <ul >
        <li>单位名称:<span class="text">{{ this.$route.params.requireState!=6 ? "下单后可见":this.info.company }}</span></li>
        <li class="text-title-title">单位地址:<span>{{ this.$route.params.requireState==6?this.info.address:"下单后可见" }}</span></li>
        <li>联系人:<span>{{ !this.info.realname ?"暂无数据":this.info.realname }}</span></li>
        <li>联系方式:<span>{{ this.$route.params.requireState==6?this.info.telephone :"下单后可见"}}</span></li>
        <li>邮箱:<span>{{ this.$route.params.requireState==6?this.info.email :"下单后可见" }}</span></li>
        <li>所属平台:<span>{{ !this.info.source ?"暂无数据":this.info.source}}</span></li>
      </ul>
      <div></div>
    </div>
    <el-tabs v-model="activeName" type="card" class="serve-details-text-bottom container">
      <el-tab-pane label="企业简介" name="first" ><div class="indicators_text"><p class="p_text">{{ this.info.businessScope }}</p></div></el-tab-pane>
      <el-tab-pane label="成功案例" name="second" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info.serviceDescription }}</p></div></el-tab-pane>
      <el-tab-pane label="专家描述" name="third" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info.expertIntroduction }}</p></div></el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
import BreadCrumb from "../components/BreadCrumb";
export default {
  components:{BreadCrumb},
  name: "CommpanyDetail",
  data(){
    return{
      info_all:[],
      activeName: 'first',
      info:{
        company:"暂无数据",
        address:"暂无数据",
        telephone:"暂无数据",
        email:"暂无数据",
        businessScope:"暂无数据",
        serviceDescription:"暂无数据",
        expertIntroduction:"暂无数据",
      },
      default_img: require("../assets/images/detaillogo.png"),
      requireState:0//获取需求状态
    }
  },
  created() {
    this.getRequireDetailById()

  },
  methods:{
    // //获取需求状态
    // async getRequireState() {
    //   let result = await this.$axios.requirementControllerList.getRequireDetailById({
    //     id: this.$route.params.id
    //   })
    //   if (result.code === 20000) {
    //     this.requireState = result.data.requirement.status
    //     console.log( "ccc",this.requireState)
    //   }
    // },

    async getRequireDetailById(){
      const  result =await this.$axios.userControllerList.getBuyerInfo({
        id:this.$route.params.id
      })
      this.info=result.data.user
    }
  }
}
</script>

<style scoped lang="scss">
@import './src/styles/mixin';
.commpany_detail {
  .my_company-details {
    display: flex;
    box-sizing: border-box;
    @include wh(1200px, 300px);
    margin-top: 50px;
    .my_company-details-img{

    }
    ul{
      margin-top: 5px;
      margin-left: 20px;
      line-height: 30px;
      li{
        span{
          margin-left: 10px;
          font-size: 16px;
          line-height: 40px;
          .text{
            width: 500px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2; /** 显示的行数 **/
            overflow: hidden; /** 隐藏超出的内容 **/
          }
        }
      }
      .text-title-title {
        background-color: #F3F3F3;
        line-height: 50px;
        width:880px;
      }
    }
    .my_company-details-inner-text {
      display: inline-block;
      box-sizing: border-box;
      @include wh(400px);
      float: left;
      .my_company-title {
        @include wh(751px, 55px);
        font-size: 18px;
        font-weight: 500;
        color: #333333;
        line-height: 25px;
        margin-left: 10px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden; /** 隐藏超出的内容 **/
      }
    }
  }
  .serve-details-text-bottom {
    width: 1200px;
    margin-top: 80px;
    margin-bottom: 100px;
    border: 1px solid #E7E7E7;
    .indicators_text {
      .p_text {
        font-size: 14px;
        color: #4E4E4E;
        line-height: 24px;
      }
    }
    .tab {
      margin-left: 10px;
      padding-top: 5px;
      .accessory {
        display: flex;
        align-items: center;
        margin-left: 30px;

        .file_img {
          height: 50px;
        }

        .accessory_name {
          display: inline-block;
          width: 400px;
          margin-left: 20px;

        }

        .down {

        }
      }
    }
  }
  /deep/ .el-tabs__item {
    @include wh(130px, 52px);
    text-align: center;
    font-size: 16px;
    line-height: 52px;
  }

  /deep/ .el-button {
    @include wh(140px, 50px);
    margin: 20px 0px 20px 0px;
    background-color: #1794FF;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 400;

  }

  /deep/ .el-rate__icon {
    font-size: 16px;
  }

  /deep/ .el-rate {
    @include wh(500px, 20px);
    float: right;
    line-height: 20px;
  }

  /deep/ .el-rate__item {
    height: 16px;
  }

  /deep/ .el-tab-pane {
    margin: 10px;
  }
  /deep/ .el-tabs__header{
    margin: 0px;
  }
}

</style>
<style>
.el-tabs__item:hover {
  color: black;
}

.el-tabs__item.is-active {
  background-color: #1794FF;
  color: white;
}
</style>
