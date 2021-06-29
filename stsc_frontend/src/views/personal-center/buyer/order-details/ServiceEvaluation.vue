<template>
  <div class="service-evaluation">
    <div v-if="type === '0'">
      <div class="serve_company">
        <img :src=orderBuyInfo.avatar class="img_style">
        <div class="company_detail">
          <ul>
            <li>
              服务商名称:<span>{{ this.orderBuyInfo.company }}</span>
            </li>
            <li>
              所属机构:<span>{{ this.orderBuyInfo.source }}</span>
            </li>
            <li>
              联系方式:<span>{{ this.orderBuyInfo.telephone }}</span>
            </li>
            <li>
              地址:<span>{{ !this.orderBuyInfo.address ? "暂无数据" : this.orderBuyInfo.address }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="evaluation_title"><span class="order">订单</span><span class="evaluation_text">评论</span></div>
      <div class="content">

        <div class="serve_order">
          <img :src=orderChildrenInfo.orderImg class="order_style">
          <ul>
            <li>
              订单编号:<span>{{ !orderChildrenInfo.id ? "暂无数据" : orderChildrenInfo.id }}</span>
            </li>
            <li>
              子服务名称:<span>{{ !orderChildrenInfo.name ? "暂无数据" : orderChildrenInfo.name }}</span>
            </li>
            <li>
              开始时间:<span>{{ !orderChildrenInfo.createTime ? "暂无数据" : orderChildrenInfo.createTime }}</span>
            </li>
            <li>
              结束时间:<span>{{ !orderChildrenInfo.endTime ? "暂无数据" : orderChildrenInfo.endTime }}</span>
            </li>


          </ul>
          <div class="evaluation_source">
            <!--        评分-->

            <el-rate class="star_style"
                     v-model="value"
                     show-text>
            </el-rate>
            <!--          文本输入框-->
            <el-input class="input_style"
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea2">
            </el-input>

          </div>
        </div>
        <div class="service-acceptance-operation">
          <el-button type="primary" @click="submitComment">下一步</el-button>
        </div>
      </div>
    </div>

    <div v-if="type === '1'">
      <div class="serve_company">
        <img :src=orderBuyInfo.avatar class="img_style">
        <div class="company_detail">
          <ul>
            <li>
              服务商名称:<span>{{ this.orderBuyInfo.company }}</span>
            </li>
            <li>
              所属机构:<span>{{ this.orderBuyInfo.source }}</span>
            </li>
            <li>
              联系方式:<span>{{ this.orderBuyInfo.telephone }}</span>
            </li>
            <li>
              地址:<span>{{ !this.orderBuyInfo.address ? "暂无数据" : this.orderBuyInfo.address }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="evaluation_title"><span class="order">第{{this.num+1}}订单</span><span class="evaluation_text">评论</span></div>
      <div class="content">

        <div class="serve_order">
          <img :src=orderChildrenInfo.orderImg class="order_style">
          <ul>
            <li>
              订单编号:<span>{{ !orderChildrenInfo.id ? "暂无数据" : orderChildrenInfo.id }}</span>
            </li>
            <li>
              子服务名称:<span>{{ !orderChildrenInfo.name ? "暂无数据" : orderChildrenInfo.name }}</span>
            </li>
            <li>
              开始时间:<span>{{ !orderChildrenInfo.createTime ? "暂无数据" : orderChildrenInfo.createTime }}</span>
            </li>
            <li>
              结束时间:<span>{{ !orderChildrenInfo.endTime ? "暂无数据" : orderChildrenInfo.endTime }}</span>
            </li>


          </ul>
          <div class="evaluation_source">
            <!--        评分-->

            <el-rate class="star_style"
                     v-model="value"
                     show-text>
            </el-rate>
            <!--          文本输入框-->
            <el-input class="input_style"
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea2">
            </el-input>

          </div>
        </div>
        <div class="service-acceptance-operation">
          <el-button type="primary" @click="submitComment">下一步</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['orderid', 'type'],
  name: "ServiceEvaluation",
  data() {
    return {
      value: null,
      value1: null,
      textarea1: "",
      textarea2: '',//type 为1时的评价输入框绑定的数据
      order: [],//存放订单消息
      orderTempt: [],//
      subOrderTempt: [],
      userTempt: [],//用户暂存
      seller: [],//存放买家ID
      subOrderId: [],//存放子订单id
      serveDetail: [],
      img_default: [],
      orderBuyInfo: [],
      orderChildrenInfo: [],
      deadTime: ['0'],
      serveId: null,//存放服务ID
      num: 0,//当前是第几个子订单，默认值为0
      sum: 0,//存放订单的总数
      ev: 0
    }
  },
  async created() {
    //获取订单
    await this.getOrderInfo()
    //获取订单的买家信
    await this.getSellerInfo(this.order.sellerId, this.num)
    //获取子订单子的详细信息
    await this.getSubInfo(this.order.subOrderId, this.num)
  },
  methods: {
    //获取订单的买家信息
    async getSellerInfo(val, i) {
      let result = await this.$axios.orderControllerList.getOrderBuyerInfo({
        id: val
      })
      this.orderBuyInfo = result.data.user
    },
    //获取订单信息
    async getOrderInfo() {
      let result = await this.$axios.orderControllerList.getOrderInfo({
        id: this.orderid
      })
      //子订单列表
      this.sum = result.data.subOrderInfo.subOrderInfoVoList.length//子订单的数目
      this.order = result.data.subOrderInfo.subOrderInfoVoList[this.num]//子订单信息，默认是第一个订单的数据

    },
    //获取子订单子的详细信息
    async getSubInfo(val, i) {
      let results = await this.$axios.orderControllerList.getSubOrderDetailById({
        subOrderId: val
      })
      this.orderChildrenInfo = results.data.orderInfo//子订单的信息
      this.serveId = results.data.orderInfo.serveId//服务id
    },

    //发布评论
    async submitComment() {
      const result = await this.$axios.orderControllerList.submitComment({
        userId: this.$store.getters.getUserInfo.id,
        serveId: this.serveId,
        content: this.textarea2,
        star: this.value
      })
      this.$message.success("评论成功！");

      //如果当前订单的索引小于订单的总数,调用方法
      if (this.num < this.sum) {
        //每调用一次num+1
        this.num = this.num + 1
        await this.getOrderInfo()
        await this.getSellerInfo(this.order.sellerId, this.num)
        await this.getSubInfo(this.order.subOrderId, this.num)
      } else {
        this.$message.success("全部评论成功！");
        await this.$router.push({
          path: "/buyer/myorder"//要跳转的页面的路由
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
.service-evaluation {
  box-shadow: 0px 2px 4px 3px #E1E1E1;

  .content {
    margin-bottom: 20px;

    .serve_order {
      display: flex;
      justify-content: flex-start;

      .order_style {
        width: 210px;
        height: 210px;
        margin: 20px;
      }

      .evaluation_source {
        width: 400px;

        .star_style {
          margin-top: 30px;
        }

        .input_style {
          margin-top: 30px;
        }
      }

      ul {
        margin-top: 10px;
        width: 400px;

        li {
          line-height: 20px;
          margin: 20px;

          span {
            margin-left: 10px;
          }
        }
      }
    }

    .service-acceptance-operation {
      width: 100%;
      text-align: center;
      padding-bottom: 20px;
    }
  }

  .evaluation_title {
    margin-top: 10px;
    border: 1px solid #E7E7E7;
    background: #FAFAFA;
    height: 30px;

    .order {
      margin-left: 20px;
      line-height: 30px;
    }

    .evaluation_text {
      margin-left: 600px;
      line-height: 30px;

    }
  }

  .serve_company {
    height: 150px;
    border: 1px solid #E7E7E7;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 2px 4px 3px #E1E1E1;

    .img_style {
      height: 130px;
      width: 130px;
      margin-left: 20px;
      margin-right: 20px;

    }

    .company_detail {
      height: 130px;
      margin-left: 20px;

      ul > li {
        line-height: 30px;

        span {
          margin-left: 10px;
        }
      }
    }
  }

}

</style>
