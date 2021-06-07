<template>
  <div class="service-acceptance">
    <h3>本次服务验收</h3>
    <div class="service-acceptance-info">
      <ul>
        <li>监理人：<span>杜先生</span></li>
        <li>项目起止时间：<span>2021年03月18日 — 2021年04月08日</span></li>
        <li>监理人意见：<span>上传完验收报告，等待监理人给出验收意见！</span></li>
      </ul>
    </div>
    <div class="service-acceptance-report">
      <span>验收相关报告：</span>
      <el-upload
          class="upload-demo"
          ref="upload"
          action="/ph/stcsp/fileoss/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          multiple
          :on-success="handleSuccess"
          :on-change="handleChange"
          v-if="acceptanceUploadFleList.length === 0"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
<!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
        <div slot="tip" class="el-upload__tip">只能上传pdf文件！</div>
      </el-upload>
      <ul v-else >
        <li v-for="(item,index) in  acceptanceUploadFleList" :key="index"><el-button type="text" @click="pdfShow(item.fileUrl)">{{item.fileName}}</el-button></li>
      </ul>
    </div>
    <div class="service-acceptance-operation" v-if="acceptanceUploadFleList.length === 0">
      <el-button type="primary" @click="submitUpload">确认订单完成</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props:['orderid','type'],
  name: "ServiceAcceptance",
  data(){
    return {
      fileList:[],
      filerReadyUploadList:[],
      uploadFileNum:0,
      uploadFileUrl:'',
      acceptanceUploadFleList:[]
    }
  },
  methods:{
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    pdfShow(fileUrl){
      window.open('/pdf/web/viewer.html?file=' + fileUrl);
    },
    async handleSuccess(response,file, fileList) {
      if (response.code === 20000 && response.data.url !== ""){
        this.uploadFileNum++
        this.uploadFileUrl = this.uploadFileUrl + response.data.url + ','
        if(this.type === '0'){
          if (this.uploadFileNum === this.filerReadyUploadList.length){
            let result = await this.$axios.orderControllerList.setServerUploadFile({
              attachments:this.uploadFileUrl
            },{
              orderId:this.orderid
            })
          }
        } else if(this.type === '1'){
          if (this.uploadFileNum === this.filerReadyUploadList.length){
            let result = await this.$axios.orderControllerList.setSubOrderAcceptanceList({
              attachments:this.uploadFileUrl
            },{
              subOrderId:this.orderid
            })
          }
        }
      }
    },
    handleChange(file, fileList) {
      if (file.status === "ready"){
        this.filerReadyUploadList.push(file)
      }
    },
    async getAcceptanceUploadFle(){
     if (this.type === '0'){
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
     }else if (this.type === '1'){
       let result = await this.$axios.orderControllerList.getSubOrderAcceptanceList({
         subOrderId:this.orderid
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
    }
  },
  async mounted(){
    await this.getAcceptanceUploadFle()
  }
}
</script>

<style lang="scss" scoped>
.service-acceptance {
  width: 100%;
  box-sizing: border-box;
  padding:40px;
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
    justify-content:flex-start;
    width: 100%;
    span {
      line-height:40px;
    }
    .upload-demo {
      width: 50%;
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
