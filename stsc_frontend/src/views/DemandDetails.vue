<template>
  <div >
    <div class="container" ><P class="details-category">首页 > 热门推荐 > {{ info.name }}</P></div>
    <div class="serve-details container">
      <div class="serve-details-img"><img src="../assets/staticImgs/cardetail.png" width="400px" height="400px"></div>
      <div class="serve-details-inner-text">
        <div class="text-title">{{info ? info.name:""}}</div>
        <div class="text-title-title">服务机构：<span class="text-service-text">{{info.company}}</span></div>
        <div class="text-title-title">单位所在地：<span class="text-service-text">{{ info.address }}</span></div>
        <div class="text-title-title">创造时间：<span class="text-service-text">{{ info.createTime}}</span></div>
        <div >
        <div class="text-title-title pf" >
          <div class="pf fl">服务评分：</div>
          <div class="fl">
            <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            >
          </el-rate>
          </div></div>
        </div>
<!--        <div class="address">-->
<!--        <div class="text-title-title ">联系地址：<span class="text-service-text ">陕西省西安市幸福街道</span></div>-->
<!--        </div>-->
        <div class="text-title-title">手机号：<span class="text-service-text">{{info.telephone}}</span></div>
        <div class="text-title-title ">电子邮箱：<span class="text-service-text">{{info.email}}</span></div>
        <div class="text-title-title ">服务类别：<span class="text-service-text">设计服务>工业服务</span></div>
        <el-button><span class="font">立即下单</span></el-button>
      </div>
    </div>
<!--    服务详情-->
     <el-tabs v-model="activeName" type="card"  @tab-click="handleClick" class="serve-details-text-bottom container">
       <!-- 服务描述数据获取-->
       <el-tab-pane label="服务描述" name="first" ><p class="tab">{{info.serviceDescription}}</p></el-tab-pane>
      <el-tab-pane label="成功案例" name="second" >成功案例</el-tab-pane>
      <el-tab-pane label="专业人才" name="third" >专业人才</el-tab-pane>
      <el-tab-pane label="资质证明" name="fourth" >资质证明</el-tab-pane>
      <el-tab-pane label="评价" name="fifth" >评价</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "serveDetails",
  data() {
    return {
      activeName: 'first',
      info: {},
      value:2
      //存放后端获取的数据
    };
  },
  async mounted () {
    const detail_result = await this.$axios.userApiList.getServeDetail({
      id:"12345678"
    })
    this.info = detail_result.data.serve
    console.log(this.info)
    this.value = parseInt(this.info.star)
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },

};
</script>

<style scoped>
.serve-details {
  box-sizing: border-box;
  height: 440px;
  border: 1px solid #E7E7E7;
  padding: 20px;
  margin:  20px auto 33px auto;

}
.details-category{

  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 17px;
  margin-top: 20px;
}
.serve-details-img{
  width: 400px;
  height: 400px;
  float:left;
}
.serve-details-inner-text{
  box-sizing: border-box;
  width: 738px;
  height: 400px;
  float: right;
}
.serve-details-text-bottom{
  width: 1200px;
  height: 541px;
  border: 1px solid #E7E7E7;
}

/deep/ .el-tabs__item{
  width: 130px;
  height: 52px;
  text-align: center;
  font-size: 16px;
  line-height: 52px;
}
.text-title {
  width: 738px;
  height: 55px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 25px;
  display: inline-block;
}

.text-title-title{
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  margin-top: 10px;

}
.text-service-text{
  color: #333333;



}
/deep/.el-button{
  width: 140px;
  height: 50px;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
  background-color: #1794FF;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 400;
}
/deep/ .el-rate__icon {
  font-size: 16px;
}
/deep/.el-rate{
  height: 20px;
  width: 200px;
  float: right;
  line-height: 20px;
}
/deep/.el-rate__item{
  height: 16px;
}
.font{
  font-size: 18px;
}
.text-detials{
  margin: 10px 20px;
  font-size: 16px;
  line-height: 24px;
}
.address{
  display: inline-block;
}
.pf{
  display: inline-block;
  height: 20px;
}
.tab{
  margin-left: 10px;
}
</style>
