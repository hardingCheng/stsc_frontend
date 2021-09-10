<template>
  <div class="DemandDetails container">

    <div class="container"><p class="details-category">首页 > 找需求 > {{ info.name }}</p></div>
    <div class="demand-details  container">
      <div class="demand-details-img"><img v-lazy="imageSrc" width="400px" height="400px"></div>
      <div class="demand-details-inner-text">
        <div class="demand-title">{{ info.name }}</div>
        <div class="mechanism-classification">
          <div class="text-title-title">需求机构：<span class="text-service-text">{{isLogin ? info.company:"***" }}</span></div>
        </div>
        <div class="text-title-title">创建时间：<span class="text-service-text">{{ info.createTime }}</span></div>
<!--        <div class="text-title-title">联系人：<span class="text-service-text">{{ info.contact }}</span></div>-->
        <div class="text-title-title">联系人：<span class="text-service-text">暂时不能查看</span></div>
<!--        <div class="text-title-title">手机号：<span class="text-service-text">{{ info.telephone }}</span></div>-->
        <div class="text-title-title">手机号：<span class="text-service-text">暂时不能查看</span></div>
        <div class="address">
          <div class="text-title-title ">联系地址：<span class="text-service-text ">{{ info.address }}</span></div>
        </div>
<!--        <div class="text-title-title ">电子邮箱：<span class="text-service-text">{{ info.email==null?"无": info.email }}</span></div>-->
        <div class="text-title-title ">电子邮箱：<span class="text-service-text">暂时不能查看</span></div>
        <div class="text-title-title ">附件：
          <a class="text-service-text1" :href=info.attachments >{{ filename}}</a>
        </div>
<!--        <img src="../assets/images/fileimg.png" class="file_img" v-bind:href="info.attachments" />-->
        <el-button><span class="font" @click="requireImmediately">立即抢单</span></el-button>
      </div>
      <div></div>
    </div>
<!--    <el-tabs v-model="activeName" type="card" class="serve-details-text-bottom container">-->
<!--      <el-tab-pane label="需求描述" name="first" class="tab"><p>{{ info.content }}</p></el-tab-pane>-->
<!--      <el-tab-pane label="项目背景" name="second" class="tab">{{ info.projectBackground }}</el-tab-pane>-->
<!--      <el-tab-pane label="验收指标" name="third" class="tab">{{ info.standard }}</el-tab-pane>-->
<!--      <el-tab-pane label="附件" name="fourth" class="tab">-->
<!--        <div class="accessory ">-->
<!--          <img src="../assets/images/fileimg.png" class="file_img"/>-->
<!--          <p class="accessory_name">附件</p>-->
<!--          <a class="down" v-bind:href="info.attachments">下载</a>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
    <div class="demand_overview container">
        <h4>需求概述</h4>
        <p>{{ info.content }}</p>
    </div>
    <div class="see-and-see container">
      <span class="see-and-see-title">---热门推荐---</span>
      <div v-for="item in seeAndSeeList">
      <img :src="item.image ? item.image : 'https://z3.ax1x.com/2021/05/07/g39Qht.png'" height="160px" width="160px" @click="seeDetail(item.id)">
      <div class="see-detail-div"><span class="see-detail">{{ item.name }}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id','flag'],
  name: "demandDetails",
  data() {
    return {
      activeName: 'first',
      info: {
        name:"暂无数据",
        attachments:"",
        createTime:''
      },//存放需求信息
      createTime:'',
      value: 2,
      filename:null,
      isLogin:null,//判断用户是否登录
      seeAndSeeList:[],//看了又看
      firstCategory:["知识产权","检验检测","研究开发","技术转移"],
      pageNum:1,
    };
  },
  async created() {
      this.isLogin=this.$store.state.isLogin
    //通过id获取需求详情
    const detail_result = await this.$axios.requirementControllerList.getRequireDetailById({
      id: this.id,
      flag:this.flag
    })
    //存放需求详情的信息
    this.info = detail_result.data.requirement
    //moment时间格式化插件
    const moment = require('moment');
    this.info.createTime = moment(this.info.createTime).format(("YYYY-MM-DD"))
    let regex="[^\\/\\_]+$"
    if(detail_result.data.requirement.attachments==null){
      this.filename="无附件"
    }else {
      this.filename=detail_result.data.requirement.attachments.match(regex)[0]
    }
    //存放需求评价的星数
    this.value = parseInt(this.info.star)

  },
  mounted() {
    this.pageNum = Math.floor(Math.random()*3+1);
    this.getSeeAndSeeDetail()
  },
  computed:{
    imageSrc:function (){
      if (this.info.image){
        return this.info.image
      }else {
        return 'https://z3.ax1x.com/2021/05/07/g39Qht.png'
      }
    }
  },
  methods: {
    async seeDetail(val) {
      //通过id获取需求详情
      const detail_result = await this.$axios.requirementControllerList.getRequireDetailById({
        id: val,
        flag: this.flag
      })
      //存放需求详情的信息
      this.info = detail_result.data.requirement
      //moment时间格式化插件
      const moment = require('moment');
      this.info.createTime = moment(this.info.createTime).format(("YYYY-MM-DD"))
      let regex = "[^\\/\\_]+$"
      if (detail_result.data.requirement.attachments == null) {
        this.filename = "无附件"
      } else {
        this.filename = detail_result.data.requirement.attachments.match(regex)[0]
      }
      //存放需求评价的星数
      this.value = parseInt(this.info.star)
      this.pageNum = Math.floor(Math.random()*3+1);
      await this.getSeeAndSeeDetail()
    },
    async getSeeAndSeeDetail() {
      let demandBaseResult = await this.$axios.requirementControllerList.getRequireSubRequire({
        page: this.pageNum,
        limit: 4
      }, {
      })
      this.seeAndSeeList=demandBaseResult.data.list
    },

    //立即抢单
    async requireImmediately(){
      let immediatelyResult = await this.$axios.orderControllerList.getOrderNowForRequire({
        requireId:this.id
      })
      if (immediatelyResult.code === 20000){
        this.$message({
          message: immediatelyResult.message,
          type: 'success'
        })
      }
      if (immediatelyResult.code === 20001){
        this.$message({
          message: immediatelyResult.message,
          type: 'error'
        })
      }
    },
    downloadClick(row) {
      let entity = {
        id: row.id,
        filename: row.filename,
      }
      this.download(this.info.data, row)
    },
    // 下载文件
    download(data, row) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      // 获取文件名
      // download 属性定义了下载链接的地址而不是跳转路径
      link.setAttribute('download', row.filename)
      document.body.appendChild(link)
      link.click()
    }
  },
};
</script>

<style scoped lang="scss">
@import '../styles/mixin';
.DemandDetails {
  font-family: PingFangSC-Regular, PingFang SC;
  position: relative;
  .demand_overview{
    //换行
    white-space: pre-line;
    box-sizing: border-box;
    width: 953px;
    min-height: 440px ;
    height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    margin: 20px 330px 33px auto;
    border:  #E7E7E7 1px solid;
  }
  .serve-details-text-bottom {
    width: 940px;
    margin: 50px 330px 33px auto;
    border: 1px solid #E7E7E7;
    .tab {
      height: 800px;
      margin-left: 10px;
      padding-top: 5px;
    }
  }
  .details-category {
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
    margin-top: 20px;
  }
  .demand-details {
    box-sizing: border-box;
    @include wh(953px, 440px);
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    margin: 20px 330px 33px auto;
  }
  .demand-details-text-bottom {
    width: 953px;
    margin: 20px 330px 33px auto;
    border: 1px solid #E7E7E7;
  }
  .demand-details-img {
    display: inline-block;
    margin-right: 30px;
    @include wh(400px, 400px);
    float: left;
  }
  .demand-details-inner-text {
    display: inline-block;
    box-sizing: border-box;
    @include wh(500px, 400px);
    float: left;
    border-right: 1px solid #F3F3F3;
    .demand-title {
      @include wh(468px, 55px);
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

    .text-title-title {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      margin-top: 10px;
      margin-left: 10px;
      .text-service-text {
        color: #333333;
      }
      .text-service-text1 {
      }
    }
    .text-title-title1 {
      display: flex;
      align-items: center;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      margin-top: 10px;
      margin-left: 10px;
      .file_img {
        height: 25px;

      }
    }
  }

  .font {
    font-size: 18px;
  }
  .mechanism-classification {
    box-sizing: border-box;
    @include wh(480px, 50px);
    padding-top: 5px;
    background: #F3F3F3;
    margin-bottom: 15px;
  }
  .demand-evaluation {
    margin-left: 130px;
    padding-top: 5px;
    text-align: center;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }
  .see-and-see {
    width: 160px;
    height: 300px;
    float: right;
    position: absolute;
    right: 60px;
    top: 60px;
    //overflow: visible;
    .see-and-see-title {
      display: block;
      text-align: center;
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #999999;
      line-height: 20px;
    }
    .see-detail-div {
      width: 160px;
      height: 26px;
      text-align: center;
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 0.8);
      .see-detail {
        width: 144px;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        line-height: 17px;
      }
    }
  }
  .demand-description {
    @include wh(940px, 500px);
    background: #FFFFFF;
    box-shadow: 0 2px 4px 3px rgba(225, 225, 225, 0.5);
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
    margin: 50px 330px 33px auto;
    .des-title {
      text-align: center;
      height: 40px;
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
  margin-top: 50px;
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

.tab {
  height: 800px;
  margin-left: 10px;
  padding-top: 5px;

  .accessory {
    display: flex;
    align-items: center;
    margin-left: 30px;



    .accessory_name {
      display: inline-block;
      width: 400px;
      margin-left: 20px;

    }

    .down {

    }
  }
}

/deep/ .el-tabs__header {
  margin: 0;
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
