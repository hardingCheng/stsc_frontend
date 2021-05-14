<template>
  <div class="my-demand" >
    <div class="public-info-list" v-if="infoList.records.length !== 0" :class="[infoList.records.length<3 ?'public-info-list-null':'']">
      <div class="public-info-list-item" v-for="(item) in infoList.records" :key="item.id">
        <div class="info-img fl">
          <img src="http://n.sinaimg.cn/news/crawl/117/w550h367/20210311/8edb-kmeeius6993674.jpg" alt="">
        </div>
        <div class="info-details fl">
          <ul class="details">
            <li>需求名称：<span>{{item.name}}</span></li>
            <li>截止时间：<span>{{item.deadline}}</span></li>
            <li>需求状态：<span class="audit-status">{{ item.releaseStatus | modStatus }}</span></li>
          </ul>
          <el-button type="primary" size="small"  plain @click="infoDetail(item.id)">详细信息</el-button>
        </div>
        <div class="info-operation">
          <el-button type="primary" @click="modDemandInfo(item.id)">修改</el-button>
          <el-button type="primary" @click="deleteDemandInfo(item.id)">撤销</el-button>
        </div>
      </div>
    </div>
    <div class="public-info-list-null" v-else>
      当前暂无数据，请刷新重试。
    </div>
    <div class="common-pagination"  v-if="infoList.records.length !== 0">
      <div class="pagination">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="infoList.size"
            layout="total, prev, pager, next"
            :total="infoList.total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "MyDemand",
  data(){
    return {
      currentPage1:1,
      infoList:{
        records:[]
      }
    }
  },
  async mounted(){
    let userInfo = this.$store.getters.getUserInfo
    let result = await this.$axios.requirementControllerList.getAllRequiresByUserId({
      buyerId:userInfo.id,
      page:1,
      limit:15
    })
    this.infoList = result.data.requireList
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      let result = await this.$axios.requirementControllerList.getAllRequiresByUserId({
        buyerId:userInfo.id,
        page:val,
        limit:15
      })
      this.infoList = result.data.requireList
    },
    async infoDetail(id){
      await this.$router.push(`/ddetail/${id}`)
    },
    modDemandInfo(id){
      this.$router.push(`/sd/${id}`)
    },
    async deleteDemandInfo(id){
      let result = await this.$axios.requirementControllerList.deleteRequireById({
        id
      })
      if(result.code === 20000){
        this.$message({
          message: '删除需求成功',
          type: 'success'
        })
        let userInfo = this.$store.getters.getUserInfo
        let result = await this.$axios.requirementControllerList.getAllRequiresByUserId({
          buyerId:userInfo.id,
          page:1,
          limit:15
        })
        this.infoList = result.data.requireList
      }
    },
  },
  filters:{
    modStatus(value){
      switch(parseInt(value)) {
        case 0:
          return '未审核'
        case 1:
          return '审核通过'
        case 2:
          return '审核未通过'
        default:
          return '未审核'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-demand {
  width:100%;
  .public-info-list {
    .public-info-list-item {
      position: relative;
      box-sizing: border-box;
      padding:20px 0;
      height:180px;
      border-bottom:1px solid #E7E7E7;
      .info-img {
        height:100%;
        img {
          height:100%;
        }
      }
      .info-details {
        margin-left:20px;
        .details {
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          li {
            margin-bottom: 10px;
            span {
              color: #111111;
            }
            &:last-child {
              margin-bottom: 25px;
            }
            &:last-child span{
              color: #F7B500;
            }
          }
        }
      }
      .info-operation {
        position:absolute;
        right:0;
        bottom:25px;
      }

    }
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
  .public-info-list-null {
    height:500px;
  }
}
</style>
