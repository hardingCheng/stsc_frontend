<template>
  <div class="error-404">
    <div class="stsc_404 container">
      <img src="../assets/images/404.png">
      <h2>抱歉，您访问的页面出错了!</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <a @click="toIndex" class="btn btn-primary btn_blue">返回主页</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "404Page",
  data() {
    return {
      
    }
  },
  methods:{
    toIndex(){
      this.$router.push('/index')
    }
  }
};
</script>

<style scoped lang="scss">
.error-404 {
  .container {
    width: 1260px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .stsc_404 {
    padding-top: 180px;
    padding-bottom: 112px;
    img {
      display: block;
      margin: auto;
    }
    h2 {
      font-size: 32px;
      color: #333333;
      text-align: center;
      letter-spacing: 5px;
      padding-top: 33px;
      padding-bottom: 25px;
    }
    p {
      font-size: 14px;
      color: #666666;
      letter-spacing: 1px;
      text-align: center;
      padding-bottom: 35px;
    }
    a {
      display: block;
      margin: 0 auto;
      width: 220px;
      height: 56px;
    }
    .btn {
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px
    }
    .btn-primary {
      color: #fff;
      background-color: #337ab7;
      border-color: #2e6da4
    }
    .btn_blue {
      height: 56px;
      line-height: 56px;
      text-align: center;
      border-radius: 3px;
      background: #7caced;
      color: #fff;
      letter-spacing: 5px;
      border: 0;
      font-size: 18px;
      padding: 0;
      text-decoration: none;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
      -webkit-transition-property: background;
      transition-property: background
    }
  }
}
</style>
