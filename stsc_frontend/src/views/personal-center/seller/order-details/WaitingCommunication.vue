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
        <h3>服务方相关合同</h3>
        <div class="service-contract-immediately" >
          <div class="service-contract-main">
            <div class="service-contract-item">
              <div>服务1：</div>
              <el-upload
                  class="upload-demo"
                  action="/ph/stcsp/fileoss/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :auto-upload="false"
                  :on-change="changeUpload"
                  :on-success="handleSuccess"
                  ref="upload"
                  v-if="contractForSeller.length === 0"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <ul>
                <li v-for="(item,index) in contractForSeller" :key="index">
                  <a @click="pdfShow(item.fileUrl)">{{item.fileName}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="service-operation" v-if="contractForSeller.length === 0">
        <el-button @click="submitOrderInfo" type="primary">提交</el-button>
      </div>
    </div>
    <div class="service-snapshot" v-else>
      <div class="service-snapshot">
        <h3>服务快照</h3>
        <div class="service-snapshot-split" >
          <div class="service-snapshot-main">
            <div class="service-snapshot-item">
              <span>子服务1：</span>
              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
            </div>
            <div class="service-snapshot-item">
              <span>子服务1：</span>
              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
            </div>
            <div class="service-snapshot-item">
              <span>子服务1：</span>
              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
            </div>
            <div class="service-snapshot-item">
              <span>子服务1：</span>
              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
            </div>
            <div class="service-snapshot-item">
              <span>子服务1：</span>
              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
            </div>
            <div class="service-snapshot-item">
              <span>子服务1：</span>
              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="service-contract">
        <h3>服务方服务合同</h3>
        <div class="service-contract-split" >
          <div class="service-contract-main">
            <div class="service-contract-item">
              <div>子服务1：</div>
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :auto-upload="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="service-contract-item">
              <div>子服务1：</div>
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :auto-upload="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="service-contract-item">
              <div>子服务1：</div>
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :auto-upload="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="service-contract-item">
              <div>子服务1：</div>
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :auto-upload="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="service-contract-item">
              <div>子服务1：</div>
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :auto-upload="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="service-operation">
        <el-button @click="submitOrderInfo" type="primary">提交</el-button>
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
      contractForSeller:[]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    changeUpload(file, fileList){
      this.fileList = fileList
    },
    async handleSuccess(response, file, fileList){
      if (this.type === '0' && response.code === 20000){
        let result = await this.$axios.orderControllerList.nextForUpload({
          contractUrl:response.data.url,
          orderId:this.orderid
        })
        if (result.code === 20000){
          setTimeout(async () => {
            this.$message({
              message: '合同快照上传成功',
              center: true,
              type:'success'
            })
            await this.$router.push(`/seller/orderdetail/inprogress/${this.orderid}/${this.type}`)
          },1000)
        }
      }
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
      let result = await this.$axios.orderControllerList.getOrderInfo({
        orderId:this.orderid
      })
      if (result.code === 20000){
        if (result.data.orderInfo.contractForSeller !== null){
          result.data.orderInfo.contractForSeller.split(',').slice(-1).map((item)=>{
            this.contractForSeller.push({
              fileName:item.split('/').slice(-1)[0].split('_')[1],
              fileUrl:item
            })
          })
        }
      }
    },
    pdfShow(fileUrl){
      window.open('/pdf/web/viewer.html?file=' + fileUrl);
    },
  },
  async mounted() {
    await this.getOrderInfo()
  }
}
</script>

<style lang="scss" scoped>
.waiting-communication {
  width: 100%;
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
      flex-wrap: wrap;
      justify-content:flex-start;
      .service-contract-item {
        width: 30%;
        display:flex;
        margin-right: 20px;
        margin-bottom: 30px;
        .upload-demo {
          display:inline-block;
          width: 75%;
          margin-left: 10px;
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
</style>
