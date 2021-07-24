<template>
  <div class="waiting-communication">
    <!--    <div class="service-snapshot">-->
    <!--      <div class="service-snapshot">-->
    <!--        <h3>服务快照</h3>-->
    <!--        <div class="service-snapshot-split" >-->
    <!--          <div class="service-snapshot-main">-->
    <!--            <div class="service-snapshot-item" v-if="orderInfo">-->
    <!--              <span>{{orderInfo.name}}:</span>-->
    <!--              <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="service-contract">-->
    <!--        <h3>服务方服务合同</h3>-->
    <!--        <div class="service-contract-split" >-->
    <!--          <div class="service-contract-main">-->
    <!--            <div class="service-contract-item" v-if="orderInfo">-->
    <!--              <span>{{orderInfo.name}}:</span>-->
    <!--              <el-upload-->
    <!--                  class="upload-demo"-->
    <!--                  action="/ph/stcsp/fileoss/upload/"-->
    <!--                  :on-preview="handlePreview"-->
    <!--                  :on-remove="handleRemove"-->
    <!--                  :file-list="fileList"-->
    <!--                  :on-change="changeUpload"-->
    <!--                  :auto-upload="false"-->
    <!--                  ref=""-->
    <!--              >-->
    <!--                <el-button size="small" type="primary">点击上传</el-button>-->
    <!--              </el-upload>-->
    <!--&lt;!&ndash;              <ul>&ndash;&gt;-->
    <!--&lt;!&ndash;                 <li v-for="(item,index) in contractForSeller" :key="index">&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;                  <a @click="pdfShow(item.fileUrl)">{{item.fileName}}</a>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;                </li>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;              </ul>&ndash;&gt;-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="service-operation">-->
    <!--        <el-button @click="submitOrderInfo" type="primary">提交</el-button>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="service-snapshot">
      <h3>服务快照</h3>
      <div class="service-snapshot-immediately">
        <div class="service-snapshot-main">
          <div class="service-snapshot-item" v-if="orderInfo">
            <span>{{ orderInfo.name }}:</span>
            <img v-if="orderInfo.serviceSnapshot" :src="orderInfo.serviceSnapshot[0].serviceSnapshot"
                 alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="service-contract">
      <h3>服务方相关合同及流程选择</h3>
      <div class="service-contract-immediately">
        <div class="service-contract-main">
          <div class="service-contract-item" v-if="orderInfo">
            <span v-if="contractForSeller.length === 0"> {{orderInfo.name || orderInfo.name}}:</span>
            <el-upload
                class="upload-demo"
                action="/ph/stcsp/fileoss/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
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
                <span>{{ orderInfo.name }}:</span><el-button type="text" @click="pdfShow(item.fileUrl)">{{ item.fileName }}</el-button>
              </li>
            </ul>
            <div class="service-process" v-if="contractForSeller.length === 0">
              <p>服务流程选择编辑：</p>
<!--              <el-cascader :options="options"  placeholder="请选择服务相应分类"  v-model="category" :props="{ checkStrictly: true }" clearable ></el-cascader>-->
              <el-row style="margin-top: 30px;" >
                <el-col :span="20">
                  <el-steps :space="200" :active="-1" finish-status="success" align-center>
                    <el-step :title="item" status="process" v-for="(item,index) in orderInfo.node"></el-step>
                  </el-steps>
                </el-col>
                <el-col :span="4">
                  <el-button @click="centerDialogVisible = true" type="primary" icon="el-icon-edit" circle></el-button>
                </el-col>
              </el-row>
            </div>
            <div class="service-process" v-else>
              <p>服务流程：</p>
              <!--              <el-cascader :options="options"  placeholder="请选择服务相应分类"  v-model="category" :props="{ checkStrictly: true }" clearable ></el-cascader>-->
              <el-row style="margin-top: 30px;" >
                <el-col :span="20">
                  <el-steps :space="200" :active="-1" finish-status="success" align-center>
                    <el-step :title="item" status="process" v-for="(item,index) in orderInfo.nodes.split(',')"></el-step>
                  </el-steps>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service-operation" v-if="contractForSeller.length === 0">
      <el-button @click="submitOrderInfo" type="primary">提交</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form style="border:1px #DCDFE6 solid; padding:10px; border-radius:10px; position:relative;"  ref="dynamicValidateForm" label-position="left" label-width="90px">
        <el-checkbox-group v-model="checkStepList">
        <el-form-item
            v-for="(step, index) in orderInfo.node"
            :label="'第' + (index+1)+'个节点'"
            :key="step.id"
        >
          <span style="margin-left: 30px;">orderInfo.node[index]</span>
          <el-checkbox :label="orderInfo.node[index]"></el-checkbox>
<!--          <el-button  type="text"  icon="el-icon-delete" circle title="删除"  @click.prevent="removeStep(index)" style="color:red"/>-->
        </el-form-item>
        </el-checkbox-group>
<!--        <span style="position: absolute;right:20px;bottom:0;font-size:30px;cursor: pointer;"  @click="addNode()">+</span>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editNode()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['orderid', 'type'],
  name: "WaitingCommunication",
  data() {
    return {
      fileList: [],
      contractForSeller: [],
      orderInfo: {},
      serviceSnapshot: [{
        sellerId: '1407977331605364738',
        serviceSnapshot: 'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/9f36309266a1497e_机器人技术专利信息检索服务快照.jpg'
      }, {
        sellerId: '1415480849284993026',
        serviceSnapshot: 'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/74db3aa123c64740_论文检索服务创新.jpg'
      }, {
        sellerId: '1416015773075247106',
        serviceSnapshot: 'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/d0bb79489be0424a_智能研发服务快照.jpg'
      }, {
        sellerId: '1415200899793424385',
        serviceSnapshot: 'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/a82bbb76cc5e41e4_专利申请服务快照.jpg'
      }, {
        sellerId: '1416279268605898753',
        serviceSnapshot: 'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/8861c79fa8ba490c_第三方快照服务.jpg'
      }, {
        sellerId: '1416015315627675649',
        serviceSnapshot: 'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/6ec2e353d6d14904_性能检测服务快照.jpg'
      }],
      category:[],
      options: [],
      centerDialogVisible: false,
      stepValueValid:true,
      checkStepList:[]
    }
  },
  watch:{
    category:{
      handler(newValue,oldValue){
        console.log(newValue)
      }
    }
  },
  methods: {
    //修改进程节点
    editNode(){
      // this.$message({
      //   type:'success',
      //   message:"保存成功，请及时提交！"
      // })
      this.centerDialogVisible = false
    },
    async getCategory(){
      let categoryResult = await this.$axios.categoryControllerList.getCategory({})
      this.options = categoryResult.data.firstCategoryList
      this.options= JSON.parse(JSON.stringify(this.options).replace(/id/g,"value").replace(/name/g,"label"))
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    changeUpload(file, fileList) {
      if (file.status === "ready") {
        this.fileList = fileList
      }
    },
    async handleSuccess(response, file, fileList) {
      if (this.type === '0' && response.code === 20000) {
        let result = await this.$axios.orderControllerList.nextForUpload({
          contractUrl: response.data.url + ',',
          orderId: this.orderid,
          nodes:this.checkStepList.toString()
        })
        if (result.code === 20000) {
          setTimeout(async () => {
            this.$message({
              message: '合同快照和服务流程上传成功！',
              center: true,
              type: 'success'
            })
            let orderResult = await this.getOrderInfo()
            let { status } =orderResult.data.orderInfo
            if(status >= 2){
              await this.$router.push(`/seller/orderdetail/inprogress/${this.orderid}/${this.type}`)
            }else {
              this.$message({
                message: '等待买家上传合同',
                center: true,
                type: 'warning'
              })
            }
          }, 1000)
        }
      }
      if (this.type === '1' && response.code === 20000) {
        let result = await this.$axios.orderControllerList.setSubOrderUploadContract({
          contractUrl: response.data.url + ',',
          orderId: this.orderid,
          nodes:this.checkStepList.toString()
        })
        if (result.code === 20000) {
          setTimeout(async () => {
            this.$message({
              message: '合同快照和服务流程上传成功',
              center: true,
              type: 'success'
            })
            await this.$router.push(`/pc/sellerorderdetail/inprogress/${this.orderid}/${this.type}`)
          }, 1000)
        }
      }
    },
    async submitOrderInfo() {
      if (this.fileList.length !== 0) {
        await this.$refs.upload.submit();
      } else {
        this.$message({
          message: '请上传相应服务的合同或者当前服务流程有空节点',
          center: true,
          type: 'error'
        })
      }
    },
    async getOrderInfo() {
      if (this.type === '0') {
        let result = await this.$axios.orderControllerList.getOrderInfo({
          orderId: this.orderid
        })
        if (result.code === 20000) {
          this.orderInfo = result.data.orderInfo
          this.orderInfo.serviceSnapshot = this.serviceSnapshot.filter((item) => item.sellerId === this.orderInfo.sellerId)
          if (result.data.orderInfo.contractForSeller !== null) {
            result.data.orderInfo.contractForSeller.split(',').slice(0,-1).map((item) => {
              this.contractForSeller.push({
                fileName: item.split('/').slice(-1)[0].split('_')[1],
                fileUrl: item
              })
            })
          }
        }
      } else if (this.type === '1') {
        let result = await this.$axios.orderControllerList.getSubOrderInfo({
          subOrderId: this.orderid
        })
        if (result.code === 20000) {
          this.orderInfo = result.data.orderInfo
          this.orderInfo.serviceSnapshot = this.serviceSnapshot.filter((item) => item.sellerId === this.orderInfo.sellerId)
          if (result.data.orderInfo.contractForSeller !== null) {
            result.data.orderInfo.contractForSeller.split(',').slice(0,-1).map((item) => {
              this.contractForSeller.push({
                fileName: item.split('/').slice(-1)[0].split('_')[1],
                fileUrl: item
              })
            })
          }
        }
      }
    },
    pdfShow(fileUrl) {
      window.open('/pdf/web/viewer.html?file=' + fileUrl);
    },
  },
  async mounted() {
    // this.getCategory()
    await this.getOrderInfo()
  }
}
</script>

<style lang="scss" scoped>
.waiting-communication {
  width: 100%;
  //.service-snapshot {
  //  box-sizing: border-box;
  //  width: 100%;
  //  padding: 30px;
  //  box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
  //  border-radius: 4px;
  //  margin-bottom: 20px;
  //  h3 {
  //    font-size: 18px;
  //    margin-bottom: 18px;
  //  }
  //  .service-snapshot-main {
  //    display:flex;
  //    justify-content: space-between;
  //    align-items: center;
  //    flex-wrap: wrap;
  //    .service-snapshot-item {
  //      height: 150px;
  //      margin-right: 30px;
  //      margin-bottom: 30px;
  //      span {
  //        display:inline-block;
  //        width:200px;
  //        margin-right: 20px;
  //      }
  //      img {
  //        width: auto;
  //        height:100%;
  //        vertical-align:top;
  //      }
  //    }
  //  }
  //}
  //.service-contract {
  //  box-sizing: border-box;
  //  width: 100%;
  //  padding: 30px;
  //  box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
  //  border-radius: 4px;
  //  margin-bottom: 20px;
  //  h3 {
  //    font-size: 18px;
  //    margin-bottom: 18px;
  //  }
  //  .service-contract-main {
  //    display:flex;
  //    flex-wrap: wrap;
  //    justify-content:flex-start;
  //    .service-contract-item {
  //      width: 30%;
  //      display:flex;
  //      margin-right: 20px;
  //      margin-bottom: 30px;
  //      .upload-demo {
  //        display:inline-block;
  //        width: 75%;
  //        margin-left: 10px;
  //      }
  //      &:last-child {
  //        margin-right: 0;
  //      }
  //      ul {
  //        li {
  //          a {
  //            cursor: pointer;
  //          }
  //        }
  //      }
  //    }
  //  }
  //}
  //.service-operation {
  //  width: 100%;
  //  text-align: center;
  //  margin-bottom:10px;
  //}
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .service-snapshot-item {
        height: 150px;
        margin-right: 30px;
        margin-bottom: 30px;

        span {
          display: inline-block;
          width: 200px;
          margin-right: 20px;
        }

        img {
          width: auto;
          height: 100%;
          vertical-align: top;
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
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width:100%;
      .service-contract-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-right: 20px;
        margin-bottom: 30px;
        width: 100%;
        .upload-demo {
          margin-top: 10px;
          display: inline-block;
          flex: 1;
        }
        span {
          display: inline-block;
        }
        &:last-child {
          margin-right: 0;
        }
        ul {
          width:100%;
          display: flex;
          justify-content:flex-start;
          align-items: center;
          flex-width: wrap;
          li {
            font-size:16px;
            margin-right: 10px;
            display: flex;
            justify-content:flex-start;
            align-items: center;
            a {
              cursor: pointer;
            }
          }
        }
        .service-process {
          margin: 30px 0;
        }
      }
    }
  }

  .service-operation {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
}
///deep/ .el-input__inner {
//  width: 350px;
//}
/deep/ .el-cascader {
  margin: 20px 0;
}
/deep/ .el-steps {
  width: 100%;
}
</style>
