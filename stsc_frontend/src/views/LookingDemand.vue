<template>
  <div class="looking-demand container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>找需求</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-head-classification">
      <div class="common-head-classification-top">
        <div class="common-head-classification-tab fl">
          <a href="#">找需求</a>
        </div>
        <div class="common-head-classification-serach fr">
          <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input2">
          </el-input>
        </div>
      </div>
      <div class="common-head-classification-bottom">
        <div class="primary-classification">
          <dl>
            <dt>需求分类：</dt>
            <dd @click="getDemandList(null)">全部</dd>
            <dd v-for="(item) in getFirstCategoryList" @click="getSecendsList(item.id)" :key="item.id">{{ item.name }}
            </dd>
          </dl>
        </div>
        <div class="secondary-classification" v-if="getSecondCategoryList.length !== 0">
          <dl>
            <dd v-for="(item) in getSecondCategoryList" @click="getDemandList(item.id)" :key="item.id">{{ item.name }}
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
    <div class="info-list" v-if="demandList.length !== 0">
      <div class="info-list-main" v-for="(item,index) in demandList" :key="index">
        <div class="container">
          <div class="info-list-item" v-for="(info,index) in item" :key="index">
            <img src="../assets/images/hotbg.png" alt="">
            <div class="enterprise-name">
              <h1>{{ info.name }}</h1>
            </div>
            <div class="enterprise-bottom">
              <span>{{ info.keywords }}</span>
              <div class="enterprise-bottom-operation">
                <span>{{ info.company }}</span>
                <span><a href="#">立即下单</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-pagination">
        <div class="pagination">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000">
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
export default {
  name: "LookingDemand",
  data() {
    return {
      input2: '',
      getFirstCategoryList: [],
      getSecondCategoryList: [],
      demandList: [],
      currentPage1: 2
    }
  },
  async mounted() {
    const categoryResust = await this.$axios.categoryControllerList.getFirstCategoryList({})
    this.getFirstCategoryList = categoryResust.data.firstCategoryList
    await this.getDemandList(null)
  },
  methods: {
    async getSecendsList(id) {
      const secondsResult = await this.$axios.categoryControllerList.getSecondCategoryList({
        firstId: id
      })
      this.getSecondCategoryList = secondsResult.data.secondCategoryList
      this.getDemandList(id)
    },
    async getDemandList(id) {
      if (id === null) {
        const demandBaseResult = await this.$axios.requirementControllerList.getRequiresByCondition({
          page: 1,
          limit: 15
        }, {})
        let len = demandBaseResult.data.requireList.records.length;
        let n = 5; //假设每行显示4个
        this.demandList = [];
        if (len !== 0) {
          let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
          this.demandList = [];
          for (let i = 0; i < lineNum; i++) {
            // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
            let temp = demandBaseResult.data.requireList.records.slice(i * n, i * n + n);
            this.demandList.push(temp);
          }
        }
      } else {
        const demandBaseResult = await this.$axios.requirementControllerList.getRequiresByCondition({
          page: 1,
          limit: 15
        }, {
          categoryId: id
        })
        let len = demandBaseResult.data.requireList.records.length;
        let n = 5; //假设每行显示4个
        this.demandList = [];
        if (len !== 0) {
          let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
          this.demandList = [];
          for (let i = 0; i < lineNum; i++) {
            // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
            let temp = demandBaseResult.data.requireList.records.slice(i * n, i * n + n);
            this.demandList.push(temp);
          }
        }
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/mixin';

.looking-demand {
  .breadcrumb {
    /deep/ .el-breadcrumb {
      height: 57px;
      line-height: 57px;
    }
  }
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

        .info-list-item {
          box-sizing: border-box;
          width: 225px;
          height: 330px;
          border: 1px solid #E7E7E7;
          padding: 16px 22px;
          margin-bottom: 20px;
          margin-right: 18px;

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            border: 1px solid #1794FF;
          }

          img {
            width: 100%;
            height: auto;
          }

          .enterprise-name {
            height: 45px;
            margin: 14px 0;

            h1 {
              font-size: 15px;
              font-weight: 500;
              color: #111111;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
              -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
              -webkit-line-clamp: 2; /** 显示的行数 **/
              overflow: hidden; /** 隐藏超出的内容 **/
            }
          }

          .enterprise-bottom {
            span {
              display: inline-block;
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FF7C12;
            }
          }

          .enterprise-bottom-operation {
            overflow: hidden;
            height: 22px;
            line-height: 22px;

            span:first-child {
              width: 108px;
              float: left;
              font-size: 12px;
              font-weight: 400;
              color: #666666;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
              -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
              -webkit-line-clamp: 1; /** 显示的行数 **/
              overflow: hidden; /** 隐藏超出的内容 **/
            }

            span:last-child {
              float: right;
              font-size: 16px;
              font-weight: 500;

              a {
                color: #1794FF;
              }
            }
          }
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
