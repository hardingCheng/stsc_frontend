<template>
  <div class="message">

  <el-tabs v-model="activeName" @tab-click="handleClick">

    <el-tab-pane  name="first">
      <template slot="label">
        <slot name="label_title1"></slot>
      </template>
         <!--      折叠面板-->
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item  name="1">
          <template slot="title">
          <slot name="inform_title"></slot>
          </template>
          <slot name="inform"></slot>
          <el-button class="delete" type="primary" @click="delete_message" >删除</el-button>
        </el-collapse-item>

      </el-collapse>
    </el-tab-pane>
    <el-tab-pane   name="second">
      <template slot="label">
        <slot name="label_title2"></slot>
      </template>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item  name="1">
          <template slot="title">
            <slot name="no_manage_title"></slot>
          </template>
          <slot name="no_manage"></slot>
          <el-button class="delete" type="primary" @click="delete_message" >删除</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane  name="third">
      <template slot="label">
        <slot name="label_title3"></slot>
      </template>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item  name="1">
          <template slot="title">
            <slot name="other_title"></slot>
          </template>
          <slot name="other"></slot>
          <el-button class="delete" type="primary" @click="delete_message" >删除</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane  name="fourth"   disabled >
      <template slot="label" >
        <slot name="label_title4" ></slot>
      </template>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Message",
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

<style scoped lang="scss">
.message{
  .delete_message{
    margin-right: 100px;
    float: right;
    width: 80px;
    text-align: center;
  }
  .delete{
    padding: 8px;
    font-size: 12px;
    margin-top: 20px;
  }
  .delete_message{
    float: right;
    background: #7caced;
  }
}

</style>