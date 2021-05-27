<template>
  <div class="my-news">
    <Message
        :indexss_inform="message_list"
        :indexss_no_read="message_list_no"
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
</template>

<script>
import { mapState, mapActions } from "vuex";
import Message from "../../../components/Message";
import MessageNotification from "../../../components/MessageNotification";
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
      activeName: 'first',
      activeNames: ['']
    };
  },

  async created() {
     await this.getMessageList()
     await this.getMessageListNoRead()
  },
  methods: {
    async getMessageList() {
      const message_result =  await  this.$axios.requirementControllerList.getMessage({
        id: this.$store.getters .getUserInfo.id,
        page: this.currentPage1,
        limit: 10,
      })
      this.message_total = message_result.data.messageList.total//获取全部消息总数
      this.message_list = message_result.data.messageList.records//获取消息列表
      this.is_read = message_result.data.messageList.records.isRead
      // console.log("消息总数",this.message_total)

    },
    async getMessageListNoRead(){
      const message_result =  await  this.$axios.requirementControllerList.lookMessageById({
        id: this.$store.getters.getUserInfo.id,
        page: this.currentPage1,
        limit: 10,
        isRead:0
      })
      this.message_list_no =message_result.data.messageList.records
      //消息总数
      this.message_list_no_total=message_result.data.count
      // console.log( "未读消息总数",this.message_list_no_total)
    },

     //删除消息
    async delete_inform1(delete_val){
      await this.$axios.requirementControllerList.deleteMessageById({
        id: delete_val
      })
    },
    //改变消息状态已读到全部
    async change_message_state(val){
      await this.$axios.requirementControllerList.changeMessageState({
        messageId:val
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange() {
      await this.getMessageList()
      },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange1() {
      await this.getMessageListNoRead()
    }
  }
}
</script>

<style lang="scss" scoped>
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
