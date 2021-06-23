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
        <div class="text-title-title">创造时间：<span class="text-service-text">{{ this.date }}</span></div>
        <div class="text-title-title">联系人：<span class="text-service-text">{{ this.info_all.telephone }}</span></div>
        <div class="text-title-title">手机号：<span class="text-service-text">{{ this.info_all.telephone }}</span></div>

        <div class="address">
          <div class="text-title-title ">联系地址：<span class="text-service-text ">{{ this.info_all.address }}</span></div>
        </div>
        <div class="text-title-title1 "><span>附件：</span><img src="../../../assets/images/fileimg.png" class="file_img"
                                                             v-bind:href="this.info_all.attachments"/>
          <!--        <a :href=this.info_all.attachments>下载</a>-->
        </div>
        <!--        <div class="text-title-title ">电子邮箱：<span class="text-service-text">xxxxx</span></div>-->
      </div>
      <div></div>
    </div>
    <!--    <div class="my_demand-description container">-->
    <!--      <p class="des-title">需求描述</p>-->
    <!--      <p class="des_content">{{info.content}}</p>-->
    <!--    </div>-->
    <!--    <el-tabs v-model="activeName" type="card" class="serve-details-text-bottom container">-->
    <!--      <el-tab-pane label="需求描述" name="first" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info_all.content}}</p></div></el-tab-pane>-->
    <!--      <el-tab-pane label="项目背景" name="second" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info_all.projectBackground}}</p></div></el-tab-pane>-->
    <!--      <el-tab-pane label="验收指标" name="third" class="tab">-->
    <!--        <div class="indicators_text"><p class="p_text">{{this.info_all.standard}}</p></div>-->

    <!--      </el-tab-pane>-->
    <!--      <el-tab-pane label="附件" name="fourth" class="tab">-->
    <!--        <div class="accessory ">-->
    <!--          <img src="" class="file_img"/>-->
    <!--          <p class="accessory_name">附件</p>-->
    <!--          <a class="down" :href="this.info_all.attachments">下载</a>-->
    <!--        </div>-->

    <!--      </el-tab-pane>-->
    <!--    </el-tabs>-->

    <div class="demand_overview container">
      <h4>需求概述</h4>
      <p>{{ this.info_all.content }}</p>
      {{ requireState }}
    </div>
    <div class="technological_process" v-if="requireState>3&&requireState!==6">
      <div class="map">
        <heihei :arrangeList="arrangeInfo"></heihei>
      </div>
      <div class="button_group" v-if="lengthInfo&&requireState===4">
        <el-button type="primary" @click="verify" :disabled="forbidden">确定</el-button>
        <el-button type="primary" :disabled="reOpen" @click="resoution">重新拆分</el-button>
      </div>
      <div class="button_group" v-if="requireState===6">
        <p>已提交订单</p>
      </div>

    </div>

    <div class="indicators" v-if="hid&&requireState===5">
      <div class="recommend">
        <h3 style="margin-bottom: 20px">推荐服务商</h3>
        <span style="margin-bottom: 50px">推荐策略</span>
        <el-select v-model="value" placeholder="请选择" class="strategy">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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

        <!--        推荐服务商-->
        <div class="children_demand" v-for="(items,index) in item" v-bind:key="index" v-if="items.subRequireName">
          <span class="children_demand_title">{{ items.subRequireName }}</span>
          <div class="company ">
            <el-radio-group v-model="company_radio[index]" @change="changeVal"
                            v-for="(itemss,index1) in items.sellerList" v-bind:key="index1">
              <el-radio :label="itemss.serveId">{{ itemss.sellerName }}</el-radio>
              <img src="../../../assets/images/detaillogo.png" class="detail_logo" @click="company_detail">
            </el-radio-group>
          </div>
        </div>
      </div>
      <!--        抢单-->
      <div class="grab">
        <h3 style="margin-bottom: 20px">抢单商家</h3>
        <div class="grab_name" v-for="(items,index) in grab_item" v-bind:key="index">
          <div class="grab_title">拆弹机器人专利信息检索</div>
          <div class="grab_content">
            <div class="company ">
              <el-radio-group v-model="grab_radio[index]">
                <div class="grab_company_list">
                  <el-radio :label="1">公司公司公司公司公司公司</el-radio>
                </div>
                <div class="grab_company_list">
                  <el-radio :label="2">公司公司公公司公司司公司</el-radio>
                </div>
                <div class="grab_company_list">
                  <el-radio :label="3">公司公公司公司公司司公司公司</el-radio>
                </div>
                <div class="grab_company_list">
                  <el-radio :label="4">公司公公司公司公司司公司公司</el-radio>
                </div>
                <div class="grab_company_list">
                  <el-radio :label="5">公司公公司公司公司司公司公司</el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit"><span class="font">提交</span></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import heihei from "../../../components/showGraph/ShowGraph";

export default {
  props: ['id'],
  name: "MyDemandDetails",
  components: {heihei},
  data() {
    return {
      reOpen: false,//是否重新拆分
      company_radio: {},
      grab_radio: ['1', '1', '1'],//抢单商家
      activeName: 'first',
      info: {},
      info_all: [],
      item: [],//推荐商家
      grab_item: ["", "", ""],
      hid: 0,//是否隐藏推荐服务商面板
      forbidden: false,//确定按钮是否可用
      date: null,
      arrangeInfo: {},
      lengthInfo: 0,
      requireState: 0,
      options: [{
        value: '选项1',
        label: '综合排序'
      }, {
        value: '选项2',
        label: '价格少'
      }, {
        value: '选项3',
        label: '时间段'
      }, {
        value: '选项4',
        label: '龙须面'
      }],
      options1: [{
        value: '选项1',
        label: '是'
      }, {
        value: '选项2',
        label: '否'
      }],
      value: '',
      value1: '',

    };
  },
  created() {
    //根据需求状态设置确定按钮的可用状态
    this.getRequireState()
  },
  async mounted() {
    await this.getArrangeInfo()
    await this.getBuyer()

  },

  methods: {
    //获取服务商方法
    async getBuyer() {
      //获取推荐服务商列表
      const detail_result = await this.$axios.serveControllerList.getServeById({
        requirementId: this.id
      })
      //item用于存储推荐服务商
      this.item = detail_result.data.res
      const results = await this.$axios.requirementControllerList.getRequireDetailById({
        id: this.id
      })
      console.log("服务商", this.item)
      //info_all存储需求详情
      this.info_all = results.data.requirement
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
        console.log(result.data.layout)
        console.log(this.arrangeInfo)
        console.log(this.lengthInfo)
      }
    },
    //对结果重新拆分
    async resoution() {
      let result = await this.$axios.requirementControllerList.resoution({
        requirementId: this.$route.params.id
      })
      if (result.code === 20000) {
        this.$message({
          message: '重新拆分请求已经发送！',
          type: 'success'
        });
        this.reOpen = true
        // 重新刷新页面，重新渲染数据
        // this.$router.go(0)
      }

    },
    downFile() {
    },
    //跳转推荐服务商的详情页的方法
    company_detail() {
      this.$router.push(`/buyer/comanydetail`)
    },
    //用户核实拆分
    async verify() {
      let result = await this.$axios.requirementControllerList.confirmResult({
        requirementId: this.$route.params.id
      })
      console.log(result.data.num)
      if (result.code === 20000) {
        await this.getBuyer()
        console.log("我被点了")
        this.forbidden = true//禁用确定按钮
        this.reOpen = true//重新拆分是否隐藏
        this.hid = 1//推荐服务商是否隐藏
      }

    },
    //获取需求状态
    async getRequireState() {
      let result = await this.$axios.requirementControllerList.getRequireDetailById({
        id: this.$route.params.id
      })
      if (result.code === 20000) {
        this.requireState = result.data.requirement.status
        if (result.data.requirement.status === 5 || result.data.requirement.status === 6) {
          this.hid = 1//推荐服务商是否隐藏
          console.log("状态", this.requireState)
          this.forbidden = true//禁用确定按钮
          this.reOpen = true//重新拆分是否隐藏
        }

      }
    },
    getVal(val) {
      console.log(val)
    },
    changeVal(val) {
      console.log(this.company_radio)
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
      this.item.map((item, index) => {
        orderList.push(item.subRequireId + ',' + this.company_radio[index])
      })
      console.log(orderList)
      await this.$axios.orderControllerList.saveForSelect(orderList)
          .then(response => {
                this.hid = 0
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
                //重新刷新页面，重新渲染数据
              }
          ).catch(error => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '提交失败'
            })
          })

    }
  },

};
</script>

<style scoped lang="scss">

@import './src/styles/mixin';

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

    h4 {
      margin-bottom: 15px;
    }
  }

  .technological_process {
    display: flex;
    border: 1px solid #E7E7E7;

    p {
      margin-bottom: 50px;
      margin-left: 40px;
      font-size: 30px;
      color: #909399;
    }

    /deep/ .el-button {
      margin: 0 0 0 20px;
    }

    .map {
      height: 400px;


    }

    .button_group {
      display: flex;
      flex-direction: column-reverse;
      align-content: center;
      justify-content: space-evenly;
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
        align-items: center;

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
          justify-content: flex-start;
          flex-wrap: wrap;

          /deep/ .el-radio-group {
            margin-right: 20px;
          }

          /deep/ .el-radio {
            margin-bottom: 5px !important;
          }

          img {
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

/deep/ .el-tabs__item {
  @include wh(130px, 52px);
  text-align: center;
  font-size: 16px;
  line-height: 52px;
}

/deep/ .el-button {
  @include wh(140px, 50px);
  margin: 20px 0px 20px 0px;
  //background-color: #1794FF;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 400;

}

/deep/ .el-rate__icon {
  font-size: 16px;
}

/deep/ .el-rate {
  @include wh(500px, 20px);
  float: right;
  line-height: 20px;
}

/deep/ .el-rate__item {
  height: 16px;
}

/deep/ .el-tab-pane {
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

/deep/ .el-tabs__header {
  margin: 0;
}

</style>
