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
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img src="../assets/images/dataimage/data1.png" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">机构数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="666"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img src="../assets/images/dataimage/data2.png" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">需求数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="666"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img src="../assets/images/dataimage/data3.png" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">服务数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="190"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img src="../assets/images/dataimage/data4.png" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">订单数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="280"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img src="../assets/images/dataimage/data4.png" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">数据数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0" endVal="10" suffix="亿"></scrolling-numbers>
            </div>
          </div>
        </div>
      </div>
      <div class="service-category">
        <div class="service-category-top">
          <div class="container">
            <div class="service-category-title">服务类别</div>
            <div class="service-category-tab">
              <div class="service-category-tab-item" :class="[sindex === 1?'tab-active':'']">
                <a @click="servicecategory(1)">
                  <img src="../assets/images/serviceimage/service1.png" alt="">
                  <span>研究开发</span>
                </a>
              </div>
              <div class="service-category-tab-item" :class="[sindex === 2?'tab-active':'']">
                <a @click="servicecategory(2)">
                  <img src="../assets/images/serviceimage/service2.png" alt="">
                  <span>技术转移</span>
                </a>
              </div>
              <div class="service-category-tab-item" :class="[sindex === 3?'tab-active':'']">
                <a @click="servicecategory(3)">
                  <img src="../assets/images/serviceimage/service3.png" alt="">
                  <span>知识产权</span>
                </a>
              </div>
              <div class="service-category-tab-item" :class="[sindex === 4?'tab-active':'']">
                <a @click="servicecategory(4)">
                  <img src="../assets/images/serviceimage/service4.png" alt="">
                  <span>检验检测</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="service-category-bottom">
          <div class="container">
            <div class="service-category-info" v-if="sindex === 1">
              <div class="service-category-bottom-item">
                <dl>
                  <dt>研究开发</dt>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                </dl>
              </div>
              <div class="service-category-bottom-item">
                <dl>
                  <dt>研究开发</dt>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                </dl>
              </div>
              <div class="service-category-bottom-item">
                <dl>
                  <dt>研究开发</dt>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                  <dd>研究开发</dd>
                </dl>
              </div>
            </div >
            <div class="service-category-info" v-if="sindex === 2">
              <div class="service-category-bottom-item">
                <dl>
                  <dt>技术转移</dt>
                  <dd>技术转移</dd>
                  <dd>技术转移</dd>
                  <dd>技术转移</dd>
                  <dd>技术转移</dd>
                  <dd>技术转移</dd>
                  <dd>技术转移</dd>
                </dl>
              </div>
            </div >
            <div class="service-category-info" v-if="sindex === 3">
              <div class="service-category-bottom-item">
                <dl>
                  <dt>知识产权</dt>
                  <dd>知识产权</dd>
                  <dd>知识产权</dd>
                  <dd>知识产权</dd>
                  <dd>知识产权</dd>
                  <dd>知识产权</dd>
                  <dd>知识产权</dd>
                </dl>
              </div>
            </div >
            <div class="service-category-info" v-if="sindex === 4">
              <div class="service-category-bottom-item">
                <dl>
                  <dt>检验检测</dt>
                  <dd>检验检测</dd>
                  <dd>检验检测</dd>
                  <dd>检验检测</dd>
                  <dd>检验检测</dd>
                  <dd>检验检测</dd>
                  <dd>检验检测</dd>
                </dl>
              </div>
            </div >
          </div>
        </div>
      </div>
      <div class="popular-recommendation">
          <div class="public-switch">
            <div class="container">
              <div class="public-switch-title">热门推荐</div>
              <div class="public-switch-view-all">
                <a href="#">查看全部<span>></span></a>
              </div>
              <div class="public-switch-tab">
                <div class="public-switch-tab-item" :class="[pindex === 1?'tab-active':'']">
                  <a @click="popularrecommendation(1)">全部</a>
                </div>
                <div class="public-switch-tab-item" :class="[pindex === 2?'tab-active':'']">
                  <a @click="popularrecommendation(2)">需求</a>
                </div>
                <div class="public-switch-tab-item" :class="[pindex === 3?'tab-active':'']">
                  <a @click="popularrecommendation(3)">服务</a>
                </div>
              </div>
            </div>
          </div>
          <div class="info-list" ref="plist">
            <div class="container">
              <div class="info-list-main" v-if="pindex === 1">
                <info-list-item></info-list-item>
                <info-list-item></info-list-item>
                <info-list-item></info-list-item>
                <info-list-item></info-list-item>
                <info-list-item></info-list-item>
              </div>
              <div class="info-list-main" v-if="pindex === 2">
                <info-list-item></info-list-item>
              </div>
              <div class="info-list-main" v-if="pindex === 3">
                <info-list-item></info-list-item>
                <info-list-item></info-list-item>
                <info-list-item></info-list-item>

              </div>
            </div>
          </div>
      </div>
      <div class="successful-cases">
        <div class="public-switch">
          <div class="container">
            <div class="public-switch-title">成功案例</div>
            <div class="public-switch-view-all">
              <a href="#">查看全部案例<span>></span></a>
            </div>
<!--            需要修改-->
            <div class="public-switch-tab">
              <div class="public-switch-tab-item tab-active">
                <a>研究开发</a>
              </div>
              <div class="public-switch-tab-item">
                <a>技术转移</a>
              </div>
              <div class="public-switch-tab-item">
                <a>知识产权</a>
              </div>
              <div class="public-switch-tab-item">
                <a>检验检测</a>
              </div>
            </div>
          </div>
        </div>
        <div class="successful-cases-main">
          <div class="container">
            <div class="successful-cases-main-left">
              <div class="title">
                <h1>企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称</h1>
              </div>
              <span class="keywords">摩擦片、模具</span>
              <div class="rate">
                服务评分：
                <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>
              </div>
              <p class="introduce">
                介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
              </p>
            </div>
            <div class="successful-cases-main-right">
              <div class="successful-cases-main-right-swiper">
                <swiper class="swiper" :options="swiperOption2">
                  <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
                  <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
                  <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="platform-news">
        <div class="public-switch">
          <div class="container">
            <div class="public-switch-title">平台动态</div>
            <div class="public-switch-view-all">
              <a href="#">查看全部案例<span>></span></a>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="platform-news-main">
            <div class="platform-news-main-item">
              <div class="platform-news-main-item-top">
                <img src="../assets/images/news.png" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>服务“太白山地质地貌研究”</h1>
                <span>2021-4-12 12:12</span>
                <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来…</p>
                <a href="#">更多 ></a>
              </div>
            </div>
            <div class="platform-news-main-item">
              <div class="platform-news-main-item-top">
                <img src="../assets/images/news.png" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>服务“太白山地质地貌研究”</h1>
                <span>2021-4-12 12:12</span>
                <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来…</p>
                <a href="#">更多 ></a>
              </div>
            </div>
            <div class="platform-news-main-item">
              <div class="platform-news-main-item-top">
                <img src="../assets/images/news.png" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>服务“太白山地质地貌研究”</h1>
                <span>2021-4-12 12:12</span>
                <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来…</p>
                <a href="#">更多 ></a>
              </div>
            </div>
            <div class="platform-news-main-item">
              <div class="platform-news-main-item-top">
                <img src="../assets/images/news.png" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>服务“太白山地质地貌研究”</h1>
                <span>2021-4-12 12:12</span>
                <p>快节奏的生活总是让我们感觉压力过大，佛系？好像对正当拼搏年纪的我们来…</p>
                <a href="#">更多 ></a>
              </div>
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
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import InfoListItem from "../components/InfoListItem";

export default {
  name: "Index",
  data() {
    return {
      swiperOption: {
        speed: 1000,//切换速度
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      swiperOption2: {
        speed: 1000,//切换速度
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      value:4,
      pindex:1,
      sindex:1
    }
  },
  components: {
    InfoListItem,
    Swiper,
    SwiperSlide,
    ScrollingNumbers
  },
  mounted() {

  },
  methods: {
    popularrecommendation(index){
      this.pindex = index
    },
    servicecategory(index){
      this.sindex = index
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/mixin';

.index {
  .swiper-main {
    position: relative;
    top: -70px;
    z-index: -20;
    .swiper {
      img {
        height: 420px;
        width: 100%;
      }
    }
  }

  .main-wapper {
    .data-presentation {
      margin-top: -70px;
      height: 110px;
      .container {
        height:100%;
        display:flex;
        justify-content:space-between;
        align-items: center;
        .data-presentation-item {
          width: 20%;
          text-align: center;
          display: flex;
          justify-content:center;
          align-items: center;
          .data-presentation-item-left {
            width: 34px;
            height: 34px;
            margin-right: 24px;
            img {
              width:100%;
              height:auto;
            }
          }
          .data-presentation-item-right {
            .data-presentation-item-title {
              line-height: 25px;
              @include font-config(18px, 'PingFangSC-Medium, PingFang SC', 400, #333333)
            }
            /deep/ .scrolling-numbers {
              margin-top: 4px;
              span {
                @include font-config(26px, 'PingFangSC-Medium, PingFang SC', 500, #1794FF)
              }
            }
          }
        }
      }
    }
    .service-category {
      height:490px;
      .service-category-top {
        height:240px;
        text-align: center;
        .service-category-title {
          margin: 36px 0 70px 0;
          font-size: 30px;
          font-weight: 500;
          color: #333333;
        }
        .service-category-tab {
          display:flex;
          justify-content: center;
          align-items: center;
          height:100%;
          .service-category-tab-item {
            box-sizing: border-box;
            text-align: center;
            width:220px;
            padding-bottom:10px;
            a {
              img {
                display:block;
                margin: 10px auto;
                width: 60px;
                height: 60px;
              }
              span {
                font-size: 16px;
                font-weight: 400;
                color: #333333;
              }
              cursor: pointer;
            }
          }
        }
      }
      .service-category-bottom {
        box-sizing: border-box;
        padding:0 0 30px 0;
        width:100%;
        background: #F6F6F6;
        .container {
          .service-category-info{
            height:100%;
            display:flex;
            justify-content: flex-start;
            .service-category-bottom-item {
              flex:1;
              dl {
                dt {
                  margin: 30px 0;
                  font-size: 16px;
                  font-weight: 400;
                  color: #333333;
                }
                dd {
                  float:left;
                  font-size: 14px;
                  font-weight: 400;
                  color: #999999;
                  margin: 0 20px 10px 0;
                }
              }
            }
          }

        }
      }
    }
    .popular-recommendation {
      .container {
        .info-list-main {
          display:flex;
          justify-content: flex-start;
        }
      }
    }
    .successful-cases {
      .successful-cases-main {
        height:330px;
       .container {
         height: 100%;
         display:flex;
         justify-content: space-between;
         .successful-cases-main-left {
           box-sizing: border-box;
           height: 100%;
           width: 730px;
           padding:69px 60px;
           box-shadow: -1px 0px 9px 2px rgba(224, 224, 224, 0.5);
           border-radius: 1px;
           .title {
             width:100%;
             margin-bottom: 27px;
             h1 {
               font-size: 16px;
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
           .keywords {
             font-size: 14px;
             font-weight: 400;
             color: #FF7C12;
           }
           .rate {
             margin: 20px 0;
             font-size: 14px;
             font-weight: 400;
             color: #999999;
             /deep/ .el-rate {
               display:inline-block;
             }
           }
           .introduce {
             font-size: 12px;
             font-weight: 400;
             color: #999999;
             word-break: break-all;
             text-overflow: ellipsis;
             display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
             -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
             -webkit-line-clamp: 3; /** 显示的行数 **/
             overflow: hidden;  /** 隐藏超出的内容 **/
           }
         }
         .successful-cases-main-right {
           height: 100%;
           width: 470px;
           .successful-cases-main-right-swiper {
             height: 100%;
             width: 100%;
             .swiper {
               height: 100%;
               width: 100%;
               img{
                 height: 100%;
                 width: 100%;
               }
             }
           }
         }
       }
      }
    }
    .platform-news {
      .container {
        .platform-news-main {
          height: 355px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          .platform-news-main-item {
            height:100%;
            margin: 0 27px 0 0;
            flex: 1;
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            .platform-news-main-item-top {
              img {
                width: 100%;
              }
            }
            .platform-news-main-item-bottom {
              box-sizing: border-box;
              padding:16px;
              h1 {
                font-size: 16px;
                font-weight: 500;
                color: #4E4E4E;
                margin-bottom: 10px;
              }
              span {
                font-size: 12px;
                font-weight: 500;
                color: #999999;
              }
              p {
                margin-top: 10px;
                font-size: 12px;
                font-weight: 400;
                color: #999999;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
                overflow: hidden;  /** 隐藏超出的内容 **/
              }
              a {
                display:inline-block;
                margin-top: 5px;
                font-size: 16px;
                font-weight: 500;
                color: #1794FF;
              }
            }
            &:last-child {
              margin-right: 0;
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

        .cooperative-partner-top-title {
          position: relative;
          text-align: center;
          margin: 56px 0;
          @include font-config(34px, 'PingFangSC-Medium, PingFang SC', 500, #0D244C);

          &::before {
            position: absolute;
            top: 25px;
            left: 430px;
            content: "";
            background: #D8D8D8;
            @include wh(80px, 2px);
          }

          &:after {
            position: absolute;
            top: 25px;
            right: 430px;
            content: "";
            background: #D8D8D8;
            @include wh(80px, 2px);
          }
        }
      }

      .cooperative-partner-ul {
        @include flex(space-between, "", wrap);

        li {
          display: inline-block;
          background: #FFFFFF;
          border-radius: 2px;
          margin-bottom: 20px;
          text-align: center;
          position: relative;
          @include wh(217px, 72px);

          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
.public-switch {
  height:185px;
  margin-top: 50px;
  .container {
    text-align: center;
    .public-switch-title {
      margin: 0 0 20px 0;
      font-size: 30px;
      font-weight: 500;
      color: #333333;
    }
    .public-switch-view-all {
      margin-bottom: 50px;
      a {
        font-size: 14px;
        font-weight: 400;
        color: #1794FF;
        span {
          margin-left:10px;
        }
      }
    }
    .public-switch-tab {
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      display:flex;
      justify-content: center;
      .public-switch-tab-item {
        height:35px;
        width: 220px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        a {
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
  }
}
.tab-active {
  border-bottom: 2px solid #1794FF;
}
.swiper-style {
  outline: none;
  box-shadow: none;
}
</style>
