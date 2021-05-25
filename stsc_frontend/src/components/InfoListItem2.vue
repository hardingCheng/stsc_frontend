<template>
  <div class="info-list-item" v-if="info !== null">
    <div class="enterprise-top">
      <a @click="goDetail(detailurl)">
        <img :src="imageSrc" alt="">
        <div class="enterprise-name">
          <h1>{{ info.name }}</h1>
        </div>
      </a>
    </div>
    <div class="enterprise-bottom">
      <span>{{ info.keywords }}</span>
      <div class="enterprise-bottom-operation">
        <span>{{ info.company }}</span>
        <span><a @click="smallOrder">立即下单</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['info','detailurl'],
  name: "InfoListItem",
  data() {
    return {

    }
  },
  methods: {
    goDetail(url){
      this.$router.push(url)
    },
    async smallOrder(){
      this.$emit('orderImmediately',this.info.id)
    }
  },
  computed:{
    imageSrc:function (){
      if (this.info.image){
        return this.info.image
      }else {
        return 'https://z3.ax1x.com/2021/05/07/g39Qht.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-list-item {
  box-sizing: border-box;
  width:225px;
  height: 330px;
  border: 1px solid #E7E7E7;
  padding: 16px 22px;
  margin-bottom: 20px;
  margin-right: 18px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    border: 1px solid #1794FF;
  }
  .enterprise-top {
    a {
      img {
        width:100%;
        height:179px;
      }
      .enterprise-name {
        height:45px;
        margin: 14px 0;
        h1 {
          font-size: 15px;
          font-weight: 500;
          color: #111111;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 2; /** 显示的行数 **/
          overflow: hidden;  /** 隐藏超出的内容 **/
        }
      }
      cursor: pointer;
    }
  }
  .enterprise-bottom {
    span {
      display:inline-block;
      height:17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FF7C12;
    }
  }
  .enterprise-bottom-operation {
    overflow: hidden;
    height:22px;
    line-height:22px;
    span:first-child {
      width:108px;
      float: left;
      font-size: 12px;
      font-weight: 400;
      color: #666666;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 1; /** 显示的行数 **/
      overflow: hidden;  /** 隐藏超出的内容 **/
    }
    span:last-child {
      float: right;
      font-size: 16px;
      font-weight: 500;
      a {
        cursor:pointer;
        color: #1794FF;
      }
    }
  }
}
</style>
