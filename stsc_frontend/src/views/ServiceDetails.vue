<template>
  <div class="ServiceDetails container ">
    <div class="container"><P class="details-category">首页 > 找服务 > {{ info.name }}</P></div>
    <div class="serve-details ">
      <div class="serve-details-img"><img :src=info.image width="400px" height="400px"></div>
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
        <div class="text-title-title">创造时间：<span class="text-service-text">{{ info.createTime }}</span></div>
        <div class="text-title-title">手机号：<span class="text-service-text">{{ info.telephone }}</span></div>
        <!--        <div class="address">-->
        <!--        <div class="text-title-title ">联系地址：<span class="text-service-text ">陕西省西安市幸福街道</span></div>-->
        <!--        </div>-->
        <div class="text-title-title ">电子邮箱：<span class="text-service-text">{{ info.email }}</span></div>
        <div class="show-reviews">
          <div class="show-reviews-text fl" v-for="(item,index) in keywords" v-bind:key="index"><span class="tag-text">{{
              item
            }}</span>
          </div>
        </div>
        <el-button><span class="font">立即下单</span></el-button>
      </div>
    </div>
    <Tabs
        :description="info.serviceDescription"
        :professional-talents="info.expertIntroduction">
<!--      成功案例-->


      <div class="evaluation-box" slot="fifth">
        <div class="praise-of">
          <div class="praise-of-text">
            <div class="degree-of-praise fl"><span class="praise-of-text-praise">好评度</span></div>
            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>
            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>
            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>
            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>
            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>
            <div class="praise-tag-div fl"><span class="praise-tag">态度好(0)</span></div>
          </div>
          <div class="praise-of-num">0%</div>
        </div>
        <div class="all-evaluation">
          <span class="allEvaluation">全部评价(0)</span>
          <span class="allEvaluation">有图(0)</span>
          <span class="allEvaluation">追加(0)</span>
          <span class="allEvaluation">好评(0)</span>
          <span class="allEvaluation">中评(0)</span>
          <span class="allEvaluation">差评(0)</span>
        </div>

        <Evaluation
            v-for="(item,index) in commentListRequire.records" :key="index"
            :img-src=item.usernameAvatarVo.avatar
            :eachValue="item.star"
            :nick-name="item.usernameAvatarVo.username"
            :evaluation-data=item.createTime
            :evaluation-text=item.content>
        </Evaluation>
        <div class="common-pagination">
          <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="1"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
          </div>
        </div>
      </div>

    </Tabs>
    <div class="see-and-see container ">
      <span class="see-and-see-title">---看了又看---</span>
      <img src="../assets/staticImgs/seeandsee.png" height="160px" width="160px">
      <div class="see-detail-div"><span class="see-detail">机器人关键零部件先进制造</span></div>
      <img src="../assets/staticImgs/seeandsee.png" height="160px" width="160px">
      <div class="see-detail-div"><span class="see-detail">机器人关键零部件先进制造</span></div>
      <img src="../assets/staticImgs/seeandsee.png" height="160px" width="160px">
      <div class="see-detail-div"><span class="see-detail">机器人关键零部件先进制造</span></div>
      <img src="../assets/staticImgs/seeandsee.png" height="160px" width="160px">
      <div class="see-detail-div"><span class="see-detail">机器人关键零部件先进制造</span></div>

    </div>

  </div>
</template>

<script>
import Evaluation from "../components/Evaluation";
import Tabs from "../components/Tabs";

export default {
  name: "ServiceDetails",
  props:['id'],
  components: {Evaluation, Tabs},
  data() {
    return {
      currentPage2:1,
      activeName: 'first',
      info: {},
      value: 0,
      eachValue: 3,
      evaluate: {},
      keywords: [],
      currentPage: 1,
      total:0,
      commentListRequire:[],//存放评论数据
    };
  },
  async mounted() {
      const detail_result = await this.$axios.serveControllerList.getServesDetailById({
      id: this.id
    })
    const commentList = await  this.$axios.requirementControllerList.getCommentList({
      page:this.currentPage,
      limit:4,
      id:this.$route.params.id
    })
    console.log("ccc",detail_result)
    this.commentListRequire=commentList.data.evaluationList
     this.total=commentList.data.evaluationList.records.length;
    console.log("评价列表", this.commentListRequire)
    console.log("获取的评价总数",this.total)
     this.currentPage=commentList.data.evaluationList.current
     console.log(commentList.data.evaluationList)
    console.log(this.evaluate)
    this.info = detail_result.data.serve
    console.log("11",this.info)
    this.keywords = this.info.keywords.split(',')
    this.value = parseInt(this.info.star)
    if (!this.value) {
      this.value = 0
    }
  },

  methods: {
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange1() {
      //await this.getMessageListNoRead()
    },
    // async getData(i){
    //   this.currentPage=i||this.currentPage;
    //     const commentList = await  this.$axios.requirementControllerList.getCommentList({
    //     page:this.currentPage,
    //     limit:1,
    //     id:this.$route.params.id
    //   })
    //   this.commentListRequire=commentList.data.evaluationList
    //     console.log( this.commentListRequire)
    //   this.total=commentList.data.evaluationList.records.length;
    //   this.currentPage=commentList.data.evaluationList.current
    //
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // await this.getData(val)
    },

  },

};
</script>

<style scoped lang="scss">
@import '../styles/mixin';
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
    margin: 20px 330px 33px auto;
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
      height: 60px;
      position: relative;
      .pagination {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
  margin-top: 20px;
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
