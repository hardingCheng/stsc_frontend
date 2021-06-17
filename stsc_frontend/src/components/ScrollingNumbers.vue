<template>
  <div class="scrolling-numbers">
    <countTo :startVal='countObject.startVal' :endVal='countObject.endVal' :suffix="countObject.suffix" :duration="countObject.duration" :autoplay="countObject.autoplay"></countTo>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  props:{
    startVal:{
      type:String,
    },
    endVal:{
      type:Number,
    },
    suffix:{
      type:String,
      default:""
    }
  },
  name: "ScrollingNumbers",
  components: {
    countTo
  },
  data () {
    return {
      countObject:{
        startVal: parseInt(this.startVal), // 想开始的价值
        endVal: 0, // 达到的价值
        duration:8000,// 持续时间（毫秒）
        autoplay:true,// 自动播放时
        separator:',',//数字分隔 ，
        prefix:'',// 前缀
        suffix:this.suffix
      },
      endValTemp:0,
    }
  },
  mounted() {

  },
  watch:{
    'endVal': function () {
      this.countObject.endVal = this.endVal
      const timer = setInterval( () => {
        this.endValTemp = this.countObject.endVal
        this.countObject.endVal = 0
        setTimeout(()=>{
          this.countObject.endVal = this.endValTemp
        })
      }, 10000);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      })
    }
  }
}
</script>

<style scoped>

</style>
