<template>
  <div class="order-in-progress">
    <div class="order-in-progress-immediately" v-if="type === '0'">
      <div class="order-info">
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
              子服务1：
              <div>
                <el-button size="small" style="margin-top: 12px;" :disabled="completeCon" v-if="completeCon"
                           type="primary">已完成
                </el-button>
              </div>
            </div>
            <div class="order-info-flow-right">
              <el-steps :active="type0OrderInfo.order.sellerStep+1" finish-status="success" v-if="type0OrderInfo"
                        align-center>
                <el-step
                    v-for="(item,index) in type0OrderInfo.nodes ? type0OrderInfo.nodes :[]"
                    :title="item" :key="index"
                    @mouseenter.native="mouseenter1(index)"
                    :status="type0OrderInfo.order.exceNode !== null ?  (index  < type0OrderInfo.exceNode ? 'success' : 'error' ) : (index+1 <= type0OrderInfo.order.sellerStep+1 ? 'success' : 'wait' )"
                >
                  <template v-slot:description v-if="index+1 <= type0OrderInfo.order.sellerStep+1">
                    <el-popover
                        placement="bottom"
                        width="300"
                        trigger="hover"
                        v-if="type0OrderInfo.order.exceNode !== null? (index  <= type0OrderInfo.order.sellerStep+1 && index>type0OrderInfo.order.buyerStep && index <type0OrderInfo.exceNode): (index+1 <= type0OrderInfo.order.sellerStep+1 && index>type0OrderInfo.order.buyerStep)"
                    >
                      <div class="step-info-confirm">
                        <ul>
                          <li><b>服务商此节点完成信息：</b></li>
                          <li style="margin-bottom: 10px;">{{ type0OrderInfo.nodeInfoList[index].curStepInfo }}</li>
                          <li><b>节点附加文件：</b></li>
                          <li>
                            <el-button type="text" @click="showFile(type0OrderInfo.nodeInfoList[index].curStepFileUrl)">
                              {{ type0OrderInfo.nodeInfoList[index].curStepFileUrl ? type0OrderInfo.nodeInfoList[index].curStepFileUrl.split('/').slice(-1)[0].split('_')[1] : '暂无附加文件' }}
                            </el-button>
                          </li>
                          <li style="text-align: right;"
                              v-if="index+1 <= type0OrderInfo.order.sellerStep+1 && index>type0OrderInfo.order.buyerStep">
                            <el-button size="small" type="danger" @click="stepAbnormal(index,type0OrderInfo.order.id)">申请异常</el-button>
                            <el-button size="small" type="primary" @click="stepSubmit(index,type0OrderInfo.order.id)">
                              确认
                            </el-button>
                          </li>
                        </ul>
                      </div>
                      <el-button type="text" slot="reference">步骤节点信息</el-button>
                    </el-popover>
                    <el-popover
                        placement="right"
                        width="300"
                        trigger="hover"
                        v-if="type0OrderInfo.exceNode !== null ? (index <= type0OrderInfo.exceNode && showConfirm && index === showConfirmIndex  ):(index <= type0OrderInfo.order.buyerStep && showConfirm && index === showConfirmIndex)"
                    >
                      <div class="step-info-confirm">
                        <ul>
                          <li><b>服务商此节点完成信息：</b></li>
                          <li style="margin-bottom: 10px;">{{ type0OrderInfo.nodeInfoList[index].curStepInfo }}</li>
                          <li><b>节点附加文件：</b></li>
                          <li>
                            <el-button type="text" @click="showFile(type0OrderInfo.nodeInfoList[index].curStepFileUrl)">
                              {{ type0OrderInfo.nodeInfoList[index].curStepFileUrl ? type0OrderInfo.nodeInfoList[index].curStepFileUrl.split('/').slice(-1)[0].split('_')[1] : '暂无附加文件' }}
                            </el-button>
                          </li>
                        </ul>
                      </div>
                      <el-button type="text" slot="reference">节点信息</el-button>
                    </el-popover>
                    <el-popover
                        placement="bottom"
                        width="300"
                        trigger="hover"
                        v-if="type0OrderInfo.order.exceNode !== null && index === type0OrderInfo.order.exceNode"
                    >
                      <div class="step-info-confirm">
                        <ul>
                          <li><b>异常信息：</b></li>
                          <li style="margin-bottom: 10px;color:red;">{{  type0OrderInfo.order.exceNodeMsg }}</li>
                          <li><b>节点附加文件：</b></li>
                          <li style="text-align: right;">
                            <el-button type="primary" @click="cancelExce(index,type0OrderInfo.order.id)">异常处理</el-button>
                          </li>
                        </ul>
                      </div>
                      <el-button type="text" slot="reference" style="color:red;">异常信息</el-button>
                    </el-popover>
                  </template>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-in-progress-split" v-else>
      <div class="order-info">
        <div class="order-info-left">
          <h3>订单信息</h3>
          <ul class="order-info-list">
            <li>需求名称：<span>{{ type1OrderInfo.requirementName }}</span></li>
            <li>订单编号：<span>{{ type1OrderInfo.orderId }}</span></li>
            <li>需求方：<span>{{ type1OrderInfo.buyerName }}</span></li>
            <li>联系地址：<span>{{ type1OrderInfo.address }}</span></li>
          </ul>
          <h6>子订单数量：<span>{{ subOrderInfoVoListLength }}</span></h6>
          <ul class="suborder-info-list">
            <li v-for="(item,index) in  type1OrderInfo.subOrderInfoVoList2" :key="index">
              服务{{ index + 1 }}：<span>{{ item.subOrderName }}</span>服务商{{ index + 1 }}：<span>{{
                item.sellerName
              }}</span>
            </li>
          </ul>
        </div>
        <div class="order-info-right">
          <h3>服务进度</h3>
          <!--          <b-pai :arrangeList="arrangeList" @getNodeInfo="getNodeInfo"></b-pai>-->
          <b-pai-flow :arrangeList="arrangeList" @getNodeInfo="getNodeInfo"></b-pai-flow>
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
              <span type="success">{{ scope.row.price | modPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="status"
              label="服务状态"
              align="center"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status < 5" type="success">{{ scope.row.status | modStatus }}</el-tag>
              <el-tag v-else type="danger">{{ scope.row.status | modStatus }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="order-info-flow">
        <div class="order-info-flow-left" v-if="subOrderDetailsInfo[0]">
          {{ subOrderDetailsInfo[0].orderName ? subOrderDetailsInfo[0].orderName : '' }}
          <div>
            <el-button size="small" style="margin-top: 12px;" :disabled="completeCon" v-if="completeCon" type="primary">
              已完成
            </el-button>
          </div>
        </div>
        <div class="order-info-flow-right">
          <el-steps :active="subOrderDetailsInfo[0].sellerStep+1"  v-if="subOrderDetailsInfo[0]" align-center>
            <el-step
                v-for="(item,index) in subOrderDetailsInfo[0].nodes ? subOrderDetailsInfo[0].nodes :[]"
                :title="item" :key="index"
                @mouseenter.native="mouseenter1(index)"
                :status="subOrderDetailsInfo[0].exceNode !== null ?  (index < subOrderDetailsInfo[0].exceNode ? 'success' : 'error' ) : (index+1 <= subOrderDetailsInfo[0].sellerStep+1 ? 'success' : 'wait' )"
            >
              <template v-slot:description v-if="index+1 <= subOrderDetailsInfo[0].sellerStep+1">
                <el-popover
                    placement="bottom"
                    width="300"
                    trigger="hover"
                    v-if=" subOrderDetailsInfo[0].exceNode !== null ? (index+1 <= subOrderDetailsInfo[0].sellerStep+1 && index>subOrderDetailsInfo[0].buyerStep && index <subOrderDetailsInfo[0].exceNode)  :(index+1 <= subOrderDetailsInfo[0].sellerStep+1 && index>subOrderDetailsInfo[0].buyerStep)"
                >
                  <div class="step-info-confirm">
                    <ul>
                      <li><b>服务商此节点完成信息：</b></li>
                      <li style="margin-bottom: 10px;">{{ subOrderDetailsInfo[0].nodeInfoList[index].curStepInfo }}</li>
                      <li><b>节点附加文件：</b></li>
                      <li>
                        <el-button type="text"
                                   @click="showFile(subOrderDetailsInfo[0].nodeInfoList[index].curStepFileUrl)">
                          {{ subOrderDetailsInfo[0].nodeInfoList[index].curStepFileUrl ? subOrderDetailsInfo[0].nodeInfoList[index].curStepFileUrl.split('/').slice(-1)[0].split('_')[1] : '暂无附加文件' }}
                        </el-button>
                      </li>
                      <li style="text-align: right;"
                          v-if="index+1 <= subOrderDetailsInfo[0].sellerStep+1 && index>subOrderDetailsInfo[0].buyerStep">
                        <el-button size="small" type="danger" @click="stepAbnormal(index,subOrderDetailsInfo[0].id)">申请异常</el-button>
                        <el-button size="small" type="primary" @click="stepSubmit(index,subOrderDetailsInfo[0].id)">确认</el-button>
                      </li>
                    </ul>
                  </div>
                  <el-button type="text" slot="reference">步骤节点信息</el-button>
                </el-popover>
                <el-popover
                    placement="bottom"
                    width="300"
                    trigger="hover"
                    v-if="subOrderDetailsInfo[0].exceNode !== null ? (index < subOrderDetailsInfo[0].exceNode && index <= subOrderDetailsInfo[0].buyerStep && showConfirm && index === showConfirmIndex) :(index <= subOrderDetailsInfo[0].buyerStep && showConfirm && index === showConfirmIndex)"
                >
                  <div class="step-info-confirm">
                    <ul>
                      <li><b>服务商此节点完成信息：</b></li>
                      <li style="margin-bottom: 10px;">{{ subOrderDetailsInfo[0].nodeInfoList[index].curStepInfo }}</li>
                      <li><b>节点附加文件：</b></li>
                      <li>
                        <el-button type="text"
                                   @click="showFile(subOrderDetailsInfo[0].nodeInfoList[index].curStepFileUrl)">
                          {{ subOrderDetailsInfo[0].nodeInfoList[index].curStepFileUrl ? subOrderDetailsInfo[0].nodeInfoList[index].curStepFileUrl.split('/').slice(-1)[0].split('_')[1] : '暂无附加文件' }}
                        </el-button>
                      </li>
                    </ul>
                  </div>
                  <el-button type="text" slot="reference">节点信息</el-button>
                </el-popover>
                <el-popover
                    placement="bottom"
                    width="300"
                    trigger="hover"
                    v-if="subOrderDetailsInfo[0].exceNode !== null && index === subOrderDetailsInfo[0].exceNode"
                >
                  <div class="step-info-confirm">
                    <ul>
                      <li><b>此节点异常信息：</b></li>
                      <li style="margin-bottom: 10px; color: red;">{{ subOrderDetailsInfo[0].nodeInfoList[index].curStepInfo }}</li>
                      <li style="text-align: right;">
                        <el-button type="primary" @click="cancelExce(index,subOrderDetailsInfo[0].id)">异常处理</el-button>
                      </li>
                    </ul>
                  </div>
                  <el-button style="color:red;" type="text" slot="reference">异常信息</el-button>
                </el-popover>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <div class="step-dialog">
      <el-dialog title="当前异常流程信息" :visible.sync="dialogFormVisible" @close="stepDialog('',0)">
        <el-form :model="abnormalStepInfo" :rules="rules" ref="stepAbnormalForm">
          <el-form-item label="填写确认信息：" prop="messages">
            <el-input type="textarea" :rows="5" v-model="abnormalStepInfo.messages" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="stepDialog('stepAbnormalForm',0)">取 消</el-button>
          <el-button type="primary" @click="stepDialog('stepAbnormalForm',1)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BPaiFlow from '../../../../components/showGraph/ShowGraph'

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
      type1OrderInfo: {},
      arrangeList: {},
      subOrderInfoVoListLength: 0,
      subOrderDetailsInfo: [],
      currentSubRequirementId: '',
      completeCon: false,
      showConfirm: false,
      showConfirmIndex: -1,
      visible: true,
      errorStepIndex:null,
      rules: {
        messages: [
          {required: true, message: '请输入相关异常信息', trigger: 'blur'},
        ],
      },
      dialogFormVisible: false,
      abnormalStepInfo:{
        index:1,
        orderId:'',
        messages:''
      }
    }
  },
  components: {
    BPaiFlow
  },
  methods: {
    async cancelExce(index,orderId){
      const cancelExceResult = await this.$axios.orderControllerList.buyerCancelExce({
        orderId:orderId,
        orderType:this.type
      })
      if (cancelExceResult.code === 20000) {
        this.$message({
          type: 'success',
          message: "异常处理完毕！",
          duration: 1000,
          onClose: async () => {
            if (this.orderid && this.type === '0') {
              let result = await this.$axios.orderControllerList.stepDoing({
                id: this.orderid
              })
              this.type0OrderInfo = result.data
              this.completeCon = this.type0OrderInfo.order.sellerStep + 1 === this.type0OrderInfo.nodes.length;
            }
            if (this.orderid && this.type === '1') {
              let result1 = await this.$axios.orderControllerList.getSplitDetailInfo({
                id: this.orderid
              })
              this.type1OrderInfo = result1.data.subOrderInfo
              this.subOrderInfoVoListLength = result1.data.subOrderInfo.subOrderInfoVoList.length
              let arrangeResult = await this.$axios.layoutControllerList.getLayoutResult({
                requirementId: this.type1OrderInfo.requirementId
              })
              this.arrangeList = JSON.parse(arrangeResult.data.layout)
              await this.getNodeInfo(this.arrangeList.cells[0].id)
            }
          }
        })
      }else {
        this.$message({
          type: 'danger',
          message: "异常处理失败！",
          duration: 1000
        })
      }
    },
    stepDialog(formName, op) {
      if (op === 1) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
              this.dialogFormVisible = false
              const stepAbnormalResult = await this.$axios.orderControllerList.buyerHasExe({
                  message:this.abnormalStepInfo.messages,
                  orderId:this.abnormalStepInfo.orderId,
                  orderType:this.type,
                  step:this.abnormalStepInfo.index
              })
            if (stepAbnormalResult.code === 20000){
              this.$message({
                type:'success',
                message:'申请异常成功！'
              })
            }else {
              this.$message({
                type:'error',
                message:'申请异常失败！'
              })
            }
          }
        });
      } else {
        this.dialogFormVisible = false
        this.abnormalStepInfo.index = 0
        this.abnormalStepInfo.orderId = ''
        this.abnormalStepInfo.messages = ''
      }
    },
    mouseenter1(index) {
      this.showConfirm = true
      this.showConfirmIndex = index
    },
    mouseleave1(index) {
      this.showConfirm = false
      this.showConfirmIndex = index
    },
    showFile(fileUrl) {
      window.open('/pdf/web/viewer.html?file=' + fileUrl);
    },
    next() {
      // this.active++
    },
    async getNodeInfo(nodeId) {
      this.subOrderDetailsInfo.length = 0
      console.log(nodeId)
      let result = await this.$axios.orderControllerList.getSubOrderDetailsInfo({
        nid: nodeId
      })
      this.currentSubRequirementId = nodeId
      this.subOrderDetailsInfo.push(result.data)
    },
    async stepAbnormal(index,orderId) {
      this.abnormalStepInfo.index = index
      this.abnormalStepInfo.orderId = orderId
      this.dialogFormVisible = true
      if (this.orderid && this.type === '0') {
        let result = await this.$axios.orderControllerList.stepDoing({
          id: this.orderid
        })
        this.type0OrderInfo = result.data
        this.completeCon = this.type0OrderInfo.order.sellerStep + 1 === this.type0OrderInfo.nodes.length;
      }
      if (this.orderid && this.type === '1') {
        let result1 = await this.$axios.orderControllerList.getSplitDetailInfo({
          id: this.orderid
        })
        this.type1OrderInfo = result1.data.subOrderInfo
        this.subOrderInfoVoListLength = result1.data.subOrderInfo.subOrderInfoVoList.length
        let arrangeResult = await this.$axios.layoutControllerList.getLayoutResult({
          requirementId: this.type1OrderInfo.requirementId
        })
        this.arrangeList = JSON.parse(arrangeResult.data.layout)
        await this.getNodeInfo(this.arrangeList.cells[0].id)
      }
    },
    async stepSubmit(index, orderId) {
      if (this.type === '0') {
        let result = await this.$axios.orderControllerList.setNextSmallOrderStepForBuyer({
          orderId: orderId,
          step: index
        })
        if (result.code === 20000) {
          let result = await this.$axios.orderControllerList.stepDoing({
            id: this.orderid
          })
          this.type0OrderInfo = result.data
          if (this.type0OrderInfo.order.buyerStep + 1 === this.type0OrderInfo.nodes.length && this.type0OrderInfo.order.status === 3) {
            this.$message({
              type: 'success',
              message: '此订单已经完成'
            })
            await this.$router.push(`/pc/buyerorderdetail/serviceacceptance/${this.orderid}/${this.type}`);
            this.completeCon = true
          } else {
            this.completeCon = false
          }
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      } else {
        let result = await this.$axios.orderControllerList.setNextStepForBuyer({
          orderId: orderId,
          step: index
        })
        if (result.code === 20000) {
          this.subOrderDetailsInfo.length = 0
          let result = await this.$axios.orderControllerList.getSubOrderDetailsInfo({
            nid: this.currentSubRequirementId
          })
          this.subOrderDetailsInfo.push(result.data)
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      }
    }
  },
  async mounted() {
    // const timer = setInterval(async () => {
    //   // 某些定时器操作
    //   this.subOrderDetailsInfo.length = 0
    //   let result = await this.$axios.orderControllerList.getSubOrderDetailsInfo({
    //     subRequireId:this.currentSubRequirementId
    //   })
    //   this.subOrderDetailsInfo.push(result.data)
    // }, 1500);
    // // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(timer);
    // })
    console.log(this.type)
    if (this.orderid && this.type === '0') {
      let result = await this.$axios.orderControllerList.stepDoing({
        id: this.orderid
      })
      this.type0OrderInfo = result.data
      this.completeCon = this.type0OrderInfo.order.sellerStep + 1 === this.type0OrderInfo.nodes.length;
    }
    if (this.orderid && this.type === '1') {
      let result1 = await this.$axios.orderControllerList.getSplitDetailInfo({
        id: this.orderid
      })
      this.type1OrderInfo = result1.data.subOrderInfo
      this.subOrderInfoVoListLength = result1.data.subOrderInfo.subOrderInfoVoList.length
      let arrangeResult = await this.$axios.layoutControllerList.getLayoutResult({
        requirementId: this.type1OrderInfo.requirementId
      })
      this.arrangeList = JSON.parse(arrangeResult.data.layout)
      await this.getNodeInfo(this.arrangeList.cells[0].id)
    }
  },
  filters: {
    modStatus(value) {
      switch (value) {
        case 1:
          return '待沟通'
        case 2:
          return '进行中'
        case 3:
          return '已验收'
        case 4:
          return '已评价'
        case 5:
          return '已完成'
        case 6:
          return '订单失败'
        case 7:
          return '订单撤销'
        case 8:
          return '订单异常'
      }
    },
    modPrice(value) {
      if (value === '保密' || value === '暂无价格') {
        return value
      } else {
        return `￥${value}万`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-in-progress {
  width: 100%;

  .order-in-progress-split {
    .order-info {
      box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
      border-radius: 4px;
      height: 375px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 40px;

      .order-info-left {
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
            margin-bottom: 8px;
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
          height: 130px;
          overflow: auto;

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
        width: 15%;
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
            width: 15%;
          }

          .order-info-flow-right {
            flex: 1;
            margin-left: 50px;

            .step-info-confirm {
              ul {
                li {
                  &:nth-of-type(odd) {
                    margin-bottom: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

::v-deep .el-steps {
  height: 80px;
}
</style>
