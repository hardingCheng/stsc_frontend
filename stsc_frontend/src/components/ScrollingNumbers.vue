<template>
  <div class="scrolling-numbers">
    <countTo :startVal='countObject.startVal' :endVal='countObject.endVal' :duration='3000' :autoplay="countObject.autoplay"></countTo>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  name: "ScrollingNumbers",
  components: {
    countTo
  },
  data () {
    return {
      countObject:{
        startVal: 0, // 想开始的价值
        endVal: 2017, // 达到的价值
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
