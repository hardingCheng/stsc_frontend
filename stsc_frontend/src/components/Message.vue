<template>
  <div class="message">
    <el-tabs v-model=activeName  @tab-click="handleClick" class="tabs_message">
      <el-tab-pane name="first">
        <template slot="label">全部({{ total }})</template>
        <!--      折叠面板-->
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index" v-for="(item,index) in tem_indexss_inform" v-bind:key="index">
            <template slot="title">
              <span style="width: 500px"> {{ item.title }}</span><span
                style="margin-left: 250px">{{ item.createTime }}</span>
            </template>
            <p>{{ item.content }}</p>
            <div v-if="(item.title==messageType1 || item.title == messageType2) && item.isJingjia == true">
              <el-button class = "delete" type="primary" @click="acceptBidding(index,item.id)">接受竞价</el-button>
              <el-button class = "delete" type="primary" @click="refuseBidding(index,item.id)">拒绝竞价</el-button>
            </div>
              <el-button class="delete" type="primary" @click="delete_inform1(index,item.id)">删除</el-button>
          </el-collapse-item>
        </el-collapse>
        <slot name="page_1"></slot>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template slot="label">
          未读({{ total_no_read }})
        </template>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index" v-for="(item,index) in indexss_no_read" v-bind:key="index">
            <template slot="title">
              <span style="width: 500px"> {{ item.title }}</span><span
                style="margin-left: 250px">{{ item.createTime }}</span>
              <slot name="no_manage_title"></slot>
            </template>
            <p>{{ item.content }}</p>
            <div v-if="(item.title==messageType1 || item.title == messageType2)">
              <el-button class = "delete" type="primary" @click="acceptBidding(index,item.id)">接受竞价</el-button>
              <el-button class = "delete" type="primary" @click="refuseBidding(index,item.id)">拒绝竞价</el-button>
            </div>
              <el-button class="delete" type="primary" @click="have_manage(index,item.id)">标记已读</el-button>
          </el-collapse-item>
        </el-collapse>
        <slot name="page_2"></slot>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import store from '../store/index.js';
import Axios from "axios";
export default {
  // indexss_inform：通知内容
  //indexss_no_read：未读消息的内容
  //total_no_read：未读消息的总数
  props: ["indexss_inform", "indexss_no_read", "total", "total_no_read", "message_active"],
  name: "Message",
  data() {
    return {
      activeName: 'first',
      activeNames: '',
      messageType1:'消息提醒：竞价进展',
      messageType2:'竞价消息提醒：有甲方选择了您的服务',
      tem_indexss_inform:this.indexss_inform,
      // tem_indexss_no_read:this.indexss_no_read
    };
  },
  created() {
    if(this.$store.state.activeName==null){
      this.activeName='second'
    }else if(this.$store.state.activeName==='second') {
      this.activeName='second'
    }else {
      this.activeName='second'
    }
    this.searchBiddingStatus()
    },
  methods: {
    delete_message(val) {
      this.indexss_no_read.splice(val, this.indexss_no_read.length)
    },
    //删除一条消息
    async delete_inform1(val, delete_val) {
      //val:传过来的消息的索引
      //delete_val:消息的id
      this.$parent.delete_inform1(delete_val);//调用父组件的方法
      //删除后折叠面板对应索引的折叠面板消失
      this.indexss_inform.splice(val, 1)
      this.indexss_no_read.splice(val, 1)
    },
    async acceptBidding(val,delete_val)//接受竞价
    {
      this.$parent.acceptBidding(val);
      this.have_manage(val,delete_val);
    },
    async refuseBidding(val,delete_val)//拒绝竞价
    {
      this.$parent.refuseBidding(val);
      this.have_manage(val,delete_val);
    },

    async searchBiddingStatus()//查询竞价状态
    {

      console.log(this.tem_indexss_inform)
      for(var i=0;i<this.tem_indexss_inform.length;++i)
      {
        let arrKey = Object.keys(this.tem_indexss_inform[i])
        // console.log(arrKey)
        if(arrKey.includes("isJingjia")==false)
          this.tem_indexss_inform[i]["isJingjia"]=false

        // console.log(this.tem_indexss_inform)
        let tem_status=false;
        let data = "requirementId="+this.tem_indexss_inform[i].id;
        Axios({
          url:`/ph/stcsp/Jingjia/isJingjia`,
          method:'post',
          data,
          headers:{token:store.state.token}
        }).then(response => {
          console.log(response)
          if(response.data.code == 20000)
            tem_status = response.data.data.isJingjia;
          else
            tem_status = false;
        });
        this.tem_indexss_inform[i].isJingjia = tem_status;


        // var result = await this.$axios.BiddingController.searchBiddingStatus({
        //   requirmentId:this.tem_indexss_inform[i].id
        // })
        // console.log(result)

      }
      console.log(this.tem_indexss_inform)
      //
      // for(var i=0;i<this.tem_indexss_no_read.length;++i)
      // {
      //   // console.log(i)
      //   // var tem_status = false;
      //   console.log(this.tem_indexss_no_read)
      //   var result = await this.$axios.BiddingController.searchBiddingStatus({
      //     requirmentId:this.tem_indexss_no_read[i].id
      //   });
      //   console.log("result:",result);
      //   if(result.code == 20000)
      //     this.tem_indexss_no_read[i].isJingjia = result.data.isJingjia;
      //     // this.tem_indexss_no_read[i].isJingjia = 1;
      //   else
      //     this.tem_indexss_no_read[i].isJingjia = false;
      // }
      // console.log(this.tem_indexss_no_read);
    },

    //改变消息状态，未读变已读
    async have_manage(val, delete_val) {
      //调用父组件改变消息的方法
      this.$parent.change_message_state(delete_val);
      //已读后折叠面板消息减一
      this.indexss_no_read.splice(val, 1)
    },


    handleClick(tab, event) {
    },
    async handleChange(val) {
      console.log('点击的第几个折叠面板 ', val);
    }
  }
}
</script>

<style scoped lang="scss">
.message {
  .tabs_message{
    min-height: 500px;
  }
  .delete_message {
    display: block;
    margin-left: 625px;
  }

  .delete {
    padding: 8px;
    font-size: 12px;
    margin-top: 20px;
  }
::v-deep.el-collapse{
  min-height: 500px;
  height: auto;
}
}

</style>
