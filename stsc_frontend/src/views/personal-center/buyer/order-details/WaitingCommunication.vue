<template>
  <div class="waiting-communication">
    <div class="service-snapshot-immediately" v-if="type === '0'">
      <div class="service-snapshot">
        <h3>服务快照</h3>
        <div class="service-snapshot-immediately">
          <div class="service-snapshot-main">
            <div class="service-snapshot-item">
              <span>服务1：</span>
              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="service-contract">
        <h3>需求方相关合同</h3>
        <div class="service-contract-main">
          <div class="service-contract-item">
            <span>服务1：</span>
            <el-upload
                class="upload-demo"
                action="/ph/stcsp/fileoss/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
                ref="upload"
                v-if="contractForBuyer.length === 0"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <ul>
              <li v-for="(item,index) in contractForBuyer" :key="index">
                <a @click="pdfShow(item.fileUrl)">{{item.fileName}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="service-operation" v-if="contractForBuyer.length === 0">
        <el-button @click="submitOrderInfo" type="primary">提交</el-button>
      </div>
    </div>
    <div class="service-snapshot-split" v-else>
      <div class="service-snapshot">
        <h3>服务快照</h3>
        <div class="service-snapshot-main">
          <div class="service-snapshot-item" v-for="(item,index) in  orderSplitInfo.subOrderInfoVoList" :key="index">
            <span>{{item.subOrderName}}</span>
            <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="service-contract">
        <h3>需求方服务合同</h3>
        <div class="service-contract-split" >
          <div class="service-contract-main">
            <div class="service-contract-item" v-for="(item,index) in orderSplitInfo.subOrderInfoVoList" :key="index">
              <span>{{item.subOrderName}}</span>
              <el-upload
                  class="upload-demo"
                  action="/ph/stcsp/fileoss/upload/"
                  :on-preview="handleSplitPreview"
                  :on-remove="handleSplitRemove"
                  :file-list="fileSplitList"
                  :on-change="changeSplitUpload"
                  :on-success="(response, file)=>{return handleSplitSuccess(response, file,item.subOrderId,index)}"
                  :auto-upload="false"
                  :before-upload="handleSplitBeforeUpload"
                  ref="uploadSplit"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="service-operation">
        <el-button @click="submitSplitOrderInfo" type="primary">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['orderid','type'],
  name: "WaitingCommunication",
  data() {
    return {
      fileList:[],
      fileTempSplitList:[],
      fileSplitList:[],
      contractForBuyer:[],
      orderInfo:{},
      orderSplitInfo:{},
      contractSplitInfo:[],
      contractSplitInfoNum:0
    }
  },
  async created(){
    await this.getOrderInfo()
  },
  methods: {
    uploadFile(file,name) {
      this.fd.append('file'+name,file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    changeUpload(file, fileList){
      console.log(fileList)
    },
    handleBeforeUpload(file){
    },
    async submitOrderInfo(){
      if (this.fileList.length !==0 ) {
        await this.$refs.upload.submit();
      }else {
        this.$message({
          message: '请上传相应服务的合同',
          center: true,
          type:'error'
        })
      }
    },
    async getOrderInfo(){
      if (this.type === '0'){
        let result = await this.$axios.orderControllerList.getOrderInfo({
          orderId:this.orderid
        })
        if (result.code === 20000){
          this.orderInfo = result.data.orderInfo
          if (result.data.orderInfo.contractForBuyer !== null){
            result.data.orderInfo.contractForBuyer.split(',').slice(-1).map((item)=>{
              this.contractForBuyer.push({
                fileName:item.split('/').slice(-1)[0].split('_')[1],
                fileUrl:item
              })
            })
          }
        }
      }
      if (this.type === '1'){
        let result = await this.$axios.orderControllerList.getSplitDetailInfo({
          id:this.orderid
        })
        if (result.code === 20000){
          this.orderSplitInfo =result.data.subOrderInfo
        }
      }
    },
    pdfShow(fileUrl){
      window.open('/pdf/web/viewer.html?file=' + fileUrl);
    },

    async submitSplitOrderInfo(){
      for (let i = 0; i <this.orderSplitInfo.subOrderInfoVoList.length;i++){
        await Array.from(this.$refs.uploadSplit)[i].submit()
      }
    },
    handleSplitPreview(file){

    },
    handleSplitRemove(file, fileList){

    },
    changeSplitUpload(file, fileList){

    },
    handleSplitBeforeUpload(file){

    },
    async handleSplitSuccess(response, file, subOrderId,index){
      if (response.code === 20000){
        this.contractSplitInfo[index] = `${subOrderId},${response.data.url}`
        this.contractSplitInfoNum++
        if (this.contractSplitInfoNum === this.orderSplitInfo.subOrderInfoVoList.length){
          let result = await this.$axios.orderControllerList.setUploadContracts(this.contractSplitInfo)
          // if (result.code === 20000){
          //   this.$router.push()
          // }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.waiting-communication {
  width: 100%;
  .service-snapshot-immediately {
    .service-snapshot {
      box-sizing: border-box;
      width: 100%;
      padding: 30px;
      box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
      border-radius: 4px;
      margin-bottom: 20px;
      h3 {
        font-size: 18px;
        margin-bottom: 18px;
      }
      .service-snapshot-main {
        display:flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .service-snapshot-item {
          height: 150px;
          margin-right: 30px;
          margin-bottom: 30px;
          span {
            display:inline-block;
            margin-right: 20px;
          }
          img {
            width: auto;
            height:100%;
            vertical-align:top;
          }
        }
      }
    }
    .service-contract {
      box-sizing: border-box;
      width: 100%;
      padding: 30px;
      box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
      border-radius: 4px;
      margin-bottom: 20px;
      h3 {
        font-size: 18px;
        margin-bottom: 18px;
      }
      .service-contract-main {
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .service-contract-item {
          width: 30%;
          display:flex;
          justify-content:space-between;
          flex-wrap: wrap;
          margin-right: 20px;
          margin-bottom: 30px;
          .upload-demo {
            display:inline-block;
            flex:1;
          }
          span {
            display:inline-block;
          }
          &:last-child {
            margin-right: 0;
          }
          ul {
            li {
              a {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .service-operation {
      width: 100%;
      text-align: center;
      margin-bottom:10px;
    }
  }
  .service-snapshot-split {
    .service-snapshot {
      box-sizing: border-box;
      width: 100%;
      padding: 30px;
      box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
      border-radius: 4px;
      margin-bottom: 20px;
      h3 {
        font-size: 18px;
        margin-bottom: 18px;
      }
      .service-snapshot-main {
        display:flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .service-snapshot-item {
          height: 150px;
          margin-right: 30px;
          margin-bottom: 30px;
          span {
            display:inline-block;
            width:200px;
            margin-right: 20px;
          }
          img {
            width: auto;
            height:100%;
            vertical-align:top;
          }
        }
      }
    }
    .service-contract {
      box-sizing: border-box;
      width: 100%;
      padding: 30px;
      box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
      border-radius: 4px;
      margin-bottom: 20px;
      h3 {
        font-size: 18px;
        margin-bottom: 18px;
      }
      .service-contract-main {
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .service-contract-item {
          width: 30%;
          display:flex;
          flex-direction: column;
          justify-content:space-between;
          flex-wrap: wrap;
          margin-right: 20px;
          margin-bottom: 30px;
          .upload-demo {
            margin-top: 10px;
            display:inline-block;
            flex:1;
          }
          span {
            display:inline-block;
          }
          &:last-child {
            margin-right: 0;
          }
          ul {
            li {
              a {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .service-operation {
      width: 100%;
      text-align: center;
      margin-bottom:10px;
    }
  }

}
</style>
