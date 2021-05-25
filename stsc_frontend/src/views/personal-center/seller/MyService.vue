<template>
  <div class="my-service">
    <div class="public-info-list" v-if="infoList.records.length !== 0" :class="[infoList.records.length<3 ?'public-info-list-null':'']">
      <my-public-info-list :infoList="infoList.records" @modInfo="modInfo" @deleteInfo="deleteInfo" @infoDetail="infoDetail" :type="2">
      </my-public-info-list>
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
import MyPublicInfoList from "../../../components/MyPublicInfoList";
export default {
  name: "MyService",
  components: {MyPublicInfoList},
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
    let result = await this.$axios.serveControllerList.getAllServesByUserId({
      sellerId:userInfo.id,
      page:1,
      limit:4
    })
    this.infoList = result.data.serveList
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      let userInfo = this.$store.getters.getUserInfo
      let result = await this.$axios.serveControllerList.getAllServesByUserId({
        sellerId:userInfo.id,
        page:val,
        limit:3
      })
      this.infoList = result.data.requireList
    },
    async infoDetail(id){
      await this.$router.push(`/seller/myservice/${id}`)
    },
    async modInfo(id){
      await this.$router.push(`/ss/${id}`)
    },
    async deleteInfo(id){
      let result = await this.$axios.serveControllerList.deleteServeById({
        id
      })
      if(result.code === 20000){
        this.$message({
          message: '删除服务成功',
          type: 'success'
        })
        let userInfo = this.$store.getters.getUserInfo
        let result = await this.$axios.serveControllerList.getAllServesByUserId({
          buyerId:userInfo.id,
          page:1,
          limit:15
        })
        this.infoList = result.data.serveList
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

<style scoped lang="scss">
.my-service {
  width: 100%;
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
