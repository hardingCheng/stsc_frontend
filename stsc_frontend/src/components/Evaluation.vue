<template>
  <div class="each-evaluation clearfix">
    <div class="avatar fl">
      <div class="avatar-div">
        <img :src="imgSrc" width="30px" height="30px" class="fl">
        <span class="nickname  fl ">{{ nickName }}</span>
      </div>
    </div>
    <div class="star-div fr">
      <div class="each-star">
        <el-rate
            v-model="eachValue"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
        >
        </el-rate>
      </div>
      <div class="each-text ">{{ evaluationText }}</div>
      <div class="each-evaluation-data">{{ evaluationData }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Evaluation",
  data() {
    return {
    };
  },
  props:["imgSrc","nickName","evaluationText","evaluationData","eachValue"]
}
</script>

<style scoped lang="scss">
@import '../styles/mixin';
.each-evaluation{
  display: inline-block;
  @include wh(951px,100%);
  border-bottom: 1px solid #E7E7E7;
  .avatar{
    .avatar-div{
      display: inline-block;
      margin-left: 30px;
      margin-top: 20px;
      height: 30px;
      line-height: 30px;
      .nickname{
        display: block;
        margin-left: 5px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: #666666;

      }
    }
  }
  .star-div{
    width: 800px;
    .each-star{
      display: flex;
      margin-top: 20px;
      padding: 0;
      width: 800px;
      margin-bottom: 10px;
    }
    .each-text{
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
      padding: 5px;
      margin-bottom: 15px;
    }
  }
  .each-evaluation-data{
    height: 22px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
  }

}
</style>