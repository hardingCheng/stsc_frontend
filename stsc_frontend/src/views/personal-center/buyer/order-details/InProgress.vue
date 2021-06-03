<template>
  <div class="order-in-progress">
    <div class="order-in-progress-immediately" v-if="type === '0'">
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
    <div class="order-in-progress-split" v-else>
      <div class="order-info" >
        <div class="order-info-left">
          <h3>订单信息</h3>
          <ul class="order-info-list">
            <li>需求名称：<span>{{type1OrderInfo.requirementName}}</span></li>
            <li>订单编号：<span>{{type1OrderInfo.orderId}}</span></li>
            <li>需求方：<span>{{type1OrderInfo.buyerName}}</span></li>
            <li>联系地址：<span>{{type1OrderInfo.address}}</span></li>
          </ul>
          <h6>子订单数量：<span>{{subOrderInfoVoListLength}}</span></h6>
          <ul class="suborder-info-list">
            <li v-for="(item,index) in  type1OrderInfo.subOrderInfoVoList" :key="index">服务{{index+1}}：<span>{{item.subOrderName}}</span>服务商{{index+1}}：<span>{{item.sellerName}}</span></li>
          </ul>
          <a> 查看更多</a>
        </div>
        <div class="order-info-right">
          <h3>服务进度</h3>
          <b-pai :arrangeList="arrangeList" @getNodeInfo="getNodeInfo"></b-pai>
        </div>
      </div>
      <div class="order-info-table">
        <el-table
            :data="subOrderDetailsInfo"
            border
            style="width: 100%"
            :header-cell-style="{background:'#FAFAFA',}"
        >
          <el-table-column
              prop="subOrderId"
              label="订单编号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="orderName"
              label="子服务名称"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="price"
              label="服务价格"
              align="center"
          >
            <template slot-scope="scope">
              <span type="success">{{'￥'+scope.row.price+'万'}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="status"
              label="服务状态"
              align="center"
          >
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.status | modStatus}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="order-info-flow">
        <div class="order-info-flow-left" v-if="subOrderDetailsInfo[0]">
          {{subOrderDetailsInfo[0].orderName ? subOrderDetailsInfo[0].orderName :''}}
          <div>
            <el-button size="small" style="margin-top: 12px;" @click="next" type="danger" >申请异常</el-button>
            <el-button size="small" style="margin-top: 12px;" @click="next" type="primary" >已完成</el-button>
          </div>
        </div>
        <div class="order-info-flow-right">
          <el-steps :active="subOrderDetailsInfo[0].sellerStep+1" finish-status="success" v-if="subOrderDetailsInfo[0]" align-center>
            <el-step v-for="(item,index) in subOrderDetailsInfo[0].nodes ? subOrderDetailsInfo[0].nodes :[]" :title="item" :key="index">
              <template v-slot:description v-if="index+1 <= subOrderDetailsInfo[0].sellerStep+1 && index>subOrderDetailsInfo[0].buyerStep" >
                <el-button type="text" @click="stepSubmit(index,subOrderDetailsInfo[0].id)">确认</el-button>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BPai from '../../../../views/BPai'
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
      type1OrderInfo:{},
      arrangeList:{},
      subOrderInfoVoListLength:0,
      subOrderDetailsInfo:[],
      currentSubRequirementId:''
    }
  },
  components: {
    OrderSteps,
    BPai
  },
  methods: {
    next() {
      // this.active++
    },
    async getNodeInfo(nodeId){
      this.subOrderDetailsInfo.length = 0
      let result = await this.$axios.orderControllerList.getSubOrderDetailsInfo({
        subRequireId:nodeId
      })
      this.currentSubRequirementId = nodeId
      this.subOrderDetailsInfo.push(result.data)
    },
    async stepSubmit(index,subOrderId) {
      console.log(subOrderId)
      let result = await this.$axios.orderControllerList.setNextStepForBuyer({
        orderId:subOrderId,
        step:index
      })
      if (result.code == 20000) {
        this.subOrderDetailsInfo.length = 0
        let result = await this.$axios.orderControllerList.getSubOrderDetailsInfo({
          subRequireId:this.currentSubRequirementId
        })
        this.subOrderDetailsInfo.push(result.data)
      }
    }
  },
  async created(){

  },
  async mounted() {
    const timer = setInterval(async () => {
      // 某些定时器操作
      this.subOrderDetailsInfo.length = 0
      let result = await this.$axios.orderControllerList.getSubOrderDetailsInfo({
        subRequireId:this.currentSubRequirementId
      })
      this.subOrderDetailsInfo.push(result.data)
    }, 1500);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer);
    })
    if (this.orderid && this.type === '0'){
      let result = await this.$axios.orderControllerList.setpDoing({
        id:this.orderid
      })
     this.type0OrderInfo = result.data
    }
    if (this.orderid && this.type === '1'){
      let result1 = await this.$axios.orderControllerList.getSplitDetailInfo({
        id:this.orderid
      })
      this.type1OrderInfo = result1.data.subOrderInfo
      this.subOrderInfoVoListLength = result1.data.subOrderInfo.subOrderInfoVoList.length
      let result = await this.$axios.arrangeController.getArrangeList({
        requirementId:this.type1OrderInfo.requirementId
      })
      this.arrangeList = result.data.arrange
      await this.getNodeInfo(result.data.arrange.nodeList[0].id)
    }
  },
  filters:{
    modStatus(value){
      switch (value){
        case 1:
          return '待沟通'
        case 2:
          return '进行中'
        case 3:
          return '已验收'
        case 4:
          return '已评价'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-in-progress {
  width: 100%;
  .order-in-progress-split{
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
        width:15%;
      }
      .order-info-flow-right {
        flex: 1;
        margin-left: 50px;
      }
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
