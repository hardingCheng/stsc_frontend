<template>
  <div class="service-acceptance">
    <h3>服务验收</h3>
    <div class="service-acceptance-info">
      <ul>
        <li>监理人：<span>{{name ? name : '杜先生'}}</span></li>
        <li>项目起止时间：<span>{{order.createTime}} — {{order.updateTime}}</span></li>
        <li>监理人意见：<span>验收合格</span></li>
      </ul>
    </div>
    <div class="service-acceptance-report">
      <span>验收报告：</span>
      <ul>
        <li v-for="(item,index) in  acceptanceUploadFleList" :key="index"><el-button type="text" @click="pdfShow(item.fileUrl)">{{item.fileName}}</el-button></li>
      </ul>
    </div>
<!--    TODO 大订单的服务验收-->
   <div class="service-acceptance-operation" v-if="acceptIf">
     <el-button type="primary"   @click="setAcceptAttachment">确认验收</el-button>
     <el-button type="danger"   @click="setFailAttachment">验收失败</el-button>
   </div>
  </div>
</template>

<script>
export default {
  props:['orderid','type'],
  name: "ServiceAcceptance",
  data(){
    return {
      acceptanceUploadFleList:[],
      acceptIf:true,
      order: '',//存放订单信息
      name: '',//监理人
    }
  },
  methods:{
    pdfShow(fileUrl){
      window.open('/pdf/web/viewer.html?file=' + fileUrl);
    },
    async getAcceptanceUploadFle(){
      if (this.type === '0'){
        let result = await this.$axios.orderControllerList.getOrderAcceptanceList({
          orderId:this.orderid
        })
        if (result.code === 20000){
          result.data.fileurls.split(',').slice(0,-1).map((item) => {
            this.acceptanceUploadFleList.push({
              fileName:item.split('/').slice(-1)[0].split('_').slice(1).toString(),
              fileUrl:item
            })
          })
        }
      }else {
        let result = await this.$axios.orderControllerList.getAcceptanceUploadFle({
          orderId:this.orderid
        })
        if (result.code === 20000){
          result.data.fileurls.split(',').slice(0,-1).map((item) => {
            this.acceptanceUploadFleList.push({
              fileName:item.split('/').slice(-1)[0].split('_').slice(1).toString(),
              fileUrl:item
            })
          })
        }
      }
    },
    async getOrderInfo(){
      if (this.type === '0'){
        let result = await this.$axios.orderControllerList.getOrderInfo({
          orderId:this.orderid
        })
        if (result.data.orderInfo.status >= 4) {
          this.acceptIf = false
        }
        this.order = result.data.orderInfo
        this.name = result.data.orderInfo.buyerName
      }else {
        let result = await this.$axios.orderControllerList.getSplitDetailInfo({
          id:this.orderid
        })
        if (result.data.subOrderInfo.status >= 4) {
          this.acceptIf = false
        }
        this.order = result.data.subOrderInfo.subOrderInfoVoList[0]
        this.name = result.data.subOrderInfo.buyerName
      }

    },
    async getInfo(){
      if(this.type === '0'){
        await this.getAcceptanceUploadFle()
        await this.getOrderInfo()
      }else if (this.type === '1'){
        await this.getAcceptanceUploadFle()
        await this.getOrderInfo()
      }
    },
    async setAcceptAttachment(){
      let result = await this.$axios.orderControllerList.setAcceptAttachment({
        orderId:this.orderid
      })
      if (result.code === 20000){
        this.$message({
          type:'success',
          message:'此订单已经完成,进行服务评价！'
        })
        await this.$router.push(`/pc/buyerorderdetail/serviceevaluation/${this.orderid}/${this.type}`);
      }
    },
    async setFailAttachment(){
      let result = await this.$axios.orderControllerList.setCheckFailed({
        orderId:this.orderid
      })
      if (result.code === 20000){
        this.$message({
          type:'error',
          message:'此订单验收失败！'
        })
        await this.$router.push(`/pc/buyer/myorder`);
      }
    }
  },
  async mounted(){
    await this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.service-acceptance {
  width: 100%;
  box-sizing: border-box;
  padding:40px;
  height: 400px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 3px #E1E1E1;
  border-radius: 4px;
  margin-bottom:20px;
  h3 {
    font-size: 18px;
    margin-bottom: 18px;
  }
  .service-acceptance-info {
    ul>li {
      margin-bottom:30px;
      &:last-child>span {
        color: #01AD3F;
      }
    }
  }
  .service-acceptance-report {
    display:flex;
    span {
      line-height:40px;
    }
    ul{
      display:flex;
      li {
        margin-right: 30px;
      }
    }
  }
  .service-acceptance-operation {
    width: 100%;
    text-align: center;
  }
}
</style>
