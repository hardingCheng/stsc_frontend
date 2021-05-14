<template>
<div class="dialog">

  <el-dialog
      :title=hint
      :visible="dialogVisible"
      width="30%"
      :before-close="handleClose"
     >
    <slot name="content" ></slot>

    <span slot="footer" class="dialog-footer">
    <slot name="btn1"></slot>
    <slot name="btn2"></slot>

  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "Dialog",
  props:["hint","dialogValue"],
  data() {
    return {
      dialogVisible: false
    };
  },
  created() {
    this.$on('open', function(){
      this.dialogVisible = true
    });
    this.$on('close', function(){
      this.dialogVisible = false
    });
  },
  methods: {

    handleClose() {
      this.dialogVisible = false
  }
}
}
</script>

<style scoped lang="scss">
.dialog{

}
</style>