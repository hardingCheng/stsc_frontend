<template>
  <div class="my_demand_details container">
    <div class="my_demand-details container ">
      <div class="my_demand-details-img"><img :src="this.info_all.image" width="400px" height="400px"></div>
      <div class="my_demand-details-inner-text">
        <div class="my_demand-title">{{ this.info_all.name }}</div>
        <div class="mechanism-classification">
          <div class="text-title-title">需求机构：<span class="text-service-text">{{ this.info_all.company }}</span></div>
          <!--          <div class="text-title-title ">服务类别：<span class="text-service-text">设计服务>工业服务</span></div>-->
        </div>
        <!--        <div class="text-title-title">单位所在地：<span class="text-service-text">{{ info.address }}</span></div>-->
        <div class="text-title-title">创造时间：<span class="text-service-text">{{ this.info_all.createTime }}</span></div>
        <div class="text-title-title">联系人：<span class="text-service-text">{{ this.info_all.telephone }}</span></div>
        <div class="text-title-title">手机号：<span class="text-service-text">{{  this.info_all.telephone }}</span></div>

        <div class="address">
          <div class="text-title-title ">联系地址：<span class="text-service-text ">{{  this.info_all.address }}</span></div>
        </div>
<!--        <div class="text-title-title ">电子邮箱：<span class="text-service-text">xxxxx</span></div>-->
      </div>
      <div></div>
    </div>
    <!--    <div class="my_demand-description container">-->
    <!--      <p class="des-title">需求描述</p>-->
    <!--      <p class="des_content">{{info.content}}</p>-->
    <!--    </div>-->
    <el-tabs v-model="activeName" type="card" class="serve-details-text-bottom container">
      <el-tab-pane label="需求描述" name="first" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info_all.content}}</p></div></el-tab-pane>
      <el-tab-pane label="项目背景" name="second" class="tab"><div class="indicators_text"><p class="p_text">{{ this.info_all.projectBackground}}</p></div></el-tab-pane>
      <el-tab-pane label="验收指标" name="third" class="tab">
        <div class="indicators_text"><p class="p_text">{{this.info_all.standard}}</p></div>

      </el-tab-pane>
      <el-tab-pane label="附件" name="fourth" class="tab">
        <div class="accessory ">
          <img src="" class="file_img"/>
          <p class="accessory_name">附件</p>
          <a class="down" :href="this.info_all.attachments">下载</a>
        </div>

      </el-tab-pane>
    </el-tabs>
    <div class="technological_process">
      <h3>xxxx</h3>
        <div class="map"></div>
      <div class="button_group">
      <el-button type="primary" @click="verify">确定</el-button>
        <el-button type="primary">重新拆分</el-button>
      </div>
    </div>
    <div class="indicators" v-if="hid">
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

        <div class="children_demand"  v-for="(items,index) in item" v-bind:key="index">
          <span class="children_demand_title" >{{items.subRequireName}}</span>
          <div class="company ">
            <el-radio-group v-model="company_radio[index]" @change="changeVal" v-for="(itemss,index1) in items.sellerList" v-bind:key="index1">
              <el-radio :label="itemss.serveId"  >{{itemss.sellerName}}</el-radio>
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
        <el-button><span class="font" @click="submit">提交</span></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['id'],
  name: "MyDemandDetails",
  data() {
    return {
      company_radio: {},
      grab_radio:['1','1','1'],//抢单商家
      activeName: 'first',
      info: {},
      info_all:[],
      item: [],//推荐商家
      grab_item: ["", "", ""],
      hid:false,

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
  async mounted() {
    const detail_result = await this.$axios.serveControllerList.getServeById({
      requirementId: this.id
    })
    this.item = detail_result.data.res
    console.log("测",this.item)
    const results =  await  this.$axios.requirementControllerList.getRequireDetailById({
      id:this.id
    })
    this.info_all =results.data.requirement
    console.log("all", this.info_all)


  },

  methods: {
    company_detail(){
      this.$router.push(`/buyer/comanydetail`)
    },
    verify(){//核实拆分
      this.hid=true
    },
    getVal(val){
      console.log(val)
    },
    changeVal(val){
      console.log(this.company_radio)
    },
    changeSelect(label){
      this.radio=label
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
    async submit() {
      let orderList = []
      this.item.map((item, index) => {
        orderList.push( item.subRequireId + ',' + this.company_radio[index])
      })
      console.log(orderList)
      await this.$axios.orderControllerList.saveForSelect(orderList).then(response =>{
        this.$message({
          type: 'success',
          message: '提交成功'
        })
          }
      ).catch(error =>{
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
  .technological_process{
    border: 1px solid #E7E7E7;
    /deep/ .el-button{
      margin: 0 0 0 20px;
    }
    .map{
      background: #909399;
       height: 400px;
    }
    .button_group{
      display: flex;
      flex-direction: row-reverse;
      margin-top: 5px;
      margin-bottom: 5px;
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
          .company{
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
  background-color: #1794FF;
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
<style>
.el-tabs__item:hover {
  color: black;
}

.el-tabs__item.is-active {
  background-color: #1794FF;
  color: white;
}
</style>
