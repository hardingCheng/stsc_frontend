<template>
<div class="my_service_details">
  <div class="my_demand-details container ">
    <div class="my_demand-details-img"><img :src="this.info.image" width="400px" height="400px"></div>
    <ul >
      <li>服务名称:<span class="text">{{ !this.info.name ?"暂无数据":this.info.name }}</span></li>
      <li class="text-title-title">单位名称:<span>{{ !this.info.company ?"暂无数据":this.info.company}}</span></li>
      <li>单位地址:<span>{{ !this.info.address ?"暂无数据":this.info.address}}</span></li>
      <li>联&emsp;系&emsp;人&emsp;:<span>{{ !this.info.contact ?"暂无数据":this.info.contact }}</span></li>
      <li>联系方式:<span>{{ !this.info.telephone ?"暂无数据":this.info.telephone}}</span></li>
      <li>服务价格:<span>{{ price }}</span></li>
      <li>服务工期:<span>{{ this.info.deadline }}天</span></li>
      <li>所属分类:<span>{{ this.info.categoryName }}</span></li>
      <li>关&emsp;键&emsp;字&emsp;:<span>{{ this.info.keywords }}</span></li>
    </ul>
    <div></div>
  </div>
  <el-tabs v-model="activeName" type="card" class="serve-details-text-bottom container">
    <el-tab-pane label="企业简介" name="first" ><div class="indicators_text"><p class="p_text">{{ this.info.companyIntroduction }}</p></div></el-tab-pane>
    <el-tab-pane label="服务描述" name="second" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info.serviceDescription }}</p></div></el-tab-pane>
    <el-tab-pane label="专家描述" name="third" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info.expertIntroduction }}</p></div></el-tab-pane>
    <el-tab-pane label="附件" name="fourth" class="tab">
      <div class="accessory ">
        <p class="accessory_name">{{ filename }}</p>
        <a class="down" :href="this.info.attachment">下载</a>
      </div>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
export default {
  props:['id'],
  name: "MyserveDetails",
  data(){
    return{
      info_all:[],
      activeName: 'first',
      info:[],
      filename:'',
      price:0,
    }
  },
  created() {
    this.getRequireDetailById()
  },
  mounted() {

  },
  methods:{
    async getRequireDetailById(){
      const  result =await this.$axios.serveControllerList.getServesDetailById({
        id:this.id
      })
      this.info=result.data.serve
      if(result.data.serve.price!=="面议"&&result.data.serve.price!=="保密"){
        if(result.data.serve.price.includes(',')){
          this.price=result.data.serve.price.replace(',','~')+'万'
        }else {
          this.price=result.data.serve.price+'万'
        }
      }else {
        this.price=result.data.serve.price
      }
      let regex="[^\\/\\_]+$"
      if(result.data.serve.attachment==null){
        this.filename="无附件"
      }else {
        this.filename=result.data.serve.attachment.match(regex)[0]
      }
    }

}
}
</script>

<style scoped lang="scss">
@import './src/styles/mixin';
.my_service_details {
  .my_demand-details {
    display: flex;
    box-sizing: border-box;
    @include wh(953px, 440px);
    margin: 20px 330px 33px auto;
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
        width: 780px;
        font-size: 17px;
      }
    }
    .my_demand-details-inner-text {
      display: inline-block;
      box-sizing: border-box;
      @include wh(400px);
      float: left;
      .my_demand-title {
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
    margin: 50px 330px 33px auto;
    border: 1px solid #E7E7E7;
    .indicators_text {
      .p_text {
        white-space: pre-line;
        font-size: 14px;
        color: #4E4E4E;
        line-height: 24px;
      }
    }
    .tab {
      white-space: pre-line;
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

          }

          .down {

          }
        }
    }
  }
  ::v-deep .el-tabs__item {
    @include wh(130px, 52px);
    text-align: center;
    font-size: 16px;
    line-height: 52px;
  }

  ::v-deep .el-button {
    @include wh(140px, 50px);
    margin: 20px 0px 20px 0px;
    background-color: #1794FF;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 400;

  }

  ::v-deep .el-rate__icon {
    font-size: 16px;
  }

  ::v-deep .el-rate {
    @include wh(500px, 20px);
    float: right;
    line-height: 20px;
  }

  ::v-deep .el-rate__item {
    height: 16px;
  }

  ::v-deep .el-tab-pane {
   margin: 10px;
  }
  ::v-deep .el-tabs__header{
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
