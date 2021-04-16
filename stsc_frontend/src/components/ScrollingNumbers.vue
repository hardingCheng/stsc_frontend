<template>
  <div class="scrolling-numbers">
    <countTo :startVal='countObject.startVal' :endVal='countObject.endVal' :duration='3000' :autoplay="countObject.autoplay"></countTo>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  props:['startVal','endVal'],
  name: "ScrollingNumbers",
  components: {
    countTo
  },
  data () {
    return {
      countObject:{
        startVal: parseInt(this.startVal), // 想开始的价值
        endVal: parseInt(this.endVal), // 达到的价值
        duration:3000,// 持续时间（毫秒）
        autoplay:true,// 自动播放时
        separator:',',//数字分隔 ，
        prefix:'',// 前缀
        suffix:''// 后缀
      }
    }
  }
}
</script>

<style scoped>

</style>
