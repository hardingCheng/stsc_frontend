<template>
  <div class="my-demand" >
    <div class="public-info-list" v-if="infoList.records.length !== 0" :class="[infoList.records.length<3 ?'public-info-list-null':'']">
      <my-public-info-list :infoList="infoList.records" @modInfo="modInfo" @deleteInfo="deleteInfo"
                           @infoDetail="infoDetail" @deleteBidding="deleteBidding" :type="1">
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
import store from "@/store";
export default {
  name: "MyDemand",
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
    let result = await this.$axios.requirementControllerList.getAllRequiresByUserId({
      buyerId:userInfo.id,
      page:1,
      limit:4
    })
    let infoList = result.data.requireList
    this.expendBiddingStatus(infoList)
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      let userInfo = this.$store.getters.getUserInfo
      let result = await this.$axios.requirementControllerList.getAllRequiresByUserId({
        buyerId:userInfo.id,
        page:val,
        limit:4
      })
      let infoList = result.data.requireList
      this.expendBiddingStatus(infoList)
    },
    async infoDetail(id){
      await this.$router.push(`/pc/mydemand/${id}`)
    },
    async modInfo(id){
      await this.$router.push(`/sd/${id}`)
    },
    async deleteInfo(id){
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
        let infoList = result.data.requireList
        this.expendBiddingStatus(infoList)
      }
    },
    // 查询需求对应的竞价状态并补充到this.infoList
    expendBiddingStatus(list) {
      if (list) {
        let infoList = list.records
        for (let i in infoList) {
          let arrKey = Object.keys(infoList[i])
          if (arrKey.includes("biddingStatus") == false) {
            infoList[i]["biddingStatus"] = false
          }
          // 查询竞价状态
          this.$axios.BiddingController.queryBiddingStatus(infoList[i].id).then(response => {
            if (response.data.code == 20000) {
              infoList[i].biddingStatus = response.data.data.isJingjia
            }
          })
        }
        this.infoList.records = infoList
      }
    },
    // 撤销竞价
    async deleteBidding(requirementId) {
      this.$axios.BiddingController.deleteBidding(requirementId).then(response => {
        if (response.data.success) {
          this.$message({
            message: '撤销成功！',
            type: 'success'
          })
          location.reload()
        }
      })
    }
  },
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
