<template>
  <div class="order-details-index">
    <div class="order-detail-progress">
      <ul class="navs">
<!--        此处需要判断切换-->
        <li :class="[routerIndex === 0?'active':'']"><a @click="routerJump(0)">合同上传</a></li>　
        <li :class="[routerIndex === 1?'active':'']"><a @click="routerJump(1)">进行中</a></li>　
        <li :class="[routerIndex === 2?'active':'']"><a @click="routerJump(2)">服务验收</a></li>　　
        <li :class="[routerIndex === 3?'active':'']"><a @click="routerJump(3)">服务评价</a></li>
      </ul>
    </div>
    <div class="order-detail-progress-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      orderid:'',
      routerIndex:0,
      orderInfo:{},
      orderSplitInfo:{}
    }
  },
  async mounted() {
    this.orderid = this.$route.params.orderid
    this.type = this.$route.params.type
    await this.getOrderInfo()
  },
  watch: {
    $route: {
      handler(to,from) {
        switch(to.name) {
          case 'buyerwaitingcommunication':
            this.routerIndex = 0
            break
          case 'buyerinprogress':
            this.routerIndex = 1
            break
          case 'buyerserviceacceptance':
            this.routerIndex = 2
            break
          case 'buyerserviceevaluation':
            this.routerIndex = 3
            break
        }
      },
      deep:true,
      immediate: true
    }
  },
  methods: {
    async routerJump(index){
      switch(index) {
        case 0:
          await this.getOrderInfo()
          if (this.orderSplitInfo.status >=1) {
            this.$router.push(`/buyer/orderdetail/waitingcommunication/${this.orderid}/${this.type}`)
          }
          break
        case 1:
          await this.getOrderInfo()
          if (this.orderSplitInfo.status >=2) {
            this.$router.push(`/buyer/orderdetail/inprogress/${this.orderid}/${this.type}`)
          }else{
            this.$message({
              message: '等待所有卖家上传，即可进行。',
              type: 'warning'
            });
          }
          break
        case 2:
          await this.getOrderInfo()
          if (this.orderSplitInfo.status >=3) {
            this.$router.push(`/buyer/orderdetail/serviceacceptance/${this.orderid}/${this.type}`)
          }
          break
        case 3:
          await this.getOrderInfo()
          if (this.orderSplitInfo.status >=4) {
            this.$router.push(`/buyer/orderdetail/serviceevaluation/${this.orderid}/${this.type}`)
          }
          break
      }
    },
    async getOrderInfo(){
      if (this.type === '0'){
        let result = await this.$axios.orderControllerList.getOrderInfo({
          orderId:this.orderid
        })
        if (result.code === 20000){
          this.orderInfo = result.data.orderInfo
        }
      }
      if (this.type === '1'){
        let result1 = await this.$axios.orderControllerList.getSplitDetailInfo({
          id:this.orderid
        })
        if (result1.code === 20000){
          this.orderSplitInfo =result1.data.subOrderInfo
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
      margin:30px auto;
      display:flex;
      justify-content:space-between;
      align-items:center;
      text-align: center;
      li {
        opacity:0.5;
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
          opacity:1;
        }

        &.active:after {
          opacity:1;
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
