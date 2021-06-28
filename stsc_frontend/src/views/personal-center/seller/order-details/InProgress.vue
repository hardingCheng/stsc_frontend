<template>
  <div class="order-in-progress">
    <div class="order-info" v-if="type === '0'">
      <div class="order-info-left">
        <h3>订单信息</h3>
        <ul class="order-info-list">
          <li>订单名称：<span>{{type0OrderInfo.order.name}}</span></li>
          <li>订单编号：<span>{{type0OrderInfo.order.orderId}}</span></li>
          <li>服务方：<span>{{type0OrderInfo.company}}</span></li>
          <li>联系地址：<span>{{type0OrderInfo.address}}</span></li>
        </ul>
      </div>
      <div class="order-info-right">
        <h3>流程进度</h3>
        <div class="order-info-flow">
          <div class="order-info-flow-left">
            子服务1：
            <div>
              <el-button size="small" style="margin-top: 12px;" @click="next" type="primary" >申请异常</el-button>
            </div>
          </div>
          <div class="order-info-flow-right">
            <order-steps></order-steps>
          </div>
        </div>
      </div>
    </div>
    <div class="order-info" v-if="type === '1'">
      <div class="order-info-left">
        <h3>订单信息</h3>
        <ul class="order-info-list" >
          <li>订单名称：<span>{{orderInfo.subOrderName}}</span></li>
          <li>订单编号：<span>{{orderInfo.subOrderId}}</span></li>
          <li>需求方：<span>{{orderInfo.buyerName}}</span></li>
          <li>联系方式：<span>{{orderInfo.telephone}}</span></li>
        </ul>
      </div>
      <div class="order-info-right">
        <h3>流程进度</h3>
        <div class="order-info-flow">
          <div class="order-info-flow-left">
            <span>{{orderInfo.subOrderName}}</span>
            <div>
              <el-button size="small" style="margin-top: 12px;"  type="danger" >申请异常</el-button>
              <el-button size="small" style="margin-top: 12px;" @click="next" type="primary" :disabled="completeCon" v-if="!completeCon">下一步</el-button>
              <el-button size="small" style="margin-top: 12px;"  type="primary" :disabled="completeCon" v-else>已完成</el-button>
            </div>
          </div>
          <div class="order-info-flow-right">
            <el-steps :active="active" finish-status="success" align-center>
              <el-step :title="item" v-for="(item,index) in orderInfo.nodes" :key="index">
              </el-step>
            </el-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSteps from "../../../../components/OrderSteps";
export default {
  props:['orderid','type'],
  name: "InProgress",
  data() {
    return {
      tableData: [{
        orderId: '28218412324',
        subServiceName: '机器人机械手臂设计',
        startTime: '2021年05月01日',
        endTime: '2021年05月31日',
        servicePrice: '100万元',
        serviceStatus: '进行中'
      }],
      active: 0,
      type0OrderInfo:{
        address: '',
        company: '',
        order:{
          buyerId: '',
          contract: '',
          createTime: '',
          id: '',
          name: '',
          orderId: '',
          requirementId: '',
          sellerId: '',
          serveId: '',
          status: '',
          type: '',
          updateTime: '',
        }
      },
      orderInfo:{},
      completeCon:true
    }
  },
  components: {
    OrderSteps,
  },
  methods: {
    async next() {
      let result = await this.$axios.orderControllerList.setNextStepForSeller({
        orderId: this.orderid,
        step:this.active
      })
      if (result.code === 20000) {
        let result = await this.$axios.orderControllerList.getSubOrderSellerInfo({
          subOrderId:this.orderid
        })
        this.orderInfo = result.data
        this.active = (this.orderInfo.sellerStep+1)
        if (this.orderInfo.sellerStep+1 === this.orderInfo.nodes.length){
          this.$message({
            type:'success',
            message:'此订单已经完成'
          })
          await this.$router.push(`/pc/sellerorderdetail/serviceacceptance/${this.orderid}/${this.type}`);
          this.completeCon = true
        }else {
          this.completeCon = false
        }
      }
    }
  },
  async mounted() {
    if (this.orderid && this.type === '0'){
      let result = await this.$axios.orderControllerList.setpDoing({
        id:this.orderid
      })
      this.type0OrderInfo = result.data
    }
    if (this.orderid && this.type === '1'){
      let result = await this.$axios.orderControllerList.getSubOrderSellerInfo({
        subOrderId:this.orderid
      })
      this.orderInfo = result.data
      this.active = (this.orderInfo.sellerStep+1)
      if (this.orderInfo.sellerStep+1 === this.orderInfo.nodes.length){
        this.completeCon = true
      }else {
        this.completeCon = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-in-progress {
  width: 100%;
  .order-info {
    box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
    border-radius: 4px;
    height: 375px;
    display:flex;
    justify-content:flex-start;
    align-items: center;
    margin-bottom: 40px;
    .order-info-left {
      width:30%;
      height:100%;
      box-sizing: border-box;
      padding:30px 20px 20px 20px;
      border-right: 1px solid #E7E7E7;
      h3 {
        font-size: 18px;
        margin-bottom: 18px;
      }
      .order-info-list {
        li {
          margin-bottom: 30px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
        }
      }
      h6 {
        font-size: 14px;
        font-weight: 500;
        margin-bottom:10px;
      }
      .suborder-info-list {
        li {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          &>span:first-child {
            margin-right: 20px;
          }
        }
      }
      a {
        margin-top: 20px;
        display: block;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
    .order-info-right {
      height:100%;
      padding:30px 20px 20px 20px;
      box-sizing: border-box;
      flex: 1;
      h3 {
        font-size: 18px;
        margin-bottom: 18px;
      }
    }
  }
  .order-info-table {
    margin-bottom: 40px;
  }
  .order-info-flow {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    padding:20px;
    box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
    border-radius: 4px;
    margin-bottom: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .order-info-flow-left {
      span {
        display:inline-block;
        width:160px;
      }
    }
    .order-info-flow-right {
      flex: 1;
      margin-left: 50px;
    }
  }
  .order-in-progress-immediately {
    .order-info {
      .order-info-left {
        li {
          margin-bottom: 40px !important;
        }
      }
      .order-info-right {
        .order-info-flow {
          border: 1px solid transparent;
          margin-top: 40px !important;
        }
      }
    }

  }
}
</style>
