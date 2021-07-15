<template>
  <div class="ServiceDetails container ">
    <div class="container"><P class="details-category">首页 > 找服务 > {{ info.name }}</P></div>
    <div class="serve-details ">
      <div class="serve-details-img"><img :src="info.image?info.image:'https://z3.ax1x.com/2021/05/07/g39Qht.png'"  width="400px" height="400px"></div>
      <div class="serve-details-inner-text">
        <div class="serve-title">{{ info ? info.name : "" }}</div>
        <div class="mechanism-classification">
          <div class="text-title-title">服务机构：<span class="text-service-text">{{ info.company }}</span></div>
          <div class="text-title-title ">服务类别：<span class="text-service-text">{{ info.categoryName }}</span></div>
        </div>
        <div class="evaluation">
          <div class="fl"><span class="cumulative-evaluation">累计评价：</span><span class="cumulative-num">{{ info.evaluationAmount }}</span></div>
          <div>
            <div class=" serve-evaluation  fl">服务评分：</div>
            <div class="fl">
              <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
              >
              </el-rate>
            </div>
          </div>
        </div>
        <!--        <div class="text-title-title">单位所在地：<span class="text-service-text">{{ info.address }}</span></div>-->
        <div class="text-title-title">创建时间：<span class="text-service-text">{{ info.createTime }}</span></div>
        <div class="text-title-title">联&emsp;系&emsp;人&emsp;：<span class="text-service-text">{{ info.contact }}</span></div>
        <div class="text-title-title">手&emsp;机&emsp;号&emsp;：<span class="text-service-text">{{ info.telephone }}</span></div>

        <!--        <div class="address">-->
        <!--        <div class="text-title-title ">联系地址：<span class="text-service-text ">陕西省西安市幸福街道</span></div>-->
        <!--        </div>-->
<!--        <div class="text-title-title ">电子邮箱：<span class="text-service-text">{{ info.email==null?"无": info.email }}</span></div>-->
        <div class="show-reviews">
          <div class="show-reviews-text fl" v-for="(item,index) in keywords" v-bind:key="index"><span class="tag-text">{{
              item
            }}</span>
          </div>
        </div>
        <el-button type="primary" @click="setOrderImmediately">立即下单</el-button>
      </div>
    </div>
    <Tabs class="tab_space"
        :description="info.serviceDescription"
          :attachment="info.attachment"
        :professional-talents="info.expertIntroduction">
<!--      附件-->
      <div class="accessory "slot="fourth" v-if="info.attachment">
        <p class="accessory_name">{{ filename }}</p>
        <a class="down" :href="info.attachment">下载</a>
      </div>
      <p v-else slot="fourth">无附件</p>
<!--      成功案例-->
      <div class="evaluation-box" slot="fifth" v-if="total>0">
<!--        <div class="praise-of">-->
<!--          <div class="praise-of-text">-->
<!--            <div class="degree-of-praise fl"><span class="praise-of-text-praise">好评度</span></div>-->
<!--            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>-->
<!--            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>-->
<!--            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>-->
<!--            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>-->
<!--            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>-->
<!--            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>-->
<!--          </div>-->
<!--          <div class="praise-of-num">100%</div>-->
<!--        </div>-->
        <div class="all-evaluation">
          <span class="allEvaluation">全部评价({{info.evaluationAmount }})</span>
<!--          <span class="allEvaluation">有图(0)</span>-->
<!--          <span class="allEvaluation">追加(0)</span>-->
<!--          <span class="allEvaluation">好评(0)</span>-->
<!--          <span class="allEvaluation">中评(0)</span>-->
<!--          <span class="allEvaluation">差评(0)</span>-->
        </div>
        <Evaluation
            v-for="(item,index) in commentListRequire" :key="index"
            :img-src=item.usernameAvatarVo.avatar
            :eachValue="item.star"
            :nick-name="item.usernameAvatarVo.username"
            :evaluation-data=item.createTime
            :evaluation-text=item.content
        >
        </Evaluation>
        <div class="common-pagination">
          <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage"
                :page-size="4"
                layout="total, prev, pager, next"
                :total=this.total>
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="evaluation-box"  slot="fifth" style="height: 300px;padding-left: 10px;margin-top: 10px" v-else>暂无评价</div>
    </Tabs>


    <div class="see-and-see container ">
      <span class="see-and-see-title">---看了又看---</span>
      <div v-for="item in seeAndSeeList" >
      <img :src="item.image?item.image:'https://z3.ax1x.com/2021/05/07/g39Qht.png'" height="160px" width="160px" @click="seeDetail(item.id)">
      <div class="see-detail-div"><span class="see-detail">{{ item.name }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Evaluation from "../components/Evaluation";
import Tabs from "../components/Tabs";
import router from "../router";
export default {
  name: "ServiceDetails",
  props:['id'],
  components: {Evaluation, Tabs},
  data() {
    return {
      activeName: 'first',
      info: {
        email:"无",
        createTime:''
      },
      value: 0,
      eachValue: 3,
      keywords: [],
      currentPage: 1,
      total:0,
      commentListRequire:[],//存放评论数据
      categoryName:'',
      firstCategory:["知识产权","检验检测","研究开发","技术转移"],
      firstCategoryId:null,
      seeAndSeeList:[],
      pageNum:1,
      filename:''
    };
  },
 created() {
    this.getServeDetail()
    this.getEvaluation()
    this.getSeeAndSee()
 },
  async mounted() {
    this.pageNum = Math.floor(Math.random()*3+1);
  },
  methods: {
    async getServeDetail() {
      const detail_result = await this.$axios.serveControllerList.getServesDetailById({
        id: this.id
      })
      this.info = detail_result.data.serve//服务信息
      let regex="[^\\/\\_]+$"
      if(detail_result.data.serve.attachment==null){
        this.filename="无附件"
      }else {
        this.filename=detail_result.data.serve.attachment.match(regex)[0]
      }
      console.log(this.info)
      this.value = this.info.star
      this.keywords = this.info.keywords.split(',')//以逗号分割获取的关键字
      //moment时间格式化插件
      const moment = require('moment');
      this.info.createTime = moment(this.info.createTime).format(("YYYY-MM-DD"))
      this.categoryName = this.info.categoryName.split('->')[0]
      for (let i = 0; i < this.firstCategory.length; i++) {
        if (this.categoryName === this.firstCategory[i]) {
          this.firstCategoryId = i
        }
      }
    },
    async seeDetail(valId) {
      this.pageNum = Math.floor(Math.random()*3+1);
      await this.getSeeAndSee()
      const detail_result = await this.$axios.serveControllerList.getServesDetailById({
        id: valId
      })
      this.info = detail_result.data.serve//服务信息
      this.value = this.info.star
      this.keywords = this.info.keywords.split(',')//以逗号分割获取的关键字
      //moment时间格式化插件
      const moment = require('moment');
      this.info.createTime = moment(this.info.createTime).format(("YYYY-MM-DD"))
      this.categoryName = this.info.categoryName.split('->')[0]
      for (let i = 0; i < this.firstCategory.length; i++) {
        if (this.categoryName === this.firstCategory[i]) {
          this.firstCategoryId = i
        }
      }

    },
    async getSeeAndSee(){
      let results =await this.$axios.serveControllerList.getServesByCondition({
        page: this.pageNum,
        limit: 4
      },{
        categoryId: this.firstCategoryId,
        status: 1
      })
      this.seeAndSeeList=results.data.serveList.records
      console.log( this.seeAndSeeList)
      //还没写完
      let topNum =results.data.serveList.total/4
    },
    // 立即下单产生订单
    async setOrderImmediately(){
      let createOrderResult = await this.$axios.orderControllerList.createOrder({
        serveId:this.id,
        type:0
      })
      if (createOrderResult.code === 20000){
        this.$message({
          message: createOrderResult.message,
          type: 'success',
          duration:500,
          onClose:() =>  this.$router.push('/pc/buyer/myorder')
        })
      }
      if (createOrderResult.code === 20001){
        this.$message({
          message: createOrderResult.message,
          type: 'error'
        })
      }
    },
    async getEvaluation() {
      //通过id获取评论
      const commentList = await this.$axios.requirementControllerList.getCommentList({
        page: this.currentPage,
        limit: 4,
        serveId: this.$route.params.id
      })
      this.commentListRequire = commentList.data.evaluationList.records//评价列表
      this.total = commentList.data.evaluationList.total//评价总数
      this.value = parseInt(this.info.star)
      if (!this.value) {
        this.value = 0
      }
    },
    handleSizeChange1(val) {
    },
    async handleCurrentChange1() {
      await this.getEvaluation()
    },

    handleSizeChange(val) {
      this.size = val
    },
    async handleCurrentChange(val) {
    },

  },

};
</script>

<style scoped lang="scss">
@import '../styles/mixin';
  .tab_space{white-space: pre-line;
    .accessory {
      display: flex;
      align-items: center;
      margin-left: 30px;
      margin-top:15px;
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
.ServiceDetails {
  font-family: PingFangSC-Regular, PingFang SC;
  .details-category {
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
    margin-top: 20px;
  }

  .serve-details {
    box-sizing: border-box;
    @include wh(953px, 440px);
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    margin: 20px 330px 60px auto;
  }

  .serve-details-text-bottom {
    width: 953px;
    margin: 20px 330px 33px auto;
    border: 1px solid #E7E7E7;

    .evaluation-box {
      .praise-of {
        @include wh(951px, 117px);
        border: 1px solid #E7E7E7;

        .praise-of-text-praise {
          @include wh(42px, 20px);
          font-size: 14px;
          font-weight: 400;
          color: #4E4E4E;
          line-height: 20px;
        }

        .praise-of-text {
          margin-top: 29px;
          margin-left: 52px;
          margin-right: 52px;

          .degree-of-praise {
            @include wh(73px, 20px);
            text-align: center;
            border-radius: 1px;
            line-height: 20px;
            margin-right: 14px;
            font-size: 12px;
            font-weight: 400;
            color: #666666;
          }

          .praise-tag-div {
            @include wh(73px, 20px);
            text-align: center;
            border-radius: 1px;
            line-height: 20px;
            margin-right: 14px;
            border: 1px solid #E0E0E0;
            font-size: 12px;
            font-weight: 400;
            color: #666666;

            .praise-tag {
              display: inline-block;
            }
          }
        }

        .praise-of-num {
          margin-left: 65px;
          @include wh(66px, 42px);
          font-size: 30px;
          font-weight: 500;
          color: #1794FF;
          line-height: 42px;
        }
      }

      .all-evaluation {
        @include wh(951px, 26px);
        background: #FAFAFA;
        border: 1px solid #F7F7F7;

        .allEvaluation {
          @include wh(47px, 17px);
          font-size: 12px;
          margin-right: 20px;
          margin-left: 30px;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
      }


      .pagination-box {
        background: antiquewhite;
      }
    }

    .common-pagination {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: center;
      .pagination {
      }
    }

    .tab {
      height: 800px;
      margin-left: 10px;
      padding-top: 5px;
    }
  }

  .serve-details-img {
    display: inline-block;
    margin-right: 30px;
    @include wh(400px, 400px);
    float: left;
  }

  .serve-details-inner-text {
    display: inline-block;
    box-sizing: border-box;
    @include wh(500px, 400px);
    float: left;
    border-right: 1px solid #F3F3F3;

    .serve-title {
      @include wh(468px, 55px);
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      line-height: 25px;
      margin-left: 10px;
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
    }

    .show-reviews {
      margin-top: 20px;
      width: 489px;
      text-align: center;
      display: inline-block;

      .show-reviews-text {
        @include wh(73px, 24px);
        margin-right: 14px;
        border-radius: 1px;
        margin-bottom: 5px;
        border: 1px solid #E0E0E0;
      }

      .tag-text {
        @include wh(48px, 17px);
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        line-height: 17px;
      }
    }
  }

  .font {
    font-size: 18px;
  }

  .mechanism-classification {
    box-sizing: border-box;
    @include wh(480px, 79px);
    padding-top: 5px;
    background: #F3F3F3;
    margin-bottom: 20px;
  }

  .cumulative-evaluation {
    margin-top: 5px;
    margin-left: 80px;
    @include wh(60px, 17px);
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 17px;
  }

  .evaluation {
    @include wh(480px, 29px);
    padding-top: 5px;
    border-top: 1px dashed #F3F3F3;
    border-bottom: 1px dashed #F3F3F3;
  }

  .cumulative-num {
    @include wh(26px, 20px);
    font-size: 14px;
    font-weight: 500;
    color: #1794FF;
    line-height: 20px;
  }

  .serve-evaluation {
    margin-left: 130px;
    padding-top: 5px;
    text-align: center;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }

  .el-rate {
    width: 120px;
  }

  .see-and-see {
    width: 160px;
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

  .success{
    .other_pagination{
      display: flex;
      justify-content: center;

    }
    .other{
      .other_title{
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: 20px;
      }
      .other_success{
        display: flex;
        justify-content: center;

      .other_success_div{
        display: flex;
        height: 200px;
        width: 300px;
        border: 1px solid #F3F3F3;
        .other_inner{
          margin-top: 20px;
          margin-left: 10px;
          margin-bottom: 20px;
          padding-left: 5px;
          border-left:1px solid #F3F3F3 ;
          a{
            font-size: 14px;
           line-height: 30px;
            color: #007aff;
          }
        }
        .img_div{
          display: flex;
          align-items: center;
          img{
            height: 100px;
          }
        }
      }
        .success_div{
          display: flex;
          height: 200px;
          width: 300px;
          margin-left: 20px;
          margin-right: 20px;
          border: 1px solid #F3F3F3;
          .other_inner{
            margin-top: 20px;
            margin-left: 10px;
            margin-bottom: 20px;
            padding-left: 5px;
            border-left:1px solid #F3F3F3 ;
            a{
              font-size: 14px;
              line-height: 30px;
              color: #007aff;
            }
          }
          .img_div{
            display: flex;
            align-items: center;
            img{
              height: 100px;
            }
          }
        }
      }
    }
    .title{
      display: flex;
      align-items: center;
      img{
        height: 150px;
      }
      h3{
        margin-left: 50px;
      }
    }
    .sub_title{
     border-bottom: 1px solid #F3F3F3;
      p{
        line-height: 25px;
      }
      .sub_title_top{
        display: flex;
        align-items: center;
        height: 48px;
        background: #f5f5f6;
        img{
          height: 100%;
          width: 48px;
          background: #007aff;
        }
        span{
          font-size: 16px;
          margin-left: 15px;
        }
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
  margin-bottom: 20px;
  margin-top: 10px;
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

.tab {
  height: 800px;
  margin-left: 10px;
  padding-top: 5px;
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
