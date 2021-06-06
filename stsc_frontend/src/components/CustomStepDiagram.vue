<!-- Step.vue  -->
<template>
  <div class="stepOut">
    <ul>
      <li class="stepItem" v-for="(stepItem, index) in stepInfo.list" :key="index">
        <div class="stepImg"  v-show="index!==stepInfo.list.length-1">
          <img src="../assets/images/11.jpg" alt="">
        </div>
        <div :class="stepInfo.step >= index+1 ? 'icon active':'icon'">
          {{index+1}}
        </div>
        <div :class="stepInfo.step >= index+2 ? 'line lineActive':'line'" v-show="index!==stepInfo.list.length-1"></div>
        <p class="stepStatus">{{stepItem.status}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'steps',
  props: {
    // 传递步骤参数
    stepInfo: {
      type: Object,
      default: function () {
        return {
          list: [],
          step: 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.stepOut {
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    justify-content: flex-start;
    .stepItem {
      width: 260px;
      height: 70px;
      font-size: 16px;
      text-align: center;
      position: relative;
      .stepImg {
        position: absolute;
        top: -100px;
        left: 200px;
        width: 100px;
        height: 100px;
        img {
          width:100%;
          height:100%;
        }
      }
      .icon {
        text-align: center;
        line-height: 25px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(226, 226, 226, 1);
        margin: 0 auto;
        position: relative;
        z-index: 888;
      }
      .active {
        color: white;
        background-color: green;
      }
      .line {
        position: absolute;
        top: 12px;
        left: 50%;
        border-bottom: 1px dashed rgba(3, 2, 2, 0.7);
        width: 260px;
        z-index: 111;
      }
      .lineActive {
        border-bottom: 1px solid green;
      }
      .stepStatus {
        color: rgba(87, 87, 87, 1);
        margin-top: 10px;
        line-height: 36px;
      }
      .statusTime {
        color: rgba(87, 87, 87, 1);
        opacity: 0.5;
      }
    }
  }
}
</style>

