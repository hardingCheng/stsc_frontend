<template>
  <div class="service-acceptance">
    <h3>服务验收</h3>
    <div class="service-acceptance-info">
      <ul>
        <li>监理人：<span>杜先生</span></li>
        <li>项目起止时间：<span>2021年03月18日 — 2021年04月08日</span></li>
        <li>监理人意见：<span>验收合格</span></li>
      </ul>
    </div>
    <div class="service-acceptance-report">
      <span>验收报告：</span>
      <ul>
        <li v-for="(item,index) in  acceptanceUploadFleList" :key="index"><el-button type="text" @click="pdfShow(item.fileUrl)">{{item.fileName}}</el-button></li>
      </ul>
    </div>
   <div class="service-acceptance-operation">
     <el-button type="primary">确认验收</el-button>
   </div>

  </div>
</template>

<script>
export default {
  props:['orderid','type'],
  name: "ServiceAcceptance",
  data(){
    return {
      acceptanceUploadFleList:[]
    }
  },
  methods:{
    pdfShow(fileUrl){
      window.open('/pdf/web/viewer.html?file=' + fileUrl);
    },
    async getAcceptanceUploadFle(){
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
    },
    async getOrderInfo(){
      let result = await this.$axios.orderControllerList.getOrderInfo({
        orderId:this.orderid
      })
    },
    async getInfo(){
      if(this.type === '0'){
        await this.getAcceptanceUploadFle()
        await this.getOrderInfo()
      }else if (this.type === '1'){
        await this.getAcceptanceUploadFle()
        await this.getOrderInfo()
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
  height: 340px;
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
