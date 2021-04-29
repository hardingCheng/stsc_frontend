<template>
  <!--    服务详情-->
  <el-tabs v-model="activeName" type="card"  @tab-click="handleClick" class="serve-details-text-bottom container">
    <!-- 服务描述数据获取-->
    <el-tab-pane label="描述" name="first" class="tab"><p >{{description}}</p></el-tab-pane>
    <el-tab-pane label="成功案例" name="second" class="tab">{{ successCase }}</el-tab-pane>
    <el-tab-pane label="专业人才" name="third" class="tab">{{ professionalTalents }}</el-tab-pane>
    <el-tab-pane label="资质证明" name="fourth" class="tab" >{{ credentials }}</el-tab-pane>
    <el-tab-pane label="评价" name="fifth"  ><slot></slot></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {
      activeName: 'first',
    };
  },
  props:["des","description","successCase","professionalTalents","credentials","evaluation"],
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
}
</script>

<style scoped lang="scss">
.serve-details-text-bottom {
  width: 953px;
  margin: 20px 330px 33px auto;
  border: 1px solid #E7E7E7;
.tab{
  height: 800px;
  margin-left: 10px;
  padding-top: 5px;
}
}

</style>