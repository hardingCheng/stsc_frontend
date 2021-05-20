<template>
  <div class="message">

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane name="first">
        <template slot="label">全部({{ indexs_inform.length }})</template>
        <!--      折叠面板-->

        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index" v-for="(item,index) in indexs_inform" v-bind:key="index">
            <template slot="title">
              <span style="width: 500px"> {{ item.title }}</span><span
                style="margin-left: 250px">{{ item.createTime }}</span>
            </template>
            <p>{{ item.content }}</p>
            <el-button class="delete" type="primary" @click="delete_inform1(index)">删除</el-button>
          </el-collapse-item>


        </el-collapse>
      </el-tab-pane>

      <el-tab-pane name="second">
        <template slot="label">
          未读({{ no_read.length }})
        </template>

        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="index" v-for="(item,index) in no_read" v-bind:key="index">
            <template slot="title">
              <span style="width: 500px"> {{ item.title }}</span><span
                style="margin-left: 250px">{{ item.createTime }}</span>
              <slot name="no_manage_title"></slot>
            </template>
            <p>{{ item.content }}</p>
            <el-button class="delete" type="primary" @click="delete_no_manage(index)">删除</el-button>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <el-tab-pane name="fourth" disabled>
        <template slot="label">
          <el-link slot="label_title4" type="primary" class="delete_message" @click="delete_message()">清空已读消息</el-link>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  // indexss_inform通知内容
  // indexss_no_manage待办内容
  props: ["indexss_inform", "indexss_no_read",],
  name: "Message",
  data() {
    return {
      activeName: 'first',
      activeNames: [''],
      indexs_inform: this.indexss_inform,//父组件的值
      no_read: this.indexss_no_read,//父组件的值
    };
  },
  methods: {
    delete_message(val) {
      this.no_read.splice(val, this.no_read.length)
      this.indexs_inform.splice(val, this.indexs_inform.length)
    },
    delete_inform1(val) {

      this.indexs_inform.splice(val, 1)
      this.no_read.splice(val, 1)
    },
    delete_no_manage(val) {
      this.no_read.splice(val, 1)
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log('点击的第几个折叠面板 ', val);
    }
  }
}
</script>

<style scoped lang="scss">
.message {
  height: 500px;

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