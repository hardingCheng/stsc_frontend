<template>
  <div class="order-in-progress">
    <div class="order-info">
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
    }
  },
  components: {
    OrderSteps,
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  },
  async mounted() {
    if (this.orderid && this.type === '0'){
      let result = await this.$axios.orderControllerList.setpDoing({
        id:this.orderid
      })
      this.type0OrderInfo = result.data
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
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          span {
            margin-left: 20px;
          }
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
