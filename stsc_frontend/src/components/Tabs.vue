<template>
  <el-tabs v-model="activeName" type="card"  @tab-click="handleClick($event)" class="serve-details-text-bottom container">
    <el-tab-pane label="描述" name="first" class="tab"  ref="dataNam"><p >{{description}}</p></el-tab-pane>
<!--    <el-tab-pane label="成功案例" name="second" ><slot name="second"></slot></el-tab-pane>-->
    <el-tab-pane label="专业人才" name="third" class="tab">{{ professionalTalents }}</el-tab-pane>
    <el-tab-pane label="附件" name="fourth" class="tab" ><slot name="fourth"></slot></el-tab-pane>
    <el-tab-pane label="评价" name="fifth"  class="tab" ><slot name="fifth"></slot></el-tab-pane>
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
  props:["des","description","successCase","professionalTalents","attachment","evaluation"],
  methods: {

    handleClick( event) {
      console.log();

    },

  },
}
</script>

<style scoped lang="scss">
.serve-details-text-bottom {
  width: 953px;
  margin: 20px 330px 33px auto;
  border: 1px solid #E7E7E7;
.tab{
  min-height: 500px;
  height:auto;
  margin-left: 10px;
  padding-top: 5px;
}
}

</style>
