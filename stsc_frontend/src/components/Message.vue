<template>
  <div class="message">

    <el-tabs v-model="this.$store.state.activeName" @tab-click="handleClick">
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
            <el-button class="delete" type="primary" @click="have_manage(index,item.id)">已读</el-button>
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
  // indexss_inform通知内容
  // indexss_no_manage待办内容
  props: ["indexss_inform", "indexss_no_read","total","total_no_read","message_active"],
  name: "Message",
  data() {
    return {
       activeName: 'first',
      activeNames: [''],
    };
  },
  methods: {
    delete_message(val) {
      this.indexss_no_read.splice(val, this.indexss_no_read.length)
    },
    //删除一条消息
    async delete_inform1(val, delete_val) {
      this.$parent.delete_inform1(delete_val);//调用父组件的方法
      this.indexss_inform.splice(val, 1)
      this.indexss_no_read.splice(val, 1)
    },
    //改变消息状态
    async have_manage(val, delete_val) {
      this.$parent.change_message_state(delete_val);
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
  .delete_message {
    display: block;
    margin-left: 625px;
  }

  .delete {
    padding: 8px;
    font-size: 12px;
    margin-top: 20px;
  }

}

</style>
