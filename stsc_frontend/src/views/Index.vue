<template>
  <div class="index">
    <div class="swiper-main">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
      </swiper>
    </div>
    <div class="main-wapper">
      <div class="data-presentation">
        <div class="container">
          <el-row type="flex" class="row-bg" justify="space-between" align="middle">
            <el-col :span="5">
              <div class="data-presentation-item">
                <div class="data-presentation-item-title">需求数量</div>
                <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="430"></scrolling-numbers>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="data-presentation-item">
                <div class="data-presentation-item-title">需求数量</div>
                <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="666"></scrolling-numbers>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="data-presentation-item">
                <div class="data-presentation-item-title">服务数量</div>
                <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="190"></scrolling-numbers>
              </div>
            </el-col >
            <el-col :span="5">
              <div class="data-presentation-item">
                <div class="data-presentation-item-title">订单数量</div>
                <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="280"></scrolling-numbers>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="data-presentation-item">
                <div class="data-presentation-item-title">数据数量</div>
                <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="1000000"></scrolling-numbers>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="popular-recommendation">
        <div class="container">
          <div class="popular-recommendation-main">
            <div class="popular-recommendation-main-top clearfix">
              <div class="title fl">热门推荐</div>
              <div class="nav fr">
                <span>服务</span>
                <span>需求</span>
                <span> > </span>
              </div>
            </div>
            <div class="popular-recommendation-main-bottom">
              <swiper class="swiper" :options="swiperOption2">
                <swiper-slide>
                  <div class="popular-recommendation-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="../assets/images/moju.png" class="image">
                      <div style="padding: 14px;">
                        <h2>汽车摩擦片级进模具开发进…</h2>
                        <p>发布者：渭河精密传动有限公司</p>
                        <p>类别：设计服务>工业设计>模具</p>
                        <p>时间：2021年1月29日</p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="popular-recommendation-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="../assets/images/moju.png" class="image">
                      <div style="padding: 14px;">
                        <h2>汽车摩擦片级进模具开发进…</h2>
                        <p>发布者：渭河精密传动有限公司</p>
                        <p>类别：设计服务>工业设计>模具</p>
                        <p>时间：2021年1月29日</p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="popular-recommendation-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="../assets/images/moju.png" class="image">
                      <div style="padding: 14px;">
                        <h2>汽车摩擦片级进模具开发进…</h2>
                        <p>发布者：渭河精密传动有限公司</p>
                        <p>类别：设计服务>工业设计>模具</p>
                        <p>时间：2021年1月29日</p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="popular-recommendation-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="../assets/images/moju.png" class="image">
                      <div style="padding: 14px;">
                        <h2>汽车摩擦片级进模具开发进…</h2>
                        <p>发布者：渭河精密传动有限公司</p>
                        <p>类别：设计服务>工业设计>模具</p>
                        <p>时间：2021年1月29日</p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
      <div class="success-resources clearfix">
        <div class="container">
          <div class="successful-cases fl">
            <div class="successful-cases-main">
              <div class="successful-cases-main-top clearfix">
                <div class="title fl">成功案例</div>
                <div class="nav fr">
                  <span> > </span>
                </div>
              </div>
              <div class="successful-cases-main-bottom">
                <swiper class="swiper" :options="swiperOption3">
                  <swiper-slide>
                    <div class="successful-cases-main-item">
                      <el-card shadow="never" :body-style="{ padding: '0px' }">
                        <img src="../assets/images/moju.png" class="image">
                        <div style="padding: 14px;">
                          <h2>汽车摩擦片级进模具开发进…</h2>
                          <p>发布者：渭河精密传动有限公司</p>
                          <p>类别：设计服务>工业设计>模具</p>
                          <p>时间：2021年1月29日</p>
                        </div>
                      </el-card>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="successful-cases-main-item">
                      <el-card shadow="never" :body-style="{ padding: '0px' }">
                        <img src="../assets/images/moju.png" class="image">
                        <div style="padding: 14px;">
                          <h2>汽车摩擦片级进模具开发进…</h2>
                          <p>发布者：渭河精密传动有限公司</p>
                          <p>类别：设计服务>工业设计>模具</p>
                          <p>时间：2021年1月29日</p>
                        </div>
                      </el-card>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="successful-cases-main-item">
                      <el-card shadow="never" :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;">
                          <h2>汽车摩擦片级进模具开发进…</h2>
                          <p>发布者：渭河精密传动有限公司</p>
                          <p>类别：设计服务>工业设计>模具</p>
                          <p>时间：2021年1月29日</p>
                        </div>
                      </el-card>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="successful-cases-main-item">
                      <el-card shadow="never" :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;">
                          <h2>汽车摩擦片级进模具开发进…</h2>
                          <p>发布者：渭河精密传动有限公司</p>
                          <p>类别：设计服务>工业设计>模具</p>
                          <p>时间：2021年1月29日</p>
                        </div>
                      </el-card>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
          <div class="resource-service-space fr">
            <div class="resource-service-space-main">
              <div class="resource-service-space-top clearfix">
                <div class="title fl">资源服务空间</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="platform-news">
        <div class="container">
          <div class="platform-news-main">
            <div class="platform-news-main-top clearfix">
              <div class="title fl">平台动态</div>
              <div class="nav fr">
                <span> > </span>
              </div>
            </div>
            <div class="platform-news-main-bottom">
              <swiper class="swiper" :options="swiperOption4">
                <swiper-slide>
                  <div class="platform-news-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="../assets/images/matthew-guay-148464.png" class="image">
                      <div style="padding: 14px;">
                        <h2>内容服务“太白山地质地貌研究学问在”</h2>
                        <p>2021-4-12 12:12</p>
                        <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来说过于无欲无求了，不太适…</p>
                        <p>更多></p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="platform-news-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="../assets/images/matthew-guay-148463.png" class="image" alt=""/>
                      <div style="padding: 14px;">
                        <h2>内容服务“太白山地质地貌研究学问在”</h2>
                        <p>2021-4-12 12:12</p>
                        <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来说过于无欲无求了，不太适…</p>
                        <p>更多></p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="platform-news-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="../assets/images/matthew-guay-148465.png" class="image" alt="">
                      <div style="padding: 14px;">
                        <h2>内容服务“太白山地质地貌研究学问在”</h2>
                        <p>2021-4-12 12:12</p>
                        <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来说过于无欲无求了，不太适…</p>
                        <p>更多></p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="platform-news-main-item">
                    <el-card shadow="never" :body-style="{ padding: '0px' }">
                      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                      <div style="padding: 14px;">
                        <h2>内容服务“太白山地质地貌研究学问在”</h2>
                        <p>2021-4-12 12:12</p>
                        <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来说过于无欲无求了，不太适…</p>
                        <p>更多></p>
                      </div>
                    </el-card>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
      <div class="cooperative-partner">
        <div class="container">
          <div class="cooperative-partner-top">
            <div class="cooperative-partner-top-title">合作伙伴</div>
          </div>
          <div class="cooperative-partner-bottom">
            <ul class="cooperative-partner-ul">
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>

              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>

              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
              <li><img src="../assets/shanghai.png" alt=""></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollingNumbers from "../components/ScrollingNumbers";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: "Index",
  data() {
    return {
      swiperOption: {
        speed: 1000,//切换速度
        spaceBetween: 30,
        centeredSlides: true,
        loop:true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      swiperOption2: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      swiperOption3: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      swiperOption4: {
        slidesPerView: 3,
        spaceBetween: 20,
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollingNumbers
  }
};
</script>

<style scoped lang="scss">
.index{
  .swiper-main {
    position:relative;
    top: -70px;
    z-index:-20;
    .swiper {
      img {
        height: 420px;
        width: 100%;
      }
    }
  }
  .main-wapper {
    background: #F4F4F4;
    .data-presentation {
      margin-top: -70px;
      height: 130px;
      background: #F8F8F8;
      .container {
        .data-presentation-item {
          text-align: center;
          .data-presentation-item-title {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 25px;
            margin-top: 20px;
          }
          /deep/ .scrolling-numbers {
            margin-top: 10px;
            span {
              font-size: 26px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #1794FF;
            }
          }
        }
      }
    }
    .popular-recommendation {
      height: 514px;
      margin-top: 20px;
      .popular-recommendation-main{
        box-sizing: border-box;
        height: 514px;
        padding:26px 20px;
        background: #FFF;
        .popular-recommendation-main-top {
          .title {
            width: 96px;
            height: 33px;
            font-size: 24px;
            font-weight: 500;
            color: #333333;
            line-height: 33px;
          }
          .nav span {
            margin-left:40px;
            margin-top: 14px;
            width: 32px;
            height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 22px;
            cursor: pointer;
            &:hover {
              color: #1794FF;
            }
          }
        }
        .popular-recommendation-main-bottom {
          margin:10px 0;
          .popular-recommendation-main-item {
            margin: 20px 0;
            height:386px;
            width:270px;
            .image {
              width:100%;
              display: block;
            }
            h2 {
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
            }
            p{
              margin: 10px 0;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
            /deep/ .el-card {
              height:400px;
              width:270px;
            }

          }
        }
      }
    }
    .successful-cases {
      height: 514px;
      width: 610px;
      margin-top: 20px;
      .successful-cases-main{
        box-sizing: border-box;
        height: 514px;
        padding:26px 20px;
        background: #FFF;
        .successful-cases-main-top {
          .title {
            width: 96px;
            height: 33px;
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 33px;
          }
          .nav span {
            margin-left:40px;
            margin-top: 14px;
            width: 32px;
            height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 22px;
            cursor: pointer;
            &:hover {
              color: #1794FF;
            }
          }
        }
        .successful-cases-main-bottom {
          margin:10px 0;
          .successful-cases-main-item {
            margin: 20px 0;
            height:386px;
            width:270px;
            .image {
              width:100%;
              display: block;
            }
            h2 {
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
            }
            p{
              margin: 10px 0;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
            /deep/ .el-card {
              height:400px;
              width:270px;
            }

          }
        }
      }
    }
    .resource-service-space {
      height: 514px;
      width: 570px;
      margin-top: 20px;
      .resource-service-space-main{
        box-sizing: border-box;
        height: 514px;
        padding:26px 20px;
        background: #FFF;
        .resource-service-space-top {
          .title {
            height: 33px;
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 33px;
          }
        }
      }
    }
    .platform-news {
      height: 514px;
      margin-top: 20px;
      .platform-news-main{
        box-sizing: border-box;
        height: 514px;
        padding:26px 20px;
        background: #FFF;
        .platform-news-main-top {
          .title {
            width: 96px;
            height: 33px;
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 33px;
          }
          .nav span {
            margin-left:40px;
            margin-top: 14px;
            width: 32px;
            height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 22px;
            cursor: pointer;
            &:hover {
              color: #1794FF;
            }
          }
        }
        .platform-news-main-bottom {
          margin:10px 0;
          .platform-news-main-item {
            margin: 20px 0;
            height:386px;
            width:369px;
            .image {
              width:369px;
              height: 230px;
              display: block;
            }
            h2 {
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
            }
            p{
              margin: 10px 0;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              &:last-child{
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #1794FF;
              }
            }
            /deep/ .el-card {
              height:400px;
              width:369px;
            }

          }
        }
      }
    }
    .cooperative-partner {
      height: 512px;
      background: rgba(23, 148, 255, 0.04);
      .cooperative-partner-top {
        overflow: hidden;
        .cooperative-partner-top-title{
          position: relative;
          font-size: 34px;
          font-weight: 500;
          color: #0D244C;
          text-align: center;
          margin: 56px 0;
          &::before{
            position: absolute;
            top: 25px;
            left: 430px;
            content: "";
            width: 80px;
            height: 2px;
            background: #D8D8D8;
          }
          &:after{
            position: absolute;
            top: 25px;
            right: 430px;
            content: "";
            width: 80px;
            height: 2px;
            background: #D8D8D8;
          }
        }
      }
      .cooperative-partner-ul {
        display:flex;
        justify-content:space-between;
        flex-wrap: wrap;
        li {
          display:inline-block;
          width: 217px;
          height: 72px;
          background: #FFFFFF;
          border-radius: 2px;
          margin-bottom:20px;
          text-align: center;
          position: relative;
          img{
            position:absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
          }
        }
      }
    }
  }
}
</style>
