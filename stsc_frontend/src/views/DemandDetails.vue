<template>
  <div >
    <div class="container" ><P class="details-category">首页 > 热门推荐 > 汽车摩擦片</P></div>
    <div class="demand-details container">
      <div class="demand-details-img"><img src="../assets/staticImgs/cardetail.png" width="400px" height="400px"></div>
      <div class="demand-details-inner-text">
        <div class="text-title">汽车摩擦片级进模具开发进汽车摩擦片级进模具开发进汽车摩擦片级进模具开发进模具开发进 进汽车摩擦片级进模具开发进汽车摩擦片级进</div>
        <div class="text-title-title">服务机构：<span class="text-service-text">机器人关键零部件先进制造与机器</span></div>
        <div class="text-title-title">单位所在地：<span class="text-service-text">陕西省西安市xxx街道</span></div>
        <div class="text-title-title">创造时间：<span class="text-service-text">2021年1月29日</span></div>
        <div >
        <div class="text-title-title pf" >
          <div class="pf fl">服务评分：</div>
          <div class="fl"><el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
        </el-rate></div></div>
        </div>
        <div class="address">
        <div class="text-title-title ">联系地址：<span class="text-service-text ">陕西省西安市幸福街道</span></div>
        </div>
        <div class="text-title-title">手机号：<span class="text-service-text">18500570001</span></div>
        <div class="text-title-title ">电子邮箱：<span class="text-service-text">123@163.com</span></div>
        <div class="text-title-title ">层服务类别：<span class="text-service-text">设计服务>工业服务</span></div>
        <el-button><span class="font">立即下单</span></el-button>
      </div>
    </div>
<!--    服务详情-->
     <el-tabs v-model="activeName" type="card"  @tab-click="handleClick" class="demand-details-text-bottom container">
      <el-tab-pane label="服务描述" name="first" ><p class="text-detials">主要包括肥料粉碎回收系统、压实系统、可转位养护设备、养护机器人等部分设计。其中，肥料粉碎回收系统是由水平肥料输送带、立式上料机构和肥料粉碎装置等部分组成，主要是先肥料粉碎、加热功能。主要包括肥料粉碎回收系统、压实系统、可转位养护设备、养护机器人等部分设计。其中，肥料粉碎回收系统是由水平肥料输送带、立式上料机构和肥料粉碎装置等部分组成，主要是先肥料粉碎、加热功能。主要包括肥料粉碎回收系统、压实系统、可转位养护设备、养护机器人等部分设计。其中，肥料粉碎回收系统是由水平肥料输送带、立式上料机构和肥料粉碎装置等部分组成，主要是先肥料粉碎、加热功能。主要包括肥料粉碎回收系统、压实系统、可转位养护设备、养护机器人等部分设计。其中，肥料粉碎回收系统是由水平肥料输送带、立式上料机构和肥料粉碎装置等部分组成，主要是先肥料粉碎、加热功能。主要包括肥料粉碎回收系统、压实系统、可转位养护设备、养护机器人等部分设计。其中，肥料粉碎回收系统是由水平肥料输送带、立式上料机构和肥料粉碎装置等部分组成，主要是先肥料粉碎、加热功能。主要包括肥料粉碎回收系统、压实系统、可转位养护设备、养护机器人等部分设计。其中，肥料粉碎回收系统是由水平肥料输送带、立式上料机构和肥料粉碎装置等部分组成，主要是先肥料粉碎、加热功能。主要包括肥料粉碎回收系统、压实系统、可转位养护设备、养护机器人等部分设计。其中，肥料粉碎回收系统是由水平肥料输送带、立式上料机构和肥料粉碎装置等部分组成，主要是先肥料粉碎、加热功能。</p></el-tab-pane>
      <el-tab-pane label="成功案例" name="second" >成功案例</el-tab-pane>
      <el-tab-pane label="专业人才" name="third" >专业人才</el-tab-pane>
      <el-tab-pane label="资质证明" name="fourth" >资质证明</el-tab-pane>
      <el-tab-pane label="评价" name="fifth" >评价</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "DemandDetails",
  data() {
    return {
      activeName: 'first',
      value: 3.7
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }

};
</script>

<style scoped>
.demand-details {
  box-sizing: border-box;
  height: 440px;
  border: 1px solid #E7E7E7;
  padding: 20px;
  margin:  20px auto 33px auto;

}
.details-category{
  width: 200px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 17px;
  margin-top: 20px;
}
.demand-details-img{
  width: 400px;
  height: 400px;
  float:left;
}
.demand-details-inner-text{
  box-sizing: border-box;
  width: 738px;
  height: 400px;
  float: right;
}
.demand-details-text-bottom{
  width: 1200px;
  height: 541px;
  border: 1px solid #E7E7E7;
}

/deep/ .el-tabs__item{
  width: 130px;
  height: 52px;
  text-align: center;
  font-size: 16px;

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
  height: 16px;
  width: 200px;
  float: right;



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
.service-pf{
  width: 70px;
  float: left;
  font-size: 14px;
  
}

.address{
  display: inline-block;
}
.pf{
  display: inline-block;
}
</style>
