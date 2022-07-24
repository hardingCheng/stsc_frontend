<template>
  <div class="my-news" v-if="message_total>0">
    <Message
        :indexss_inform=message_list
        :indexss_no_read=this.message_list_no
        :total="message_total"
        :total_no_read="message_list_no_total"
    >
      <div slot="page_1" class="common-pagination container">
        <div class="pagination">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="15"
              layout="total, prev, pager, next"
              :total="message_total">
          </el-pagination>
        </div>
      </div>
      <div slot="page_2" class="common-pagination container">
        <div class="pagination">
          <el-pagination
              background
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page.sync="currentPage2"
              :page-size="15"
              layout="total, prev, pager, next"
              :total="message_list_no_total">
          </el-pagination>
        </div>
      </div>
    </Message>

  </div>
  <div class="public-order-info-null" v-else>
    当前暂无数据，请刷新重试。
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Message from "../../../components/Message";
import MessageNotification from "../../../components/MessageNotification";
import axios from "@/api/api";
export default {
props:['id'],
  name: "MyNews",
  components:{Message},
  data() {
    return {
      currentPage1: 1,
      currentPage2: 1,
      message_list_have:[],//存放已读消息
      message_list:[],//存放消息列表
      message_total:0,//获取消息总数
      message_list_no:[],//存放未读消息
      message_list_no_total:0,//存放未读消息总数
      is_read:1,//消息已读未读
      isAccept:0,//是否接受竞价
      activeName: 'first',
      activeNames: ['']
    };
  },

  async created() {
      //获取消息
     await this.getMessageList()
      //获取未读消息
     await this.getMessageListNoRead()
  },
  methods: {
        //获取全部消息的方法
      async getMessageList() {

      const message_result =  await  this.$axios.requirementControllerList.getMessage({
        userId: this.$store.getters .getUserInfo.id,
        page: this.currentPage1,
        limit: 10,
      })
      this.message_total = message_result.data.messageList.total//获取全部消息总数
      this.message_list = message_result.data.messageList.records//获取消息列表
      this.is_read = message_result.data.messageList.records.isRead//获取消息的状态，已读或者未读
        console.log(message_result.data)
        console.log(this.$store.getters .getUserInfo)
    },
    //获取未读消息的方法
    async getMessageListNoRead(){
      const message_result =  await this.$axios.requirementControllerList.lookMessageById({
        userId: this.$store.getters.getUserInfo.id,
        page: this.currentPage2,
        limit: 10,
        isRead:0
      })
      this.message_list_no =message_result.data.messageList.records//未读消息列表
      this.message_list_no_total=message_result.data.messageList.total//未读消息总数
    },
     //删除消息的方法
    async delete_inform1(delete_val){
      await this.$axios.requirementControllerList.deleteMessageById({
        id: delete_val
      })
      await this.getMessageList()
    },
    async acceptBidding(id)
    {
      console.log("buyer accept",id);
      var JingjiaId = this.message_list[id].content.split(';')[1];
      // console.log(JingjiaId);
      var result = await this.$axios.BiddingController.jiatongyi({
        JingjiaId: JingjiaId
      });
      // console.log(result)

    },

    async refuseBidding(id)
    {
      console.log("buyer refuse",id);
      var JingjiaId = this.message_list[id].content.split(';')[1];
      // console.log(JingjiaId)
      var result = await this.$axios.BiddingController.jiajujue({
        JingjiaId: JingjiaId
      });
      // console.log(result)

    },

    //改变消息状态已读到全部
    async change_message_state(val){

      var result = await this.$axios.requirementControllerList.changeMessageState({
        messageId:val
      })
      console.log(result)
      await this.getMessageListNoRead()
      await this.getVuexBuyerMessage()
    },
    getVuexBuyerMessage(){
      this.$store.commit("modBuyerMessage", {
            buyerMessage:this.message_list_no_total
          }
      )
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange() {
      await this.getMessageList()
      },
    handleSizeChange1(val) {
      // console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange1() {
      await this.getMessageListNoRead()
    }
  }
}
</script>

<style lang="scss" scoped>
.public-order-info-null {
  height:500px;
}
.my-news {
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
  width:100%;
  .delete{
    padding: 8px;
    font-size: 12px;
    margin-top: 20px;
  }
  .inform_title{
    width: 100%;
    .data{
      float: right;
      margin-right: 100px;
    }
  }

}
</style>
