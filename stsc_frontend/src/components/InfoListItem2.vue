<template>
  <div class="info-list-item" v-if="info !== null">
    <div class="enterprise-top">
      <a @click="goDetail(detailurl)">
        <img v-lazy="imageSrc" alt="">
      </a>
    </div>
    <div class="enterprise-bottom">
      <div class="enterprise-name">
        <a @click="goDetail(detailurl)">
          <h1>{{ info.name }}</h1>
        </a>
      </div>
      <div class="enterprise-bottom-keywords">{{ info.keywords }}</div>
      <div class="enterprise-bottom-operation">
        <span>{{ info.company }}</span>
        <span v-if="listtype === 0"><a @click="requireImmediately">立即抢单</a></span>
        <span v-if="listtype === 1"><a @click="orderImmediately">立即下单</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['info','detailurl','listtype'],
  name: "InfoListItem",
  data() {
    return {}
  },
  methods: {
    goDetail(url){
      this.$router.push(url)
    },
    async orderImmediately(){
      this.$emit('orderImmediately',this.info.id)
    },
    async requireImmediately(){
      this.$emit('requireImmediately',this.info.id)
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
      cursor: pointer;
    }
  }
  .enterprise-bottom {
    height:calc(100% - 190px);
    padding: 0 20px 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .enterprise-name {
      height:45px;
      margin: 10px 0 0 0;
      cursor:pointer;
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
    .enterprise-bottom-keywords {
      display:inline-block;
      height:17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FF7C12;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 1; /** 显示的行数 **/
      overflow: hidden;  /** 隐藏超出的内容 **/
    }
    .enterprise-bottom-operation {
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
}
</style>
