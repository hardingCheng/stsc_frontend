<template>
  <div class="my-news">
    <Message
    :indexss_inform="['','']"
    :indexss_no_manage="['','']"
    :indexss_other="['','','']"

    >
      <div slot="inform_title1" class="inform_title"><span class="">系统通知</span><span class="data">2021-4-20</span></div>
      <div slot="inform1">您的2021400236789订单已经通过审核</div>

      <div slot="no_manage_title" class="inform_title"><span class="">待办111</span><span class="data">2021-5-20</span></div>
      <div slot="no_manage">222222222</div>

      <div slot="other_title" class="inform_title"><span class="">其他11</span><span class="data">2021-5-20</span></div>
      <div slot="other">44444444</div>
    </Message>
  </div>
</template>

<script>
import Message from "../../../components/Message";
export default {
  name: "MyNews",
  components:{Message}
}
</script>

<style scoped lang="scss">
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
