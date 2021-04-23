<template>
    <div class="looking-demand container">
      <el-row :gutter="20"  class="container">
        <el-col :span="12" :offset="6"><div class="grid-content bg-purple ">

          <div class="search-demand ">
            <div class="search-demand-div">
              <div class="search-demand-text fl"><span class="text">找需求</span></div>
              <div>
                <el-input class="input fr" value="  请输入搜索信息" ></el-input>
              </div>
            </div>
            <div class="demand-classify ">
              <p class="fl classify">需求分类:</p>
              <p class="fl classify-text">全部</p>
              <p class="fl classify-text">研究开发</p>
              <p class="fl classify-text">技术转移</p>
              <p class="fl classify-text">检验检测</p>
              <p class="fl classify-text">创业孵化</p>
              <p class="fl classify-text">知识产权</p>
              <p class="fl classify-text">科技咨询</p>
              <p class="fl classify-text">科技金融</p>
              <p class="fl classify-text">科学普及</p>


            </div>

          </div>

          <!--列表-->
          <div class="demand-breviary " v-for="(item,index) in demand" :key="index">
            <div >
              <div class="fl"><img :src="item.image"  style="color: #5e6d82" class="demand-breviary-img" ></div>
              <div class=" breviary-title">需求企业:<span class="breviary-content">{{item.company}}</span></div>
              <div class="breviary-title">工期：<span class="breviary-content">{{item.deadline}}天</span></div>
              <div class=" breviary-title">企业类型：<span class="breviary-content">西安市</span></div>
              <div class="breviary-title">单位所在地：<span class="breviary-content">{{item.address}}</span></div>
              <div class="breviary-title">需求分类：<span class="breviary-content">制造业</span></div>
              <div class=" breviary-title">关键字：<span class="breviary-content">{{item.keywords}}</span></div>
              <el-button class="look-detail-button">查看详情</el-button>
              <el-button class="buy-button fr"><span class="buy-button-text">立即下单</span></el-button>
            </div>
          </div>
          <!--分页-->
          <div class="container">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
          </div>


        </div>
        </el-col>
      </el-row>
    </div>

</template>

<script>
export default {
  name: "LookingDemand",
  data(){
    return{
    demand:[],
    }
  },
    async mounted() {
      const demand_result = await this.$axios.userApiList.getDemand({
        page:1,
        limit:4,
      })
      this.demand=demand_result.data.requireList.records,
      console.log(this.demand)
    }
}
</script>

<style scoped lang="scss">
@import '../styles/mixin';
.looking-demand{
  margin-top: 59px;
  .grid-content {
    @include wh(1200px,1350px);
    margin-left: 0;
    background: #FFFFFF;
  }
  .bg-purple {
    background: #FFFFFF;;
    margin-left: 0;
  }
  .search-demand{
    @include wh(1200px,141px);
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    .demand-classify{
      padding: 37px 20px 37px;
    }
    .classify{
      @include wh(70px,20px);
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      margin-right: 28px;
    }
    .classify-text{
      @include wh(56px,20px);
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #111111;
      line-height: 20px;
      margin-right: 28px;
    }
  }
  .search-demand-div{
    @include wh(1199px,50px);
    background: #F1F1F1;
    display: inline-block;
    .input{
      @include wh(220px,32px);
      background: #FFFFFF;
      margin-top: 9px;
      margin-bottom: 9px;
      border-radius: 4px;
      border: 1px solid #E7E7E7;
    }
    .search-demand-text{
      @include wh(93px,50px);
      text-align: center;
      line-height: 50px;
      background: #FFFFFF;
    }

    .text{
      @include wh(54px,25px);
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1794FF;
      line-height: 25px;
    }
  }
  .demand-breviary{
    display: inline-block;
    box-sizing: border-box;
    @include wh(1200px,270px);
    border-bottom:1px solid #E7E7E7 ;
    padding-top: 20px;
    padding-bottom: 20px;
    background: #FFFFFF;
    .demand-breviary-img{
      @include wh(240px,210px);
      background-color: #ECECEC;
      margin-right: 20px;
    }
    .breviary-title{
      margin-top: 10px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
      margin-top: 10px;
    }
    .breviary-content{
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #111111;
      line-height: 20px;
    }
    .look-detail-button{
      margin-top: 20px;
      @include wh(88px,30px);
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #1794FF;
      padding: 0;
      color: #1794FF;
    }
    .buy-button{
      @include wh(120px,50px);
      margin-right: 50px;
      background: #1794FF;
      border-radius: 8px;
      border: 1px solid #1794FF;
    }
    .buy-button-text{
      @include wh(72px,25px);
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 25px;
    }
  }
}
/deep/.el-col-offset-6{
  margin-left: 0;
}
/deep/.el-tabs__content{
  box-sizing: border-box;
  @include wh(1200px,100px);

}
/deep/.el-input__inner{
  @include wh(220px,32px);
  background: url("../assets/staticImgs/search.png") no-repeat left ;
  background-size:17px 18px;
}
/deep/.el-pagination{
  width: 500px;
  height: 28px;
  margin: 30px  auto;
}

/deep/.number{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}

</style>
