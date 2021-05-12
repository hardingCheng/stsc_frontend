<template>
  <div class="my-order">
    <div class="public-order-info">
      <div class="public-order-info-item">
        <div class="public-order-info-item-top">
          <ul class="public-order-info-item-top-detail">
            <li>2021年03月19日</li>
            <li>订单号：<span>202103190038473543</span></li>
            <li>服务商：<span>五福上平台</span></li>
          </ul>
        </div>
        <div class="public-order-info-item-bottom">
          <div class="info-image">
            <img src="http://n.sinaimg.cn/photo/34/w1089h545/20210416/4bde-knvsnuf5803625.jpg" alt="">
          </div>
          <div class="info-detail">
            <h2>服务标题服务标题服务标题服务标题服务标题服服务标题服务标题服务标题服务标题服务标题</h2>
            <p>服务标题服务标题服务标题服务标题服务标题服服务标题服务标题服务标题服务标题服务标题</p>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
          </div>
          <div class="info-price">
            <span>￥19305.56</span>
          </div>
          <div class="info-menu">
            <ul>
              <li>订单详情</li>
              <li>查看进度</li>
              <li>查看合同</li>
              <li>卖家信息</li>
            </ul>
          </div>
          <div class="info-evaluate">
           <span>评价</span>
          </div>
        </div>
      </div>
      <div class="public-order-info-item">
        <div class="public-order-info-item-top">
          <ul class="public-order-info-item-top-detail">
            <li>2021年03月19日</li>
            <li>订单号：<span>202103190038473543</span></li>
            <li>服务商：<span>五福上平台</span></li>
          </ul>
        </div>
        <div class="public-order-info-item-bottom">
          <div class="info-image">
            <img src="http://n.sinaimg.cn/photo/34/w1089h545/20210416/4bde-knvsnuf5803625.jpg" alt="">
          </div>
          <div class="info-detail">
            <h2>服务标题服务标题服务标题服务标题服务标题服服务标题服务标题服务标题服务标题服务标题</h2>
            <p>服务标题服务标题服务标题服务标题服务标题服服务标题服务标题服务标题服务标题服务标题</p>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
          </div>
          <div class="info-price">
            <span>￥19305.56</span>
          </div>
          <div class="info-menu">
            <ul>
              <li>订单详情</li>
              <li>查看进度</li>
              <li>查看合同</li>
              <li>卖家信息</li>
            </ul>
          </div>
          <div class="info-evaluate">
            <span>评价</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder"
}
</script>

<style lang="scss" scoped>
.my-order {
  width:100%;
  .public-order-info {
    .public-order-info-item {
      height:240px;
      margin-bottom: 20px;
      border: 1px solid #E7E7E7;
      .public-order-info-item-top {
        height:48px;
        line-height: 48px;
        background: #FAFAFA;
        border-bottom: 1px solid #E7E7E7;
        .public-order-info-item-top-detail {
          box-sizing: border-box;
          display:flex;
          justify-content:space-between;
          align-items: center;
          padding:0 40px;
          li {
            font-size: 16px;
            font-weight: 400;
            color: #111111;
          }
        }
      }
      .public-order-info-item-bottom {
        box-sizing: border-box;
        padding:12px 0 12px 20px;
        height:192px;
        display:flex;
        text-align: center;
        .info-image {
          height:100%;
          width: 168px;
          img {
            height:100%;
            width: 168px;
          }
        }
        .info-detail {
          flex: 4;
          margin-left:20px;
          text-align: left;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 2; /** 显示的行数 **/
          overflow: hidden;  /** 隐藏超出的内容 **/
          h2{
            margin-bottom: 25px;
            font-size: 16px;
            font-weight: 400;
            color: #111111;
          }
          p {
            margin-bottom: 25px;
            font-size: 14px;
            font-weight: 400;
            color: #999999;
          }
          /deep/ .el-tag {
            margin-right: 15px;
          }
        }
        .info-price {
          flex: 1;
          color: #FF3617;
        }
        .info-menu {
          flex: 1;
          height:100%;
          position:relative;
          ul {
            height:100%;
            display:flex;
            flex-direction: column;
            justify-content:space-around;
            align-items: center;
          }
          &:after {
            content:"";
            height:192px;
            width:1px;
            background:#E7E7E7;
            position:absolute;
            top: -12px;
            right:0;
          }
        }
        .info-evaluate {
          flex: 1;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #1794FF;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
