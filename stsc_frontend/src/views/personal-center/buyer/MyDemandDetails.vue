<template>
  <div class="my_demand_details container">
    <div class="my_demand-details container ">
      <div class="my_demand-details-img"><img :src=this.info_all.image width="400px" height="400px"></div>
      <div class="my_demand-details-inner-text">
        <div class="my_demand-title">{{ this.info_all.name }}</div>
        <div class="mechanism-classification">
          <div class="text-title-title">需求机构：<span class="text-service-text">{{ this.info_all.company }}</span></div>
          <!--          <div class="text-title-title ">服务类别：<span class="text-service-text">设计服务>工业服务</span></div>-->
        </div>
        <!--        <div class="text-title-title">单位所在地：<span class="text-service-text">{{ info.address }}</span></div>-->
        <div class="text-title-title">创建时间：<span class="text-service-text">{{ this.date }}</span></div>
        <div class="text-title-title">联系人：<span class="text-service-text">{{ this.info_all.contact }}</span></div>
        <div class="text-title-title">手机号：<span class="text-service-text">{{ this.info_all.telephone }}</span></div>

        <div class="address">
          <div class="text-title-title ">联系地址：<span class="text-service-text ">{{ this.info_all.address }}</span></div>
        </div>
        <div class="text-title-title1 "><span>附件：</span><a :href=this.info_all.attachments>{{ filename }}</a>
          <!--        <a :href=this.info_all.attachments>下载</a>-->
        </div>
        <!--        <div class="text-title-title ">电子邮箱：<span class="text-service-text">xxxxx</span></div>-->
      </div>
      <div></div>
    </div>
    <div class="demand_overview container">
      <h4>需求概述</h4>
      <span class="demand_content">{{ this.info_all.content }}</span>
    </div>
    <div class="technological_process" v-if="requireState>3&&arrangeInfo!==null">
      <div class="map">
        <graph :arrangeList="arrangeInfo"></graph>
      </div>
      <div class="button_group1" v-if="lengthInfo&&requireState===4">
        <el-button type="primary" class="button" @click="verify" :disabled="forbidden">确定</el-button>
        <el-button type="primary" class="button" :disabled="reOpen" @click="dialogVisible = true">重新拆分</el-button>
      </div>
      <div class="button_group" v-if="requireState===9" >
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
          <li v-for="i in 1" class="infinite-list-item">已提交订单：</li>
          <li v-for="item in orderInfo" class="infinite-list-item">{{item.subReqName}}：
            <router-link :to="'/comanydetail/'+item.sellerId+'/'+requireState">{{item.sellerName}}</router-link></li>
        </ul>
      </div>
    </div>
<!--    重新拆分对话框-->
    <el-dialog
        title="请填写重新拆分的原因"
        :visible.sync="dialogVisible"
        width="30%"
        >
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"><span>取 消</span></el-button>
        <el-button type="primary" @click="resoution">确 定</el-button>
      </span>
    </el-dialog>

    <div class="indicators" v-if="requireState===8 && biddingStatus === false">
      <div class="recommend">
        <h3 style="margin-bottom: 20px">推荐服务商</h3>
        <span style="margin-bottom: 50px">推荐策略</span>
        <el-select v-model="value" placeholder="请选择" class="strategy" @change="handleChange">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
          </el-option>
        </el-select>
        <span style="margin-bottom: 50px;margin-left: 20px">是否需要监理服务:</span>
        <el-select v-model="value1" placeholder="请选择" class="strategy">
          <el-option
              v-for="item_select in options1"
              :key="item_select.value"
              :label="item_select.label"
              :value="item_select.value">
          </el-option>
        </el-select>
        <!--推荐服务商-->
        <div class="children_demand"  :style="{height: (5*items.sellerList.length) + 'px'}" v-for="(items,index) in item" v-bind:key="index"  v-if="requireState===8">
          <span class="children_demand_title" >{{ items.subRequireName }}</span>
          <div class="company">
<!--            v-if="index!==keyPlanGrab[index]"-->
            <el-radio-group v-model="company_radio[index]" @change="changeVal(index)"
                            v-for="(itemss,index1) in items.sellerList" v-bind:key="index1">
              <el-radio :label="itemss.serveId" >{{ itemss.sellerName }}</el-radio>
              <img src="../../../assets/images/detaillogo.png" class="detail_logo" @click="companyDetail(itemss.serveId)">
            </el-radio-group>
<!--            <el-radio-group v-model="company_radio[index]" @change="changeVal(index)" v-if="index===keyPlanGrab[index]" disabled-->
<!--                            v-for="(itemss,index1) in items.sellerList" v-bind:key="index1">-->
<!--              <el-radio :label="itemss.serveId" >{{ itemss.sellerName }}</el-radio>-->
<!--              <img src="../../../assets/images/detaillogo.png" class="detail_logo" @click="companyDetail(itemss.serveId)">-->
<!--            </el-radio-group>-->
          </div>
        </div>
      </div>
      <!--抢单-->
      <div class="grab">
        <h3 style="margin-bottom: 20px">抢单商家</h3>
        <div class="grab_name" v-for="(items,index) in grabOrderInfo" v-bind:key="index"  v-if="requireState===8">
          <div class="grab_title">{{items.subRequireName}}</div>
          <div class="grab_content">
            <div class="company ">
<!--              v-if="index!==keyPlan[index]"-->
              <el-radio-group v-model="company_radio[index]"  @change="changeValGrab(index)"
                              v-for="(itemss,index1) in items.sellerList" v-bind:key="index1"  >
                  <el-radio :label="itemss.serveId">{{ itemss.sellerName }}</el-radio>
                <img src="../../../assets/images/detaillogo.png" class="detail_logo" @click="companyDetail(itemss.serveId)">
              </el-radio-group>
<!--              <el-radio-group v-model="grab_radio[index]"    v-if="index===keyPlan[index]" disabled-->
<!--                              v-for="(itemss,index1) in items.sellerList" v-bind:key="index1"  >-->
<!--                <el-radio :label="itemss.serveId">{{ itemss.sellerName }}</el-radio>-->
<!--                <img src="../../../assets/images/detaillogo.png" class="detail_logo" @click="companyDetail(itemss.serveId)">-->
<!--              </el-radio-group>-->
            </div>
          </div>
        </div>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit" class="buttonPosition"><span class="font">提交</span></el-button>
      </div>
    </div>
    <div class="indicators" v-if="biddingStatus">
      <div class="recommend" style="margin-bottom: 40px">
        <h3>本需求正在竞价，请点击 <router-link to="/pc/buyer/mynews" style="color: red">我的消息</router-link> 查看竞价最新进展</h3>
      </div>
    </div>

  </div>
</template>

<script>

import graph from "../../../components/showGraph/ShowGraph";
import axios from "@/api/api";
import Axios from "axios";
import store from "@/store";
export default {
  props: ['id'],
  name: "MyDemandDetails",
  components: {graph},
  data() {
    return {
      reOpen: false,//是否重新拆分
      company_radio: {},
      grab_radio:{},//抢单商家
      activeName: 'first',
      info: {},
      info_all: [],
      item:[],
      item_res: [],//推荐商家
      item_shijian:[],
      item_jiage:[],
      item_pingfen:[],
      grab_item: ["", "", ""],
      hid: 0,//是否隐藏推荐服务商面板
      forbidden: false,//确定按钮是否可用
      date: null,
      arrangeInfo: {},
      lengthInfo: 0,
      requireState: 0,
      biddingStatus: false,
      filename:"",
      orderInfo:{},//存放订单信息
      grabOrderInfo:{},//存放抢单的信息
      keyPlan:[],//存放索引
      keyPlanGrab:[],//存放抢单的索引
      dialogVisible:false,//弹窗显示
      textarea:"",//存储重新拆分的理由
      opt: {
        value:'选项1',
        label:'综合排序'
      },
      options: [{
        value: '选项1',
        label: '综合排序'
      }, {
        value: '选项2',
        label: '价格少'
      }, {
        value: '选项3',
        label: '时间短'
      },
        {
        value: '选项4',
        label: '评分'
      }],
      options1: [{
        value: '选项1',
        label: '是'
      }, {
        value: '选项2',
        label: '否'
      }],
      value: '选项1',
      value1: '是',
    };
  },
  created() {
    //根据需求状态设置确定按钮的可用状态
    this.getRequireState()
    this.getBiddingStatus(this.id)
    this.grabOrder()
  },
  async mounted() {
    await this.getArrangeInfo()
    await this.getBuyer()
    if(this.requireState===9){
      await this.getOrderInfo()
    }
  },
  watch:{

  },
  methods: {
    async handleChange(val)
    {
      console.log(this.value)
      // this.opt.label = val.label;
      // this.opt.value = val.value;
      switch(this.value)
      {
        case '选项1':
          this.item = this.item_res;
          break;
        case '选项3':
          this.item = this.item_shijian;
          break;
        case '选项2':
          this.item = this.item_jiage;
          break;
        case '选项4':
          this.item = this.item_pingfen;
          break;
      }
    },
    //服务商抢单
    async grabOrder(){
      let result = await this.$axios.serveControllerList.grabOrder({
        requirementId:this.id
      })
      this.grabOrderInfo =result.data.res
    },
    //获取订单信息
    async getOrderInfo(){
        let result= await this.$axios.requirementControllerList.getOrderInfo({
          reqId:this.$route.params.id
        })
      this.orderInfo=result.data.res

    },

    load(){
    },
    //获取服务商方法
    async getBuyer() {
      //获取推荐服务商列表
      const detail_result = await this.$axios.serveControllerList.getServeById({
        requirementId: this.id
      })
      //item用于存储推荐服务商
      this.item_res = detail_result.data.res
      this.item_jiage = detail_result.data.jiage
      this.item_shijian = detail_result.data.shijian
      this.item_pingfen = detail_result.data.pingfen
      this.item = this.item_res
      const results = await this.$axios.requirementControllerList.getBigRequireDetailById({
        id: this.id
      })
      console.log(detail_result)
      //info_all存储需求详情
      this.info_all = results.data.requirement
      let regex="[^\\/\\_]+$"
      if(results.data.requirement.attachments==null||results.data.requirement.attachments==""){
        this.filename="无附件"
      }else {
        this.filename =results.data.requirement.attachments.match(regex)[0]
      }
      //moment时间格式化插件
      const moment = require('moment');
      this.date = moment(results.data.requirement.createTime).format(("YYYY-MM-DD"))
    },
    //获取编排的方法
    async getArrangeInfo() {
      let result = await this.$axios.requirementControllerList.getArrangeInfo({
        requirementId: this.$route.params.id
      })
      if (result.code === 20000) {
        this.arrangeInfo = JSON.parse(result.data.layout)
        this.lengthInfo = this.arrangeInfo.cells.length
      }
    },
    //对结果重新拆分
    async resoution() {
      this.dialogVisible = false

      let result = await this.$axios.requirementControllerList.resoution({
        requirementId: this.$route.params.id
      },{
        rejectReason:this.textarea
      })
      if (result.code === 20000) {
        this.$message({
          message: '重新拆分请求已经发送！',
          type: 'success'
        });
        this.reOpen = true
        await this.getRequireState()
      //   // 重新刷新页面，重新渲染数据
      //   // this.$router.go(0)
      }
    },
    downFile() {
    },
    //跳转推荐服务商的详情页的方法
    companyDetail(id) {
      let requireId=this.$route.params.id
     // this.$router.push(`/pc/comanydetail/${id}`)
       let requireState=this.requireState
      this.$router.push(`/comanydetail/${id}/${requireState}`)
    },
    //用户核实拆分
    async verify() {
      //await this.getBuyer()
      let result = await this.$axios.requirementControllerList.confirmResult({
        requirementId: this.$route.params.id
      })
      if (result.code === 20000) {
        this.$message({
          type: 'success',
          message: '已经确认拆分结果，请耐心等待！'
        })
        await this.getBuyer()
        this.forbidden = true//禁用确定按钮
        this.reOpen = true//重新拆分是否隐藏
        this.hid = 1//推荐服务商是否隐藏
        await this.getRequireState()
        // // 重新刷新页面，重新渲染数据
        //   this.$router.go(0)
      }
    },
    //获取需求状态
    async getRequireState() {
      let result = await this.$axios.requirementControllerList.getBigRequireDetailById({
        id: this.$route.params.id
      })
      if (result.code === 20000) {
        this.requireState = result.data.requirement.status
        if (result.data.requirement.status === 8 || result.data.requirement.status === 9) {
          this.hid = 1//推荐服务商是否隐藏
          this.forbidden = true//禁用确定按钮
          this.reOpen = true//重新拆分是否隐藏
          if(this.requireState===9){
            await this.getOrderInfo()
          }
        }
      }
    },
    // 获取需求竞价状态
    async getBiddingStatus(id) {
      this.$axios.BiddingController.queryBiddingStatus(id).then(response => {
        if (response.data.code == 20000) {
          this.biddingStatus = response.data.data.isJingjia
        }
      })
    },
    getVal(val) {
    },
    changeVal(val) {
      this.keyPlan.push(val)
      console.log(this.keyPlan)
    },
    changeValGrab(val){
    this.keyPlanGrab.push(val)
    },
    changeSelect(label) {
      this.radio = label
    },
    downloadClick(row) {
      let entity = {
        id: row.id,
        filename: row.filename,
      }
      this.download(this.info.data, row)
    },

    // 下载文件
    download(data, row) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      // 获取文件名
      // download 属性定义了下载链接的地址而不是跳转路径
      link.setAttribute('download', row.filename)
      document.body.appendChild(link)
      link.click()
    },
    //勾选服务商后点击提交按钮的方法
    async submit() {
      await this.getRequireState()
      const loading = this.$loading.service({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 500);
      let orderList = []
        // console.log('时间短')
        this.item.map((item, index) => {
          if(!this.company_radio[index]){
          }else {
            orderList.push(item.subRequireId + ',' + this.company_radio[index])
          }
        });
      await this.$axios.orderControllerList.saveForSelect(orderList).then(response => {
        this.hid = 0
        this.getRequireState()
        if(response.code===20000){
          if(response.data.JingjiaId) {
            this.$confirm('价格不匹配，是否进入竞价流程?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 开启竞价流程
              this.$axios.BiddingController.startBidding(response.data.JingjiaId).then(response => {
                // console.log(response.data)
                if(response.data.code == 20000) {
                  this.$message({
                    type: 'success',
                    message: '竞价流程已经开启!'
                  })
                  this.biddingStatus = true
                }
              })
            }).catch(() => {
              // 调用取消竞价的接口
              this.$axios.BiddingController.deleteBidding(this.$route.params.id).then(response => {
                if (response.data.success) {
                  this.$message({
                    type: 'info',
                    message: '请重新选择服务商！'
                  })
                }
              })
            })
          }
          else {
            this.$message({
              type: 'success',
              message: '提交成功'
            })}
          }
          //显示订单信息
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '提交失败'
          })
        })
    },

  },

};
</script>

<style scoped lang="scss">

@import './src/styles/mixin';
.button{
  @include wh(140px, 50px);
  margin: 20px 0px 20px 0px;
  //background-color: #1794FF;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 400;
}
.my_demand_details {
  font-family: PingFangSC-Regular, PingFang SC;
  position: relative;

  .demand_overview {
    box-sizing: border-box;
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    margin: 20px 0px 33px auto;
    border: #E7E7E7 1px solid;
    .demand_content{
      white-space: pre-line;
    }
    h4 {
      margin-bottom: 15px;
    }
  }

  .technological_process {
    display: flex;
    border: 1px solid #E7E7E7;
    height: 400px;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;

    p {
      margin-bottom: 50px;
      margin-left: 40px;
      font-size: 30px;
      color: #909399;
    }

    ::v-deep .el-button {
      margin: 0 0 0 20px;
    }
    .map {
      width: 780px;
      height: 400px;
    }
    .button_group1{
      display: flex;
      height: 400px;
      align-items: center;
      justify-content: space-around;
      flex-direction:column-reverse;
    }
    .button_group {
      display: flex;
      height: 375px;
    ul{
      width: 420px;
      margin-top: 5px;
      margin-left: 5px;
      li{
          color: #8c939d;
          line-height: 30px;
      }
    }
    }
  }

  .indicators_text {
    border: 1px solid #E7E7E7;
    padding: 19px;

    .p_text {
      font-size: 14px;
      color: #4E4E4E;
      line-height: 24px;
    }
  }

  .indicators {
    .recommend {
      border: 1px solid #E7E7E7;
      margin-top: 20px;
      padding: 20px;

      .strategy {
        width: 110px;
        height: 20px;
        margin-left: 15px;
        margin-bottom: 50px;
      }

      .children_demand {
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-start;
        /*align-items: center;*/
        margin-bottom: 50px;

        .children_demand_title {
          font-size: 14px;
          display: inline-block;
          width: 200px;
          margin-right: 20px;
        }

        .company {
          flex: 1;
          width: 100%;
          display: flex;
          height: 24px;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          justify-items: center;
          ::v-deep .el-radio-group {
            margin-right: 20px;
            height: 24px;
          }
          ::v-deep .el-radio {
            margin-bottom: 5px !important;
          }
          img {
            display: inline-block;
            position: absolute;
            height: 15px;
          }
        }
      }
    }
    .grab {
      padding: 20px;
      border: 1px solid #E7E7E7;
      margin-top: 20px;
      .grab_name {
        position: relative; /*定位*/
        margin: 20px 20px 20px 0;
        .grab_title {
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
          width: 200px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%); /*定位*/
        }
        .grab_content {
          display: inline-block;
          margin-left: 200px;
          padding-top: 10px;
          .company {
            .grab_company_list {
              width: 250px;
              display: inline-block;
              height: 30px;
            }
            img {
              display: inline-block;
              position: absolute;
              height: 15px;
            }
          }
        }
      }
    }
    .submit {
      display: flex;
      /*项目位于容器的中心*/
      justify-content: center;
      /*元素位于容器的中心。弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。*/
      align-items: center;
    }
  }

  .serve-details-text-bottom {
    width: 1200px;
    margin: 50px 330px 33px auto;
    border: 1px solid #E7E7E7;

    .tab {
      margin-left: 10px;
      padding-top: 5px;
    }
  }
  .details-category {
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
    margin-top: 20px;
  }
  .my_demand-details {
    box-sizing: border-box;
    @include wh(953px, 440px);
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    margin: 20px 330px 33px auto;
  }
  .my_demand-details-text-bottom {
    width: 953px;
    margin: 20px 330px 33px auto;
    border: 1px solid #E7E7E7;
  }
  .my_demand-details-img {
    display: inline-block;
    margin-right: 30px;
    @include wh(400px, 400px);
    float: left;
  }

  .my_demand-details-inner-text {
    display: inline-block;
    box-sizing: border-box;
    @include wh(400px);
    float: left;

    .my_demand-title {
      @include wh(751px, 55px);
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      line-height: 25px;
      margin-left: 10px;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 2; /** 显示的行数 **/
      overflow: hidden; /** 隐藏超出的内容 **/
    }

    .text-title-title {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      margin-top: 10px;
      margin-left: 10px;

      .text-service-text {
        color: #333333;
      }
    }

    .text-title-title1 {
      display: flex;
      align-items: center;
      height: 20px;
      width: 700px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      margin-top: 10px;
      margin-left: 10px;

      .file_img {
        height: 25px;
        margin-right: 5px;

      }
    }
  }

  .font {
    font-size: 18px;
  }

  .mechanism-classification {
    box-sizing: border-box;
    @include wh(751px, 50px);
    padding-top: 5px;
    background: #F3F3F3;
    margin-bottom: 15px;

  }

  .my_demand-evaluation {
    margin-left: 130px;
    padding-top: 5px;
    text-align: center;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }

  .my_demand-description {
    @include wh(940px, 500px);
    background: #FFFFFF;
    box-shadow: 0 2px 4px 3px rgba(225, 225, 225, 0.5);
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
    margin: 50px 330px 33px auto;

    .des-title {
      text-align: center;
      height: 40px;
    }
  }
}

::v-deep .el-tabs__item {
  @include wh(130px, 52px);
  text-align: center;
  font-size: 16px;
  line-height: 52px;
}

::v-deep .el-button {


}

::v-deep .el-rate__icon {
  font-size: 16px;
}

::v-deep .el-rate {
  @include wh(500px, 20px);
  float: right;
  line-height: 20px;
}

::v-deep .el-rate__item {
  height: 16px;
}

::v-deep .el-tab-pane {
  margin: 10px;
}

.tab {
  margin-left: 10px;
  padding-top: 5px;

  .accessory {
    display: flex;
    align-items: center;
    margin-left: 30px;

    .file_img {
      height: 50px;
    }

    .accessory_name {
      display: inline-block;
      width: 400px;
      margin-left: 20px;

    }

    .down {

    }
  }
}

::v-deep .el-tabs__header {
  margin: 0;
}
::v-deep .el-radio{
  margin-right: 10px;
}
</style>
