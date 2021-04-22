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
                <span class="swiper-style swiper-button-next1"> > </span>
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
                  <span class="swiper-style swiper-button-next2"> > </span>
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
                <div id="chart" :style="{width: '400px', height: '400px',margin: '60px auto 0 auto'}"></div>
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
                <span class="swiper-style swiper-button-next4"> > </span>
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
        loop:true,
        navigation: {
          nextEl: '.swiper-button-next2',
        }
      },
      swiperOption3: {
        slidesPerView: 2,
        spaceBetween: 10,
        loop:true,
        navigation: {
          nextEl: '.swiper-button-next3',
        }
      },
      swiperOption4: {
        slidesPerView: 3,
        spaceBetween: 20,
        loop:true,
        navigation: {
          nextEl: '.swiper-button-next4',
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollingNumbers
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chart'))
      let msg = [
        {
          research: 1123,
          biotechnology: 1434,
          intellectual: 13241,
          examinations: 13252,
          service1: 12314,
          service2: 154,
          service3: 1234,
          service4: 1545,
        },
        {
          research: 12341,
          biotechnology: 66,
          intellectual: 16457,
          examinations: 16525,
          service1: 1213,
          service2: 15774,
          service3: 19446,
          service4: 134,
        },
        {
          examinations: 1,
          service1: 1,
          service2: 1,
          service3: 1,
          service4: 1,
        },
        {
          research: 1,
          biotechnology: 1,
          intellectual: 1,
          examinations: 1,
          service1: 1,
          service2: 1,
          service3: 1,
          service4: 1,
        },
        {
          research: 1,
          biotechnology: 1,
          intellectual: 1,
          examinations: 1,
          service3: 1,
          service4: 1,
        },
        {
          research: 1,
          biotechnology: 1,
          intellectual: 1,
          examinations: 1,
          service1: 1,
          service2: 1,
          service3: 1,
          service4: 1,
        },
      ];
      let option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            var htmlStr = "<div>";
            var span ='<span style="width: 10px;height: 10px;background-color: '+params.color+' ;border-radius: 50%;display: inline-block;margin-right: 5px;"></span>'
            htmlStr+=(span+"数据来源:"+params.name+"<br/>");
            htmlStr+=(span+"数据总条数:"+params.value+"条<br/>");
            msg[params.dataIndex].research === undefined ? htmlStr+="":htmlStr += (span+"研究开发:" + msg[params.dataIndex].research + "条<br/>");
            msg[params.dataIndex].biotechnology === undefined ? htmlStr+="":htmlStr += (span+"技术转移:" + msg[params.dataIndex].biotechnology + "条<br/>");
            msg[params.dataIndex].intellectual === undefined ? htmlStr+="":htmlStr += (span+"知识产权:" + msg[params.dataIndex].intellectual + "条<br/>");
            msg[params.dataIndex].examinations === undefined ? htmlStr+="":htmlStr += (span+"检验检测:" + msg[params.dataIndex].examinations + "条<br/>");
            msg[params.dataIndex].service1 === undefined ? htmlStr+="":htmlStr += (span+"其他1:" + msg[params.dataIndex].service1 + "条<br/>");
            msg[params.dataIndex].service2 === undefined ? htmlStr+="":htmlStr += (span+"其他2:" + msg[params.dataIndex].service2 + "条<br/>");
            msg[params.dataIndex].service3 === undefined ? htmlStr+="":htmlStr += (span+"其他3:" + msg[params.dataIndex].service3 + "条<br/>");
            msg[params.dataIndex].service4 === undefined ? htmlStr+="":htmlStr += (span+"其他4:" + msg[params.dataIndex].service4 + "条<br/>");
            return htmlStr;
          },
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "数据来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 23133123, name: "知网" },
              { value: 3424234, name: "陕西" },
              { value: 3242252, name: "上海" },
              { value: 4535353, name: "其他1" },
              { value: 133144, name: "其他2" },
            ],
          },
        ],
      };
      // 绘制图表
      myChart.setOption(option)
    },
  }
};
</script>

<style scoped lang="scss">
@import '../styles/mixin';
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
            line-height: 25px;
            margin-top: 20px;
            @include font-config(18px,'PingFangSC-Medium, PingFang SC',400,#333333)
          }
          /deep/ .scrolling-numbers {
            margin-top: 10px;
            span {
              @include font-config(26px,'PingFangSC-Medium, PingFang SC',500,#1794FF)
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
            @include wh(96px,33px);
            @include l-height(33px,33px);
            @include font-config(24px,'PingFangSC-Medium, PingFang SC',500,#333333);
          }
          .nav span {
            margin-left:40px;
            margin-top: 14px;
            cursor: pointer;
            @include wh(32px,22px);
            @include font-config(16px,'PingFangSC-Medium, PingFang SC',500,"");
            &:hover {
              color: #1794FF;
            }
          }
        }
        .popular-recommendation-main-bottom {
          margin:10px 0;
          .popular-recommendation-main-item {
            margin: 20px 0;
            @include wh(270px,386px);
            .image {
              width:100%;
              display: block;
            }
            h2 {
              @include font-config(18px,'PingFangSC-Medium, PingFang SC',500,#333333);
            }
            p{
              margin: 10px 0;
              @include font-config(14px,'PingFangSC-Medium, PingFang SC',400,#999999);
            }
            /deep/ .el-card {
              @include wh(270px,400px);
            }

          }
        }
      }
    }
    .successful-cases {
      @include wh(610px,514px);
      margin-top: 20px;
      .successful-cases-main{
        box-sizing: border-box;
        height: 514px;
        padding:26px 20px;
        background: #FFF;
        .successful-cases-main-top {
          .title {
            @include wh(96px,33px);
            @include l-height(33px,33px);
            @include font-config(24px,'PingFangSC-Medium, PingFang SC',500,#333333);
          }
          .nav span {
            margin-left:40px;
            margin-top: 14px;
            cursor: pointer;
            @include wh(32px,22px);
            @include l-height(22px,22px);
            @include font-config(22px,'PingFangSC-Medium, PingFang SC',500,"");
            &:hover {
              color: #1794FF;
            }
          }
        }
        .successful-cases-main-bottom {
          margin:10px 0;
          .successful-cases-main-item {
            margin: 20px 0;
            @include wh(270px,386px);
            .image {
              width:100%;
              display: block;
            }
            h2 {
              @include font-config(18px,'PingFangSC-Medium, PingFang SC',500,#333333);
            }
            p{
              margin: 10px 0;
              @include font-config(14px,'PingFangSC-Medium, PingFang SC',400,#999999);
            }
            /deep/ .el-card {
              @include wh(270px,400px);
            }
          }
        }
      }
    }
    .resource-service-space {
      @include wh(570px,514px);
      margin-top: 20px;
      .resource-service-space-main{
        box-sizing: border-box;
        height: 514px;
        padding:26px 20px;
        background: #FFF;
        .resource-service-space-top {
          .title {
            @include l-height(33px,33px);
            @include font-config(24px,'PingFangSC-Medium, PingFang SC',400,#333333);
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
            @include wh(96px,33px);
            @include l-height(33px,33px);
            @include font-config(24px,'PingFangSC-Medium, PingFang SC',500,#333333);
          }
          .nav span {
            margin-left:40px;
            margin-top: 14px;
            cursor: pointer;
            @include wh(32px,22px);
            @include l-height(22px,22px);
            @include font-config(22px,'PingFangSC-Medium, PingFang SC',500,"");
            &:hover {
              color: #1794FF;
            }
          }
        }
        .platform-news-main-bottom {
          margin:10px 0;
          .platform-news-main-item {
            margin: 20px 0;
            @include wh(369px,386px);
            .image {
              @include wh(369px,230px);
              display: block;
            }
            h2 {
              @include font-config(18px,'PingFangSC-Medium, PingFang SC',500,#333333);
            }
            p{
              margin: 10px 0;
              @include font-config(14px,'PingFangSC-Medium, PingFang SC',400,#999999);
              &:last-child{
                @include font-config(16px,'PingFangSC-Medium, PingFang SC',500,#1794FF);
              }
            }
            /deep/ .el-card {
              @include wh(369px,400px);
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
          text-align: center;
          margin: 56px 0;
          @include font-config(34px,'PingFangSC-Medium, PingFang SC',500,#0D244C);
          &::before{
            position: absolute;
            top: 25px;
            left: 430px;
            content: "";
            background: #D8D8D8;
            @include wh(80px,2px);
          }
          &:after{
            position: absolute;
            top: 25px;
            right: 430px;
            content: "";
            background: #D8D8D8;
            @include wh(80px,2px);
          }
        }
      }
      .cooperative-partner-ul {
        @include flex(space-between,"",wrap);
        li {
          display:inline-block;
          background: #FFFFFF;
          border-radius: 2px;
          margin-bottom:20px;
          text-align: center;
          position: relative;
          @include wh(217px,72px);
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
.swiper-style {
  outline:none;
  box-shadow:none;
}
</style>
