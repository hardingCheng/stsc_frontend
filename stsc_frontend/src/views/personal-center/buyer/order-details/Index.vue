<template>
  <div class="order-details-index">
    <div class="order-detail-progress">
      <ul class="navs">　　　
        <li class="active">合同上传</li>　
        <li class="active">进行中</li>　
        <li >服务验收</li>　　
        <li >服务评价</li>
      </ul>
    </div>
    <div class="order-detail-progress-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style lang="scss" scoped>
.order-details-index {
  width: 100%;
  .order-detail-progress {
    width: 100%;
    .navs {
      width: 100%;
      margin:30px auto;
      display:flex;
      justify-content:space-between;
      align-items:center;
      text-align: center;
      li {
        opacity:20%;
        flex: 1;
        padding: 0 10px 0 30px;
        line-height: 40px;
        background: #1794FF;
        color: #fff;
        position: relative;
        margin-right: 10px;
        &:after {
          content: '';
          display: block;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-left: 20px solid #1794FF;
          position: absolute;
          right: -20px;
          top: 0;
          z-index: 10;
        }
        &:before {
          content: '';
          display: block;
          border-top: 20px solid #1794FF;
          border-bottom: 20px solid #1794FF;
          border-left: 20px solid #fff;
          position: absolute;
          left: 0px;
          top: 0;
        }
        &:first-child {
          border-radius: 4px 0 0 4px;
          padding-left: 25px;
        }
        &:first-child {
          border-radius: 4px 0 0 4px;
          padding-left: 25px;
        }
        &:first-child:before {
          display: none;
        }
        &.active {
          opacity:1;
        }

        &.active:after {
          opacity:1;
        }
      }
    }
    //.navs li:last-child,
    //.cssNavEnd {
    //  border-radius: 0px 4px 4px 0px;
    //  padding-right: 25px;
    //}
    //.navs li:last-child:after,
    //.cssNavEnd:after {
    //  display: none;
    //}



  }
}
</style>
