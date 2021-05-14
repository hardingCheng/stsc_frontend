<template>
  <div class="my-news">
    <Message>
      <p slot="label_title1">通知(2)</p>
      <p slot="label_title2">待办(8)</p>
      <p slot="label_title3" >其他(1)</p>
      <el-link slot="label_title4" type="primary"   class="delete_message">清空已读消息</el-link>
      <div slot="inform_title1" class="inform_title"><span class="">系统通知</span><span class="data">2021-4-20</span></div>
      <div slot="inform1">您的2021400236789订单已经通过审核</div>
      <div slot="inform_title2" class="inform_title"><span class="">系统通知</span><span class="data">2021-4-25</span></div>
      <div slot="inform2">您的2021400236789订单已经通过审核</div>
      <div slot="no_manage_title" class="inform_title"><span class="">待办111</span><span class="data">2021-5-20</span></div>
      <div slot="no_manage">222222222</div>

      <div slot="other_title" class="inform_title"><span class="">其他11</span><span class="data">2021-5-20</span></div>
      <div slot="other">44444444</div>
    </Message>

  </div>
</template>

<script>
import Message from "../../../components/Message";
import MessageNotification from "../../../components/MessageNotification";
export default {
  name: "MyNews",
  components:{Message},
  data() {
    return {
      activeName: 'first',
      activeNames: ['']
    };
  },
  methods: {
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
  .delete_message {

    display: block;
    margin-left: 530px;
  }
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
