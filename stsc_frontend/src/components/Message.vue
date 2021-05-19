<template>
  <div class="message">

  <el-tabs v-model="activeName" @tab-click="handleClick">

    <el-tab-pane  name="first">
      <template slot="label" >通知({{indexs_inform.length}})</template>
         <!--      折叠面板-->

      <el-collapse v-model="activeNames" @change="handleChange" >
        <el-collapse-item  :name="index" v-for="(item,index) in indexs_inform" v-bind:key="index">
          <template slot="title">
          <slot name="inform_title1"></slot>
          </template>
          <slot name="inform1"></slot>
          <el-button class="delete" type="primary" @click="delete_inform1(index)" >删除</el-button>
        </el-collapse-item>


      </el-collapse>
    </el-tab-pane>

    <el-tab-pane   name="second">
      <template slot="label">
      待办({{indexs_no_manage.length}})
      </template>

      <el-collapse v-model="activeNames" @change="handleChange"   >
        <el-collapse-item  :name="index" v-for="(item,index) in indexs_no_manage" v-bind:key="index">
          <template slot="title">
            <slot name="no_manage_title"></slot>
          </template>
          <slot name="no_manage"></slot>
          <el-button class="delete" type="primary" @click="delete_no_manage(index)" >删除</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane  name="third">
      <template slot="label">
        其他({{indexs_other.length}})
      </template>

      <el-collapse v-model="activeNames" @change="handleChange" >
        <el-collapse-item  :name="index" v-for="(item,index) in indexs_other" v-bind:key="index">
          <template slot="title">
            <slot name="other_title"></slot>
          </template>
          <slot name="other"></slot>
          <el-button class="delete" type="primary" @click="delete_other(index)" >删除</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>

    <el-tab-pane  name="fourth"   disabled >
      <template slot="label" >
        <el-link slot="label_title4" type="primary"   class="delete_message">清空已读消息</el-link>
      </template>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
export default {
  props:['indexss_inform',"indexss_no_manage","indexss_other"],
  name: "Message",
  data() {
    return {
      activeName: 'first',
      activeNames: [''],
      indexs_inform:this.indexss_inform,//父组件的值
      indexs_no_manage:this.indexss_no_manage,//父组件的值
      indexs_other:this.indexss_other
    };
  },
  methods: {
    delete_inform1(val){
      this.indexs_inform.splice(val,1)
    },
    delete_no_manage(val){
      this.indexs_no_manage.splice(val,1)
    },
    delete_other(val){
      this.indexs_other.splice(val,1)
      console.log("删除成功",val)
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

<style scoped lang="scss">
.message{
  height: 500px;
  .delete_message {
    display: block;
    margin-left: 530px;
  }
  .delete{
    padding: 8px;
    font-size: 12px;
    margin-top: 20px;
  }

}

</style>