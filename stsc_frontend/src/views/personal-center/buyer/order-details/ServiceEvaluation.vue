<template>
  <div class="service-evaluation">
<!--    <div  v-if="type === '0'">-->
<!--    <div class="serve_company">-->
<!--      <img :src="!this.seller.avatar ? orderChildrenInfo.image: this.seller.avatar"  class="img_style">-->
<!--      <div class="company_detail">-->
<!--        <ul>-->
<!--          <li>-->
<!--            服务商名称:<span>{{ !orderChildrenInfo.company? "暂无数据":orderChildrenInfo.company }}</span>-->
<!--          </li>-->
<!--          <li>-->
<!--            所属机构:<span>{{ !orderChildrenInfo.platform ? "暂无数据":orderChildrenInfo.platform}}</span>-->
<!--          </li>-->
<!--          <li>-->
<!--            联系方式:<span>{{ !orderChildrenInfo.telephone? "暂无数据":orderChildrenInfo.telephone }}</span>-->
<!--          </li>-->
<!--          <li>-->
<!--            地址:<span>{{ !orderChildrenInfo.address ? "暂无数据":orderChildrenInfo.telephone }}</span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="evaluation_title" ><span class="order">订单</span><span class="evaluation_text">评论</span></div>-->
<!--    <div class="content">-->
<!--    <div class="serve_order">-->

<!--      <img :src="orderChildrenInfo.image"  class="order_style">-->
<!--      <ul>-->
<!--        <li>-->
<!--          订单编号:<span>{{ !order.orderId ? "暂无数据":order.orderId}}</span>-->
<!--        </li>-->
<!--        <li>-->
<!--          服务名称:<span>{{ !orderChildrenInfo.name? "暂无数据": orderChildrenInfo.name}}</span>-->
<!--        </li>-->
<!--        <li>-->
<!--          开始时间:<span>{{ !orderChildrenInfo.createTime? "暂无数据": orderChildrenInfo.createTime}}</span>-->
<!--        </li>-->
<!--        <li>-->
<!--          结束时间:<span>{{ !this.deadTime ? "暂无数据":this.deadTime }}</span>-->
<!--        </li>-->
<!--        <li>-->
<!--          服务价格:<span>{{!orderChildrenInfo.price? "暂无数据":orderChildrenInfo.price}}万元</span>-->
<!--        </li>-->

<!--      </ul>-->
<!--      <div class="evaluation_source">-->
<!--&lt;!&ndash;        评分&ndash;&gt;-->

<!--        <el-rate class="star_style"-->
<!--            v-model="value1"-->
<!--            show-text>-->
<!--        </el-rate>-->
<!--&lt;!&ndash;          文本输入框&ndash;&gt;-->

<!--        <el-input class="input_style"-->
<!--            type="textarea"-->
<!--            :autosize="{ minRows: 4, maxRows: 4}"-->
<!--            placeholder="请输入内容"-->
<!--            v-model="textarea1">-->
<!--        </el-input>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="service-acceptance-operation">-->
<!--      <el-button type="primary" @click="submitComment">提交</el-button>-->
<!--    </div>-->
<!--    </div>-->
<!--  </div>-->

    <div  v-if="type === '1'">
      <div class="serve_company">
        <img :src="!this.seller.avatar ? orderChildrenInfo.image: this.seller.avatar"  class="img_style">
        <div class="company_detail">
          <ul>
            <li>
              服务商名称:<span>{{ !orderChildrenInfo.company? "暂无数据":orderChildrenInfo.company }}</span>
            </li>
            <li>
              所属机构:<span>{{ !orderChildrenInfo.platform ? "暂无数据":orderChildrenInfo.platform}}</span>
            </li>
            <li>
              联系方式:<span>{{ !orderChildrenInfo.telephone? "暂无数据":orderChildrenInfo.telephone }}</span>
            </li>
            <li>
              地址:<span>{{ !orderChildrenInfo.address ? "暂无数据":orderChildrenInfo.telephone }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="evaluation_title" ><span class="order">订单</span><span class="evaluation_text">评论</span></div>
      <div class="content">

        <div class="serve_order">
          <img :src="orderChildrenInfo.image"  class="order_style">
          <ul>
            <li>
              订单编号:<span>{{ !order.orderId ? "暂无数据":order.orderId}}</span>
            </li>
            <li>
              子服务名称:<span>{{ !orderChildrenInfo.name? "暂无数据": orderChildrenInfo.name}}</span>
            </li>
            <li>
              开始时间:<span>{{ !orderChildrenInfo.createTime? "暂无数据": orderChildrenInfo.createTime}}</span>
            </li>
            <li>
              结束时间:<span>{{ !this.deadTime ? "暂无数据":this.deadTime }}</span>
            </li>
            <li>
              服务价格:<span>{{!orderChildrenInfo.price? "暂无数据":orderChildrenInfo.price}}万元</span>
            </li>

          </ul>
          <div class="evaluation_source" >
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
  props:['orderid','type'],
  name: "ServiceEvaluation",
  data(){
      return {
        value:null ,
        value1:null,
        textarea1:"",
        textarea2: '',
        order:[],//存放订单消息
        seller:[],//存放买家ID
        img_default:[],
        orderBuyInfo:[],
        orderChildrenInfo:[],
        deadTime:[],
        serveId:null,//存放服务ID

      }
    },
  async mounted() {
    await this.getOrderInfo()

  },
  methods:{
    //获取买家信息
    async  getSellerId(val){
      let result = await this.$axios.orderControllerList.getOrderBuyerInfo({
        id:val
      })
      this.orderBuyInfo=result.data.user
      // console.log(result.data.user)
    },
    //获取订单信息
    async getOrderInfo(){
      let result = await this.$axios.orderControllerList.getOrderInfo({
        orderId:this.orderid
      })
     // console.log(this.orderid)
      this.order=result.data.orderInfo
      this.seller=this.order.sellerId
      console.log(this.order)
      this.serverId=this.order.serveId
      await this.getSellerId(this.seller)
      await this.getServeInfo(this.serverId)
       console.log("订单",  this.order)
    },
    //获取订单子服务信息
    async getServeInfo(val){
      let results= await this.$axios.serveControllerList.getServesDetailById({
        id:val
      })
      this.orderChildrenInfo=results.data.serve
      const moment = require('moment')
      this.orderChildrenInfo.createTime=moment(this.orderChildrenInfo.createTime).format('YYYY-MM-DD ');
      this.deadTime =moment(this.orderChildrenInfo.createTime).add(4, "month").format('YYYY-MM-DD ');//2019-03-25 00:00:00
       console.log(  "服务信息",this.orderChildrenInfo)
    },
    //发布评论
    async submitComment(){
      const result= await this.$axios.orderControllerList.submitComment({
         userId:this.$store.getters.getUserInfo.id,
         serveId:this.serverId,
         content:this.textarea2,
          star:this.value
      })
      if(result.code==2000){}
      this.$message.success("评论成功！");
      await this.$router.push({
        path: "/buyer/myorder"//要跳转的页面的路由
      });
    }
  }
}
</script>

<style scoped lang="scss">
.service-evaluation{
  box-shadow: 0px 2px 4px 3px #E1E1E1;
  .content{
    margin-bottom: 20px;
    .serve_order{
      display: flex;
      justify-content: flex-start;
      .order_style{
        width: 210px;
        height: 210px;
        margin: 20px;
      }
      .evaluation_source{
        width: 400px;
        .star_style{
          margin-top: 30px;
        }
        .input_style{
          margin-top: 30px;
        }
      }
      ul{
        margin-top: 10px;
        width: 400px;
        li{
          line-height: 20px;
          margin: 20px;
          span{
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
  .evaluation_title{
    margin-top: 10px;
    border: 1px solid #E7E7E7;
    background: #FAFAFA;
    height: 30px;
    .order{
      margin-left: 20px;
      line-height: 30px;
    }
    .evaluation_text{
      margin-left: 600px;
      line-height: 30px;

    }
  }
  .serve_company{
    height: 150px;
    border: 1px solid #E7E7E7;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 2px 4px 3px #E1E1E1;
    .img_style{
      height: 130px;
      width: 130px;
      margin-left: 20px;
      margin-right: 20px;

    }
    .company_detail{
      height: 130px;
      margin-left: 20px;
      ul>li{
        line-height: 30px;
        span{
          margin-left: 10px;
        }
      }
    }
  }

}

</style>
