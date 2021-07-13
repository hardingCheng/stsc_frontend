<template>
  <div class="in-progess">
    <div class="order-in-progress">
      <div class="order-info" v-if="type === '0'">
        <div class="order-info-left">
          <h3>订单信息</h3>
          <ul class="order-info-list">
            <li>订单名称：<span>{{ type0OrderInfo.order.name }}</span></li>
            <li>订单编号：<span>{{ type0OrderInfo.order.orderId }}</span></li>
            <li>服务方：<span>{{ type0OrderInfo.company }}</span></li>
            <li>联系地址：<span>{{ type0OrderInfo.address }}</span></li>
          </ul>
        </div>
        <div class="order-info-right">
          <h3>流程进度</h3>
          <div class="order-info-flow">
            <div class="order-info-flow-left">
              <span>{{ type0OrderInfo.order.name }}</span>
              <div>
                <el-button size="small" style="margin-top: 12px;" type="danger">申请异常</el-button>
                <el-button size="small" style="margin-top: 12px;" @click="next" type="primary" :disabled="completeCon"
                           v-if="!completeCon">下一步
                </el-button>
                <el-button size="small" style="margin-top: 12px;" type="primary" :disabled="completeCon" v-else>已完成
                </el-button>
              </div>
            </div>
            <div class="order-info-flow-right">
              <el-steps :active="active" finish-status="success" align-center>
                <el-step :title="item" v-for="(item,index) in type0OrderInfo.nodes" :key="index" @mouseenter.native="mouseenter1(index)">
                  <template v-slot:description v-if="index+1 <= type0OrderInfo.order.sellerStep+1" >
                    <el-popover
                        placement="right"
                        width="300"
                        trigger="hover"
                        v-if="index <= type0OrderInfo.order.sellerStep && showConfirm && index === showConfirmIndex"
                    >
                      <div class="step-info-confirm">
                        <ul>
                          <li ><b>服务商此节点完成信息：</b></li>
                          <li style="margin-bottom: 10px;">{{ type0OrderInfo.nodeInfoList[index].curStepInfo}}</li>
                          <li><b>节点附加文件：</b></li>
                          <li><el-button type="text" @click="showFile(type0OrderInfo.nodeInfoList[index].curStepFileUrl)">{{type0OrderInfo.nodeInfoList[index].curStepFileUrl ? type0OrderInfo.nodeInfoList[index].curStepFileUrl.split('/').slice(-1)[0].split('_')[1] : '暂无附加文件'}}</el-button></li>
                        </ul>
                      </div>
                      <el-button type="text" slot="reference">节点信息</el-button>
                    </el-popover>
                  </template>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
      </div>
      <div class="order-info" v-if="type === '1'">
        <div class="order-info-left">
          <h3>订单信息</h3>
          <ul class="order-info-list">
            <li>订单名称：<span>{{ orderInfo.subOrderName }}</span></li>
            <li>订单编号：<span>{{ orderInfo.subOrderNo }}</span></li>
            <li>需求方：<span>{{ orderInfo.buyerName }}</span></li>
            <li>联系方式：<span>{{ orderInfo.telephone }}</span></li>
          </ul>
        </div>
        <div class="order-info-right">
          <h3>流程进度</h3>
          <div class="order-info-flow">
            <div class="order-info-flow-left">
              <span>{{ orderInfo.subOrderName }}</span>
              <div>
                <el-button size="small" style="margin-top: 12px;" type="danger">申请异常</el-button>
                <el-button size="small" style="margin-top: 12px;" @click="next" type="primary" :disabled="completeCon"
                           v-if="!completeCon">下一步
                </el-button>
                <el-button size="small" style="margin-top: 12px;" type="primary" :disabled="completeCon" v-else>已完成
                </el-button>
              </div>
            </div>
            <div class="order-info-flow-right">
              <el-steps :active="active" finish-status="success" align-center>
                <el-step :title="item" v-for="(item,index) in orderInfo.nodes" :key="index" @mouseenter.native="mouseenter1(index)">
                  <template v-slot:description v-if="index+1 <= orderInfo.sellerStep+1" >
                    <el-popover
                        placement="right"
                        width="300"
                        trigger="hover"
                        v-if="index <= orderInfo.sellerStep && showConfirm && index === showConfirmIndex"
                    >
                      <div class="step-info-confirm">
                        <ul>
                          <li ><b>节点完成信息：</b></li>
                          <li style="margin-bottom: 10px;">{{ orderInfo.nodeInfoList[index].curStepInfo}}</li>
                          <li><b>节点附加文件：</b></li>
                          <li><el-button type="text" @click="showFile(orderInfo.nodeInfoList[index].curStepFileUrl)">{{orderInfo.nodeInfoList[index].curStepFileUrl ? orderInfo.nodeInfoList[index].curStepFileUrl.split('/').slice(-1)[0].split('_')[1] : '暂无附加文件'}}</el-button></li>
                        </ul>
                      </div>
                      <el-button type="text" slot="reference">节点信息</el-button>
                    </el-popover>
                  </template>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="step-dialog">
      <el-dialog title="当前流程信息" :visible.sync="dialogFormVisible" @close="stepDialog('',0)">
        <el-form :model="stepForm" :rules="rules" ref="stepForm">
          <el-form-item label="填写确认信息：" prop="curStepInfo">
            <el-input type="textarea" :rows="5" v-model="stepForm.curStepInfo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否上传相关文件：">
            <el-radio-group v-model="stepForm.hasFile">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="相关文件：" v-if="stepForm.hasFile === 1">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="/ph/stcsp/fileoss/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-change="handleChange"
                :on-success="handleSuccess"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div class="el-form-item__error">{{errors.uploadError}}</div>
              <div slot="tip" class="el-upload__tip">只能上传jpg/image/pdf文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="stepDialog('stepForm',0)">取 消</el-button>
          <el-button type="primary" @click="stepDialog('stepForm',1)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import OrderSteps from "../../../../components/OrderSteps";

export default {
  props: ['orderid', 'type'],
  name: "InProgress",
  data() {
    return {
      active: 0,
      type0OrderInfo: {
        address: '',
        company: '',
        order: {
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
      orderInfo: {},
      completeCon: false,
      dialogFormVisible: false,
      stepForm: {
        curStepInfo: '',
        hasFile:1,
        curStepFileUrl:''
      },
      fileList: [],
      rules: {
        curStepInfo: [
          {required: true, message: '请输入相关确认信息', trigger: 'blur'},
        ],
      },
      errors:{
        uploadError:''
      },
      showConfirm:false,
      showConfirmIndex:-1
    }
  },
  components: {
    OrderSteps,
  },
  methods: {
    mouseenter1(index){
      this.showConfirm = true
      this.showConfirmIndex = index
    },
    mouseleave1(index){
      this.showConfirm = false
      this.showConfirmIndex = index
    },
    async next() {
      this.dialogFormVisible = true
    },
    async type0Submit() {
      let result = await this.$axios.orderControllerList.setNextSmallOrderStepForSeller({
        orderId: this.orderid,
        step: this.active,
        curStepFileUrl: this.stepForm.curStepFileUrl,
        curStepInfo: this.stepForm.curStepInfo,
        hasFile: this.stepForm.hasFile,
      })
      if (result.code === 20000) {
        this.dialogFormVisible = false
        let result = await this.$axios.orderControllerList.stepDoing({
          id: this.orderid
        })
        this.type0OrderInfo = result.data
        this.active = (this.type0OrderInfo.order.sellerStep + 1)
        if (this.type0OrderInfo.order.sellerStep + 1 === this.type0OrderInfo.nodes.length) {
          this.$message({
            type: 'success',
            message: '此订单已经完成'
          })
          await this.$router.push(`/pc/sellerorderdetail/serviceacceptance/${this.orderid}/${this.type}`);
          this.completeCon = true
        } else {
          this.completeCon = false
        }
      }
    },
    async type1Submit() {
      let result = await this.$axios.orderControllerList.setNextStepForSeller({
        orderId: this.orderid,
        step: this.active,
        curStepFileUrl: this.stepForm.curStepFileUrl,
        curStepInfo: this.stepForm.curStepInfo,
        hasFile: this.stepForm.hasFile
      })
      if (result.code === 20000) {
        this.dialogFormVisible = false
        let result = await this.$axios.orderControllerList.getSubOrderSellerInfo({
          subOrderId: this.orderid
        })
        this.orderInfo = result.data
        this.active = (this.orderInfo.sellerStep + 1)
        if (this.orderInfo.sellerStep + 1 === this.orderInfo.nodes.length) {
          this.$message({
            type: 'success',
            message: '此订单已经完成'
          })
          await this.$router.push(`/pc/sellerorderdetail/serviceacceptance/${this.orderid}/${this.type}`);
          this.completeCon = true
        } else {
          this.completeCon = false
        }
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      console.log(fileList)
    },
    handleSuccess(response, file, fileList){
      console.log(response)
      if (response.code === 20000){
        this.stepForm.curStepFileUrl = response.data.url
        if(this.type === '0'){
          this.type0Submit()
        }else {
          this.type1Submit()
        }
      }
    },
    stepDialog(formName, op) {
      if (op === 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.type === '0') {
              if (this.stepForm.hasFile) {
                if(this.fileList.length === 0){
                  this.errors.uploadError = "请上传相关文件！不上传，请选择否！"
                }else {
                  this.$refs.upload.submit()
                }
              }else {
                this.type0Submit()
              }
            } else {
              if (this.stepForm.hasFile) {
                if(this.fileList.length === 0){
                  this.errors.uploadError = "请上传相关文件！不上传，请选择否！"
                }else {
                  this.$refs.upload.submit()
                }
              }else {
                this.type1Submit()
              }
            }
          } else {
            if (this.stepForm.hasFile) {
              if(this.fileList.length === 0){
                this.errors.uploadError = "请上传相关文件！不上传，请选择否！"
              }else {
                this.$refs.upload.submit()
              }
            }
            return false;
          }
        });
      } else {
        this.dialogFormVisible = false
        this.stepForm.curStepInfo = ""
        this.stepForm.hasFile = 1
        this.fileList = []
      }
    }
  },
  watch: {
    fileList:{
      deep:true,
      handler(newValue,oldValue){
        console.log(newValue)
        if (newValue.length >0){
          this.errors.uploadError = ""
        }
      }
    }
  },
  async mounted() {
    if (this.orderid && this.type === '0') {
      let result = await this.$axios.orderControllerList.stepDoing({
        id: this.orderid
      })
      this.orderInfo = result.data
      this.type0OrderInfo = result.data
      this.active = (this.type0OrderInfo.order.sellerStep + 1)
      if (this.type0OrderInfo.order.sellerStep + 1 === this.type0OrderInfo.nodes.length) {
        this.completeCon = true
      } else {
        this.completeCon = false
      }
    }
    if (this.orderid && this.type === '1') {
      let result = await this.$axios.orderControllerList.getSubOrderSellerInfo({
        subOrderId: this.orderid
      })
      this.orderInfo = result.data
      this.active = (this.orderInfo.sellerStep + 1)
      if (this.orderInfo.sellerStep + 1 === this.orderInfo.nodes.length) {
        this.completeCon = true
      } else {
        this.completeCon = false
      }
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;

    .order-info-left {
      width: 30%;
      height: 100%;
      box-sizing: border-box;
      padding: 30px 20px 20px 20px;
      border-right: 1px solid #E7E7E7;

      h3 {
        font-size: 18px;
        margin-bottom: 18px;
      }

      .order-info-list {
        li {
          margin-bottom: 30px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
        }
      }

      h6 {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
      }

      .suborder-info-list {
        li {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;

          & > span:first-child {
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
      height: 100%;
      padding: 30px 20px 20px 20px;
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
    padding: 20px;
    box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
    border-radius: 4px;
    margin-bottom: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .order-info-flow-left {
      span {
        display: inline-block;
        width: 160px;
      }
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

/deep/ .el-dialog {
  width: 25%;
}

/deep/ .el-dialog__body {
  padding: 0 20px;
}

/deep/ .el-steps {
  height:80px;
}
</style>
