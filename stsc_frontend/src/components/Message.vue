<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="通知" name="first">
      <!--      折叠面板-->
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title=inform name="1">
          <slot name="inform"></slot>
          <el-button class="delete" type="primary" @click="delete_message" >删除</el-button>
        </el-collapse-item>

      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="待办" name="second">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title=no_manage name="1">
          <slot name="no_manage"></slot>
          <el-button class="delete" type="primary" @click="delete_message" >删除</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="其他" name="third">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title=other name="1">
          <slot name="other"></slot>
          <el-button class="delete" type="primary" @click="delete_message" >删除</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
export default {
  name: "Message",
  props:["inform","no_manage","other"],
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
.delete{
  padding: 8px;
  font-size: 12px;
  margin-top: 20px;
}
</style>