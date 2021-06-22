<template>
  <div class="order-details-index">
        <div class="order-detail-progress">
          <ul class="navs">
            <!--        此处需要判断切换-->
            <li :class="[routerIndex === 0?'active':'']"><a @click="routerJump(0)">合同上传</a></li>　
            <li :class="[routerIndex === 1?'active':'']"><a @click="routerJump(1)">进行中</a></li>　
            <li :class="[routerIndex === 2?'active':'']"><a @click="routerJump(2)">服务验收</a></li>　　
<!--            <li :class="[routerIndex === 3?'active':'']"><a @click="routerJump(3)">服务评价</a></li>-->
          </ul>
        </div>
    <div class="order-detail-progress">
      <custom-step-diagram :stepInfo="stepInfo"></custom-step-diagram>
    </div>
    <div class="order-detail-progress-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CustomStepDiagram from "../../../../components/CustomStepDiagram";

export default {
  name: "Index",
  components: {CustomStepDiagram},
  data() {
    return {
      orderid: '',
      routerIndex: 0,
      stepInfo: {
        list: [{
            status: '待沟通',
          }, {
           status: '进行中',
        },{
          status: '服务验收',
        },{
          status: '服务评价',
        }],
        step: 2
      },
      orderInfo:{}
    }
  },
  mounted() {
    this.orderid = this.$route.params.orderid
    this.type = this.$route.params.type
  },
  watch: {
    $route: {
      handler(to, from) {
        switch (to.name) {
          case 'sellerwaitingcommunication':
            this.routerIndex = 0
            break
          case 'sellerinprogress':
            this.routerIndex = 1
            break
          case 'sellerserviceacceptance':
            this.routerIndex = 2
            break
          case 'sellerserviceevaluation':
            this.routerIndex = 3
            break
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async routerJump(index) {
      switch (index) {
        case 0:
          await this.getOrderInfo()
          if (this.orderInfo.status >=1) {
            this.$router.push(`/seller/orderdetail/waitingcommunication/${this.orderid}/${this.type}`)
          }
          break
        case 1:
          await this.getOrderInfo()
          if (this.orderInfo.status >=2) {
            this.$router.push(`/seller/orderdetail/inprogress/${this.orderid}/${this.type}`)
          }
          break
        case 2:
          await this.getOrderInfo()
          console.log(this.orderInfo.status)
          if (this.orderInfo.status >=3) {
            this.$router.push(`/seller/orderdetail/serviceacceptance/${this.orderid}/${this.type}`)
          }
          break
        case 3:
          await this.getOrderInfo()
          if (this.orderInfo.status >=4) {
            this.$router.push(`/seller/orderdetail/serviceevaluation/${this.orderid}/${this.type}`)
          }
          break
      }
    },
    async getOrderInfo() {
      if (this.type === '0') {
        let result = await this.$axios.orderControllerList.getOrderInfo({
          orderId: this.orderid
        })
        if (result.code === 20000) {
          this.orderInfo = result.data.orderInfo
        }
      } else if (this.type === '1') {
        let result = await this.$axios.orderControllerList.getSubOrderInfo({
          subOrderId: this.orderid
        })
        if (result.code === 20000) {
          this.orderInfo = result.data.orderInfo
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.order-details-index {
  width: 100%;

  .order-detail-progress {
    width: 100%;

    .navs {
      width: 100%;
      margin: 30px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;

      li {
        opacity: 0.5;
        flex: 1;
        padding: 0 10px 0 30px;
        line-height: 40px;
        background: #1794FF;
        color: #fff;
        position: relative;
        margin-right: 10px;

        a {
          cursor: pointer;
        }

        &:after {
          content: '';
          display: block;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-left: 20px solid #1794FF;
          position: absolute;
          right: -20px;
          top: 0;
          z-index: 10;
        }

        &:before {
          content: '';
          display: block;
          border-top: 20px solid #1794FF;
          border-bottom: 20px solid #1794FF;
          border-left: 20px solid #fff;
          position: absolute;
          left: 0px;
          top: 0;
        }

        &:first-child {
          border-radius: 4px 0 0 4px;
          padding-left: 25px;
        }

        &:first-child {
          border-radius: 4px 0 0 4px;
          padding-left: 25px;
        }

        &:first-child:before {
          display: none;
        }

        &.active {
          opacity: 1;
        }

        &.active:after {
          opacity: 1;
        }
      }
    }

    //.navs li:last-child,
    //.cssNavEnd {
    //  border-radius: 0px 4px 4px 0px;
    //  padding-right: 25px;
    //}
    //.navs li:last-child:after,
    //.cssNavEnd:after {
    //  display: none;
    //}


  }
}
</style>
