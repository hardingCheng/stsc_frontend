<template>
  <div class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-top-left">
          <p>时间：周一到周五（9:00-16:30）</p>
          <p>座机：010-8329374</p>
          <p>邮箱：18611319961@163.com</p>
        </div>
        <div class="footer-top-right">
          <dl>
            <dt>关于我们</dt>
            <dd>出行管理</dd>
            <dd>服务条款</dd>
          </dl>
          <dl>
            <dt>服务体系</dt>
            <dd>业务介绍</dd>
            <dd>服务流程</dd>
          </dl>
          <dl>
            <dt>平台保障</dt>
            <dd>隐私权政策</dd>
            <dd>返回顶部</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.xuanchuanyi.com%2Fxuanchuanyi%2F20151014%2F109b01a632ce5f18e2666ec1240effed.jpg&refer=http%3A%2F%2Fimg.xuanchuanyi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621177287&t=13f71f80a8be7b9058d5e519e16ea0b4" alt="">
        <p>京ICP备2021018953号-1</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
.footer {
  width:100%;
  height: 302px;
  background: #1E2636;
  .footer-top {
    border:1px solid rgba(231, 231, 231, 0.2);
    .container {
      height: 201px;
      display:flex;
      align-items: center;
      justify-content:space-between;
      .footer-top-left {
        p{
          margin: 10px 0;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #7B859E;
        }
      }
      .footer-top-right {
        display:flex;
        align-items: center;
        justify-content:space-between;
        dl {
          margin-left:106px;
          dt {
            margin-bottom: 16px;
            font-size: 18px;
            font-family: PingFangSCRegular;
            color: #FFFFFF;
          }
          dd {
            margin-bottom: 21px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #7B859E;
          }
        }
      }
    }
  }
  .footer-bottom {
    text-align: center;
    img {
      width: 84px;
      height: 29px;
      margin: 20px 0;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #7B859E;
    }
  }
}
</style>
