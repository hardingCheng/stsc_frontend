<template>
  <div class="message">
    <el-tabs v-model=activeName  @tab-click="handleClick" class="tabs_message">
      <el-tab-pane name="first">
        <template slot="label">全部({{ total }})</template>
        <!--      折叠面板-->
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index" v-for="(item,index) in indexss_inform" v-bind:key="index">
            <template slot="title">
              <span style="width: 500px"> {{ item.title }}</span><span
                style="margin-left: 250px">{{ item.createTime }}</span>
            </template>
            <p>{{ item.content }}</p>
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

export default {
  // indexss_inform：通知内容
  //indexss_no_read：未读消息的内容
  //total_no_read：未读消息的总数
  props: ["indexss_inform", "indexss_no_read", "total", "total_no_read", "message_active"],
  name: "Message",
  data() {
    return {
      activeName: 'first',
      activeNames: ''
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
/deep/.el-collapse{
  min-height: 500px;
  height: auto;
}
}

</style>
