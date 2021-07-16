<template>
  <div class="looking-service container">
   <bread-crumb :info="info"></bread-crumb>
    <div class="common-head-classification">
      <div class="common-head-classification-top">
        <div class="common-head-classification-tab fl">
          <a href="#">找服务</a>
        </div>
        <div class="common-head-classification-serach fr">
          <el-input
              placeholder="请输入内容（回车）"
              prefix-icon="el-icon-search"
              v-model="findValue"
              @keyup.enter.native="getFirstServiceList(null,findValue)"
          >
            <el-button slot="append" icon="el-icon-search" type="primary" @click="getFirstServiceList(null,findValue)"></el-button>
          </el-input>
        </div>
      </div>
      <div class="common-head-classification-bottom">
        <div class="primary-classification">
          <dl>
            <dt>服务分类：</dt>
            <dd @click="getFirstServiceList(null)">全部</dd>
            <dd v-for="(item) in getFirstCategoryList" @click="getSecendsList(item.id)" :key="item.id">{{ item.name }}
            </dd>
          </dl>
        </div>
        <div class="secondary-classification" v-if="getSecondCategoryList.length !== 0">
          <dl>
            <dd v-for="(item) in getSecondCategoryList" @click="getSecondServiceList(item.id)" :key="item.id">{{ item.name }}
            </dd>
          </dl>
        </div>
        <div class="secondary-classification" v-else>
          <dl>
            <dd>暂无二级分类</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="info-list" v-if="serviceList.length !== 0">
      <div class="info-list-main" v-for="(item,index) in serviceList" :key="index">
        <div class="container">
          <info-list-item2 v-for="(info,index) in item" :key="index"  :info="info" :detailurl="'/sdetail/'+info.id" :listtype="1"  @orderImmediately="setOrderImmediately"></info-list-item2>
        </div>
      </div>
      <div class="common-pagination">
        <div class="pagination">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="15"
              layout="total, prev, pager, next"
              :total="serviceData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="list-null" v-else>
      当前暂无数据，请刷新重试。
    </div>
  </div>
</template>

<script>

import {resolve} from "vue-count-to";
import {reject} from "lodash";
import BreadCrumb from "../components/BreadCrumb";
import InfoListItem2 from "../components/InfoListItem2";

export default {
  name: "LookingService",
  components: {InfoListItem2, BreadCrumb},
  data(){
    return{
      findValue: '',
      getFirstCategoryList: [],
      getSecondCategoryList: [],
      serviceData:[],
      serviceList: [],
      currentPage1: 1,
      secondId:null,
      firstId:null,
      info:[{
        title:'找服务',
        path:''
      }]
    }
  },
  async mounted() {
    // 获取服务分类列表
    await this.getFirstCategory()
    // 获取第一次全部的服务
    await this.getFirstServiceList(null)
  },
  watch: {
    findValue:{
      handler(newValue,oldValue) {
        if (newValue === ""){
          this.getFirstServiceList(null)
        }
      }
    },
  },
  methods: {
    // 获取服务分类列表
    async getFirstCategory(){
      const categoryResust = await this.$axios.categoryControllerList.getFirstCategoryList({})
      this.getFirstCategoryList = categoryResust.data.firstCategoryList
    },
    // 获取二级分类列表
    async getSecendsList(id) {
      this.firstId = id
      const secondsResult = await this.$axios.categoryControllerList.getSecondCategoryList({
        firstId: id
      })
      this.getSecondCategoryList = secondsResult.data.secondCategoryList
      await this.getFirstServiceList(this.firstId)
    },
    // 获取第一次全部的服务或者一级分类的服务
    async getFirstServiceList(id,...props){
      if (id === null) {
        this.getSecondCategoryList = []
        let servciceBaseResult =[]
        if(props.length === 0){
           servciceBaseResult = await this.$axios.serveControllerList.getServesByCondition({
            page: this.currentPage1,
            limit: 15
          }, {
            status: 1
          })
        }else {
           servciceBaseResult = await this.$axios.serveControllerList.getServesByCondition({
            page: this.currentPage1,
            limit: 15
          }, {
            status: 1,
            name: props[0]
          })
        }
        this.setServiceData(servciceBaseResult)
      } else {
        const servciceBaseResult = await this.$axios.serveControllerList.getServesByCondition({
          page: this.currentPage1,
          limit: 15
        }, {
          categoryId: id,
          status: 1
        })
        this.setServiceData(servciceBaseResult)
      }
    },
    // 获取二级分类的服务列表
    async getSecondServiceList(id){
      const servciceBaseResult = await this.$axios.serveControllerList.getServesByCondition({
        page: this.currentPage1,
        limit: 15
      }, {
        categoryId:this.firstId+','+id,
        status: 1
      })
      this.setServiceData(servciceBaseResult)
    },
    // 处理服务列表数据
    setServiceData(servciceBaseResult){
      this.serviceData = servciceBaseResult.data.serveList
      let len = servciceBaseResult.data.serveList.records.length;
      let n = 5; //假设每行显示4个
      this.serviceList = [];
      if (len !== 0) {
        let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
        this.serviceList = [];
        for (let i = 0; i < lineNum; i++) {
          // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
          let temp = servciceBaseResult.data.serveList.records.slice(i * n, i * n + n);
          this.serviceList.push(temp);
        }
      }
    },
    // 立即下单产生订单
    async setOrderImmediately(value){
      let createOrderResult = await this.$axios.orderControllerList.createOrder({
        serveId:value,
        type:0
      })
      if (createOrderResult.code === 20000){
        this.$message({
          message: createOrderResult.message,
          type: 'success',
          duration:500,
          onClose:() =>  this.$router.push('/pc/buyer/myorder')
        })
      }
      if (createOrderResult.code === 20001){
        this.$message({
          message: createOrderResult.message,
          type: 'error'
        })
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(pageNum) {
      if (this.secondId) {
        await this.getSecondServiceList(this.secondId)
      }else {
        await this.getFirstServiceList(null)
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/mixin';
.looking-service{
  .common-head-classification {
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    margin-bottom: 20px;
    .common-head-classification-top {
      height: 50px;
      background: #F1F1F1;
      .common-head-classification-tab {
        text-align: center;
        line-height:50px;
        a {
          height:48px;
          width: 120px;
          display:block;
          font-size: 18px;
          font-weight: 500;
          color: #1794FF;
          background: #FFFFFF;
          border-top: 2px solid #1794FF;
        }
      }
      .common-head-classification-serach {
        margin-right: 10px;
        line-height:50px;
      }
    }
    .common-head-classification-bottom {
      box-sizing: border-box;
      height: 135px;
      padding:30px 24px;
      .primary-classification {
        dt,dd{
          margin-right:28px;
          float:left;
          cursor: pointer;
        }
        dd {
          &:first-child {
            font-size: 14px;
            font-weight: 400;
            color: #1794FF;
          }
        }
      }
      .secondary-classification {
        dl {
          margin-top: 40px;
          margin-left: 90px;
          height:36px;
          line-height:36px;
          width: 90%;
          background: #F8F8F8;
          border-radius: 2px;
          overflow: hidden;
        }
        dd {
          margin:0 20px;
          float:left;
          font-size: 14px;
          font-weight: 400;
          color: #111111;
        }
      }
    }
  }
  .info-list-main {
    .container {
      display:flex;
      justify-content: flex-start;
      //.info-list-item {
      //  box-sizing: border-box;
      //  width:225px;
      //  height: 330px;
      //  border: 1px solid #E7E7E7;
      //  padding: 16px 22px;
      //  margin-bottom: 20px;
      //  margin-right: 18px;
      //  &:last-child {
      //    margin-right: 0;
      //  }
      //  &:hover {
      //    border: 1px solid #1794FF;
      //  }
      //  img {
      //    width:100%;
      //    height:auto;
      //  }
      //  .enterprise-name {
      //    height:45px;
      //    margin: 14px 0;
      //    h1 {
      //      font-size: 15px;
      //      font-weight: 500;
      //      color: #111111;
      //      word-break: break-all;
      //      text-overflow: ellipsis;
      //      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      //      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      //      -webkit-line-clamp: 2; /** 显示的行数 **/
      //      overflow: hidden;  /** 隐藏超出的内容 **/
      //    }
      //  }
      //  .enterprise-bottom {
      //    span {
      //      display:inline-block;
      //      height:17px;
      //      font-size: 12px;
      //      font-family: PingFangSC-Regular, PingFang SC;
      //      font-weight: 400;
      //      color: #FF7C12;
      //    }
      //  }
      //  .enterprise-bottom-operation {
      //    overflow: hidden;
      //    height:22px;
      //    line-height:22px;
      //    span:first-child {
      //      width:108px;
      //      float: left;
      //      font-size: 12px;
      //      font-weight: 400;
      //      color: #666666;
      //      word-break: break-all;
      //      text-overflow: ellipsis;
      //      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      //      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      //      -webkit-line-clamp: 1; /** 显示的行数 **/
      //      overflow: hidden;  /** 隐藏超出的内容 **/
      //    }
      //    span:last-child {
      //      float: right;
      //      font-size: 16px;
      //      font-weight: 500;
      //      a {
      //        color: #1794FF;
      //      }
      //    }
      //  }
      //}
    }
  }
  .list-null {
    height:340px;
  }
  .common-pagination{
    height:60px;
    position:relative;
    .pagination {
      position:absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%,-50%);
    }
  }
}
</style>
