<template>
  <div class="my-news">
    <Message
        :indexss_inform=this.message_list_all
        :indexss_no_read=this.message_list_no
    >
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
      message_list_no:[],//存放未读消息
      message_list_have:[],//存放已读消息
      message_list:[],//存放消息列表
      message_list_all:[],
      message_total:0,//获取消息总数
      is_read:1,//消息已读未读
      activeName: 'first',
      activeNames: ['']
    };
  },

  async mounted() {
     await this.getMessageList()
     await this.deleteMessageById()
  },
  methods: {
    async getMessageList() {
      const message_result =  await  this.$axios.requirementControllerList.getMessage({
        id: this.$store.getters.getUserInfo.id,
        page: 1,
        limit: 4,
      })
      this.message_total = message_result.data.count//获取消息总数
      this.message_list = message_result.data.messageList.records//获取消息列表
      this.is_read = message_result.data.messageList.records.isRead
      let i = 0, j = 0, n = 0, k = 0
      while (this.message_list[i]) {
        this.message_list_all[k++] = this.message_list[i]
        if (!this.message_list[i].isRead) {
          this.message_list_no[j++] = this.message_list[i]
          console.log('if', this.message_list_no[0])
        } else {
          this.message_list_have[n++] = this.message_list[i]
          console.log('else', this.message_list_have)
        }
        i++
      }
      console.log("是否有读", this.message_list_no[0])
      console.log(message_result.data)
      console.log(this.message_total)
      console.log("消息列表", this.message_list)
      console.log('111', this.message_list_no)
    },
    async deleteMessageById(){
      for (let i=0;i<this.message_list.length;i++){
      const messageById_result =  await  this.$axios.requirementControllerList.deleteMessageById({
        id: this.message_list[i].id,
      })
        console.log("122212",this.message_list[i].id)
      }

    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style lang="scss" scoped>
.my-news {
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
