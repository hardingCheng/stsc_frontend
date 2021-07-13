<template>
  <div class="looking-demand container">
    <bread-crumb :info="info"></bread-crumb>
    <div class="common-head-classification">
      <div class="common-head-classification-top">
        <div class="common-head-classification-tab fl">
          <a href="#">找需求</a>
        </div>
        <div class="common-head-classification-serach fr">
          <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="findValue">
          </el-input>
        </div>
      </div>
      <div class="common-head-classification-bottom">
        <div class="primary-classification">
          <dl>
            <dt>需求分类：</dt>
            <dd @click="getFirstDemandList(null)">全部</dd>
            <dd v-for="(item) in getFirstCategoryList" @click="getSecendsList(item.id)" :key="item.id">{{ item.name }}
            </dd>
          </dl>
        </div>
        <div class="secondary-classification" v-if="getSecondCategoryList.length !== 0">
          <dl>
            <dd v-for="(item) in getSecondCategoryList" @click="getSecendDemandList(item.id)" :key="item.id">{{ item.name }}
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
    <div class="info-list" v-if="demandList2.length !== 0">
      <div class="info-list-main" v-for="(item,index) in demandList2" :key="index">
        <div class="container">
          <info-list-item2  v-for="(info,index) in item" :key="index"  :info="info" :detailurl="'/ddetail/'+info.id+'/'+info.flag" :listtype="0" @requireImmediately="requireImmediately(info.id)"></info-list-item2>
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
              :total="requireList.total">
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
import BreadCrumb from "../components/BreadCrumb";
import InfoListItem2 from "../components/InfoListItem2";
export default {
  name: "LookingDemand",
  components: {InfoListItem2, BreadCrumb},
  data() {
    return {
      findValue: '',
      getFirstCategoryList: [],
      getSecondCategoryList: [],
      demandList1: [],
      demandList2: [],
      currentPage1: 1,
      requireList:[],
      secondId:null,
      firstId:null,
      info:[{
        title:'找需求',
        path:''
      }]
    }
  },
  async mounted() {
    // 获取分类
    await this.getFirstCategory()
    // 初次获取全部的需求列表
    await this.getFirstDemandList(null)
  },
  methods: {
    // 获取分类一级分类id
    async getFirstCategory(){
      const categoryResust = await this.$axios.categoryControllerList.getFirstCategoryList({})
      this.getFirstCategoryList = categoryResust.data.firstCategoryList
    },
    // 获取二级分类
    async getSecendsList(id) {
      this.firstId = id
      const secondsResult = await this.$axios.categoryControllerList.getSecondCategoryList({
        firstId: id
      })
      this.getSecondCategoryList = secondsResult.data.secondCategoryList
      await this.getFirstDemandList(this.firstId)
    },
    // 立即下单
    async setOrderImmediately(value){
      let result = await this.$axios.orderControllerList.createOrder({
        serveId:value,
        type:0
      })
      if (result.code === 20000){
        await this.$router.push('/seller/myorder')
      }
    },
    // 获取一级分类的需求和全部需求内容
    async getFirstDemandList(id) {
      let demandBaseResult
      // 全部需求
      if (id === null) {
        this.getSecondCategoryList = []
        demandBaseResult = await this.$axios.requirementControllerList.getRequireSubRequire({
          page: this.currentPage1,
          limit: 15
        }, {})
        // 此处可以选择数组平铺
        this.handleDemandBaseResult(demandBaseResult)
      } else {
        // 一级和二级都要选择时候
        if(this.secondId){
          await this.getSecendDemandList(this.secondId)
          // 只有一级的时候
        }else{
          demandBaseResult = await this.$axios.requirementControllerList.getRequireSubRequire({
            page: this.currentPage1,
            limit: 15
          }, {
            categoryId: id,
          })
        }
       this.handleDemandBaseResult(demandBaseResult)
      }
    },
    // 获取一级和二级都要选择时候
    async getSecendDemandList(id) {
      let demandBaseResult = await this.$axios.requirementControllerList.getRequireSubRequire({
        page: this.currentPage1,
        limit: 15
      }, {
        categoryId: this.firstId+','+id
      })
      this.handleDemandBaseResult(demandBaseResult)
    },
    // 处理数组数据
    handleDemandBaseResult(demandBaseResult){
      this.demandList1 = []; // 存储数组平铺的list
      this.demandList2 = []; // 将数组平铺的list转化为二维数组
      this.requireList = demandBaseResult.data;
      let requirementListRecords = demandBaseResult.data.list
      requirementListRecords.map((item) => {
        this.demandList1.push(item)
      })
      let len = this.demandList1.length;
      let n = 5; //假设每行显示4个
      if (len !== 0) {
        let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
        this.demandList2 = [];
        for (let i = 0; i < lineNum; i++) {
          // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
          let temp = this.demandList1.slice(i * n, i * n + n);
          this.demandList2.push(temp);
        }
      }
    },
    //处理分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async requireImmediately(id){
      let immediatelyResult = await this.$axios.orderControllerList.getOrderNowForRequire({
        requireId:id
      })
      if (immediatelyResult.code === 20000){
        this.$message({
          message: immediatelyResult.message,
          type: 'success'
        })
      }
      if (immediatelyResult.code === 20001){
        this.$message({
          message: immediatelyResult.message,
          type: 'error'
        })
      }
    },
    // 分页待做
    async handleCurrentChange(val) {
      if (this.secondId) {
        await this.getSecendDemandList(this.secondId)
      }else {
        await this.getFirstDemandList(null)
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import '../styles/mixin';

.looking-demand {
  .common-head-classification {
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    margin-bottom: 20px;

    .common-head-classification-top {
      height: 50px;
      background: #F1F1F1;

      .common-head-classification-tab {
        text-align: center;
        line-height: 50px;

        a {
          height: 48px;
          width: 120px;
          display: block;
          font-size: 18px;
          font-weight: 500;
          color: #1794FF;
          background: #FFFFFF;
          border-top: 2px solid #1794FF;
        }
      }

      .common-head-classification-serach {
        margin-right: 10px;
        line-height: 50px;
      }
    }

    .common-head-classification-bottom {
      box-sizing: border-box;
      height: 135px;
      padding: 30px 24px;

      .primary-classification {
        dt, dd {
          margin-right: 28px;
          float: left;
        }

        dd {
          cursor: pointer;

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
          height: 36px;
          line-height: 36px;
          width: 90%;
          background: #F8F8F8;
          border-radius: 2px;
          overflow: hidden;
        }

        dd {
          cursor: pointer;
          margin: 0 20px;
          float: left;
          font-size: 14px;
          font-weight: 400;
          color: #111111;
        }
      }
    }
  }
  .info-list {
    .info-list-main {
      .container {
        display: flex;
        justify-content: flex-start;
        .container-small {
          display: flex;
          justify-content: flex-start;
        }
      }
    }
  }
  .list-null {
    height:340px;
  }
  .common-pagination {
    height: 60px;
    position: relative;

    .pagination {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.active {
  color: #1794FF
}
</style>
