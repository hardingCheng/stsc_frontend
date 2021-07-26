<template>
  <div class="index">
    <!--    <div class="swiper-main">-->
    <!--      <swiper class="swiper" :options="swiperOption">-->
    <!--        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
    <!--        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
    <!--        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
    <!--        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
    <!--        <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
    <!--      </swiper>-->
    <!--    </div>-->
    <div class="video-main">
      <video src="https://static1.xpccdn.com/mp4/banner.mp4?12448ab" id="bannerVideo" autoplay="" muted loop=""
             webkit-playsinline="" playsinline="" data-vscid="8rvymj79w"></video>
      <div class="video-title">
        <h1> 灵活,准确,智能,快速,低成本</h1>
        <h2>操作简单，功能强大，让人酣畅淋漓拥有体验！</h2>
      </div>
    </div>
    <div class="main-wapper">
      <div class="data-presentation">
        <div class="container">
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img v-lazy="require('../assets/images/dataimage/data1.png')" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">机构数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0"
                                 :endVal="indexData.companyCount"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img v-lazy="require('../assets/images/dataimage/data2.png')" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">需求数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0"
                                 :endVal="indexData.reqCount"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img v-lazy="require('../assets/images/dataimage/data3.png')" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">服务数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0"
                                 :endVal="indexData.serviceCount"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img v-lazy="require('../assets/images/dataimage/data4.png')" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">订单数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0"
                                 :endVal="indexData.orderCount"></scrolling-numbers>
            </div>
          </div>
          <div class="data-presentation-item">
            <div class="data-presentation-item-left">
              <img v-lazy="require('../assets/images/dataimage/data4.png')" alt="">
            </div>
            <div class="data-presentation-item-right">
              <div class="data-presentation-item-title">数据数量</div>
              <scrolling-numbers class="scrolling-numbers" startVal="0" :endVal="indexData.dataTotal"
                                 suffix="千万"></scrolling-numbers>
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
                  <img v-lazy="require('../assets/images/serviceimage/service3.png')" alt="">
                  <span>知识产权</span>
                </a>
              </div>
              <div class="service-category-tab-item" :class="[sindex === 2?'tab-active':'']">
                <a @click="servicecategory(2)">
                  <img v-lazy="require('../assets/images/serviceimage/service4.png')" alt="">
                  <span>检验检测</span>
                </a>
              </div>
              <div class="service-category-tab-item" :class="[sindex === 3?'tab-active':'']">
                <a @click="servicecategory(3)">
                  <img v-lazy="require('../assets/images/serviceimage/service1.png')" alt="">
                  <span>研究开发</span>
                </a>
              </div>
              <div class="service-category-tab-item" :class="[sindex === 4?'tab-active':'']">
                <a @click="servicecategory(4)">
                  <img v-lazy="require('../assets/images/serviceimage/service2.png')" alt="">
                  <span>技术转移</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="service-category-bottom">
          <div class="container">
            <div class="service-category-info" v-if="sindex === index+1" v-for="(itemfirst,index) in categoryList"
                 :key="index">
              <div class="service-category-bottom-item" v-for="(itemsecond,index) in itemfirst.children" :key="index">
                <dl>
                  <dt>{{ itemsecond.name }}</dt>
                  <dd v-for="(itemthird,index) in itemsecond.children" :key="index">{{ itemthird.name }}</dd>
                </dl>
              </div>
            </div>
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
            <div class="info-list-main" v-if="pindex === 1" >
              <info-list-item  v-for="(info,index) in commonSelectList" :href="info.hasOwnProperty('flag')?'/ddetail/'+info.id+'/'+info.flag : '/sdetail/'+info.id" :info="info" ></info-list-item>
            </div>
            <div class="info-list-main" v-if="pindex === 2">
              <info-list-item :info="info" :href="'/ddetail/'+info.id+'/'+info.flag" v-for="(info,index) in demandSelectList"></info-list-item>
            </div>
            <div class="info-list-main" v-if="pindex === 3">
              <info-list-item :info="info"  :href="'/sdetail/'+info.id" v-for="(info,index) in serviceSelectList"></info-list-item>
            </div>
          </div>
        </div>
      </div>
      <!--      <div class="successful-cases">-->
      <!--        <div class="public-switch">-->
      <!--          <div class="container">-->
      <!--            <div class="public-switch-title">成功案例</div>-->
      <!--            <div class="public-switch-view-all">-->
      <!--              <a href="#">查看全部案例<span>></span></a>-->
      <!--            </div>-->
      <!--&lt;!&ndash;            需要修改&ndash;&gt;-->
      <!--            <div class="public-switch-tab">-->
      <!--              <div class="public-switch-tab-item tab-active">-->
      <!--                <a>研究开发</a>-->
      <!--              </div>-->
      <!--              <div class="public-switch-tab-item">-->
      <!--                <a>技术转移</a>-->
      <!--              </div>-->
      <!--              <div class="public-switch-tab-item">-->
      <!--                <a>知识产权</a>-->
      <!--              </div>-->
      <!--              <div class="public-switch-tab-item">-->
      <!--                <a>检验检测</a>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="successful-cases-main">-->
      <!--          <div class="container">-->
      <!--            <div class="successful-cases-main-left">-->
      <!--              <div class="title">-->
      <!--                <h1>企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称企业名称</h1>-->
      <!--              </div>-->
      <!--              <span class="keywords">摩擦片、模具</span>-->
      <!--              <div class="rate">-->
      <!--                服务评分：-->
      <!--                <el-rate-->
      <!--                    v-model="value"-->
      <!--                    disabled-->
      <!--                    show-score-->
      <!--                    text-color="#ff9900"-->
      <!--                    score-template="{value}">-->
      <!--                </el-rate>-->
      <!--              </div>-->
      <!--              <p class="introduce">-->
      <!--                介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍-->
      <!--              </p>-->
      <!--            </div>-->
      <!--            <div class="successful-cases-main-right">-->
      <!--              <div class="successful-cases-main-right-swiper">-->
      <!--                <swiper class="swiper" :options="swiperOption2">-->
      <!--                  <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
      <!--                  <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
      <!--                  <swiper-slide><img src="../assets/images/500px1030823997.png" alt=""></swiper-slide>-->
      <!--                  <div class="swiper-pagination" slot="pagination"></div>-->
      <!--                </swiper>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="successful-cases">
        <div class="public-switch">
          <div class="container">
            <div class="public-switch-title">成功案例</div>
            <div class="public-switch-view-all">
              <router-link to="/successCase">查看全部案例<span>></span></router-link>
            </div>
          </div>
        </div>
        <div class="successful-cases-main" v-if="successfulCaseList.length > 0">
          <div class="container">
            <div class="successful-cases-main-left">
              <router-link :to="'/successCaseDetail/'+successfulCaseList[0][0].id">
                <div class="sucess-left-img">
                  <img
                      v-lazy="successfulCaseList[0][0].imageUrl"
                      alt="">
                </div>
                <div class="sucess-left-info">
                  <h3>{{ successfulCaseList[0][0].title }} ></h3>
                  <p>{{ successfulCaseList[0][0].reqDescription }}</p>
                </div>
              </router-link>
            </div>
            <div class="successful-cases-main-right">
              <div class="successful-cases-main-right-item" v-for="(item,index) in successfulCaseList[1]" :key="index">
                <router-link :to="'/successCaseDetail/'+item.id">
                  <div class="success-right-cover"></div>
                  <div class="success-right-img">
                    <img v-lazy="item.imageUrl" alt=""/>
                  </div>
                  <div class="success-right-info">
                    <h3>{{ item.title }} ></h3>
                    <p>{{ item.reqDescription }}</p>
                  </div>
                </router-link>
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
                <img v-lazy="'https://rms.zbj.com/resource/redirect?key=homesite/task/%E8%A8%80%E7%AE%80%E5%85%AB%E6%88%92%E7%BD%91%E5%A4%B4%E5%9B%BE.jpg/origine/eb812237-21f0-4f77-bbe6-353bd6ccde33'" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>文化教育酒店餐饮LOGO设计金融地产建筑LOGO原创高端定制</h1>
                <span>2021-4-12 12:12</span>
                <p>山东言简装饰设计有限公司，是一家专业进行室内装潢设计、展厅展馆设计、展览展示设计的专业公司。作为一个为社会贡献越来越多经济价值的企业，作为一个不断在提升社会地位的企业，言简自成立以来，在壮大自身力量和规模的同时，也从未忘记履行企业的社会责任，积极主动在慈善公益事业中贡献自己一份绵薄之力，努力成为伟大的、具有崇高信仰与理念的、努力实践与传播普世价值观的、以正念正行为导向的企业组织。</p>
                <a href="#">更多 ></a>
              </div>
            </div>
            <div class="platform-news-main-item">
              <div class="platform-news-main-item-top">
                <img v-lazy="'https://rms.zbj.com/resource/redirect?key=homesite/task/1.jpg/origine/812e3293-b39b-416a-8aba-efc9136f72ab'" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>智能仪表/产品外观设计/工业设计/产品结构设计/小批量生产</h1>
                <span>2021-4-12 12:12</span>
                <p>前期项目沟通，对该产品的外观和结构进行分析设计；出三维效果讨论修改；确定最终方案进入后期生产制作，小批量化生产。</p>
                <a href="#">更多 ></a>
              </div>
            </div>
            <div class="platform-news-main-item">
              <div class="platform-news-main-item-top">
                <img v-lazy="'https://homesitetask.zbjimg.com/homesite/task/ac.jpg/origine/c5204ab3-3906-454a-b19f-1a10948d1db3?imageMogr2/auto-orient/strip/quality/90/thumbnail/288x'" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>机器人</h1>
                <span>2021-4-12 12:12</span>
                <p>基于台达机械手臂高定位精度，配合双CCD检测定位，可实现高定位精度，双机械手臂双工位同时作业，可满足节拍要求。</p>
                <a href="#">更多 ></a>
              </div>
            </div>
            <div class="platform-news-main-item">
              <div class="platform-news-main-item-top">
                <img v-lazy="'https://rms.zbj.com/resource/redirect?key=homesite/task/VOC%E6%B0%94%E4%BD%93%E6%A3%80%E6%B5%8B%E4%BB%AA.jpg/origine/db150382-36df-48a7-b6f5-f54e5f356e73'" alt="">
              </div>
              <div class="platform-news-main-item-bottom">
                <h1>VOC气体检测仪-智能硬件设计嵌入式系统硬件设计arm硬件</h1>
                <span>2021-4-12 12:12</span>
                <p>VOC气体检测仪-智能硬件设计嵌入式系统硬件设计arm硬件</p>
                <a href="#">更多 ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="resource-space">
        <div class="public-switch">
          <div class="container">
            <div class="public-switch-title">资源空间</div>
          </div>
        </div>
        <div class="container">
          <div class="resource-space-main" id="resource-space-main"></div>
        </div>
      </div>
      <div class="cooperative-partner">
        <div class="container">
          <div class="cooperative-partner-top">
            <div class="cooperative-partner-top-title">合作伙伴</div>
          </div>
          <div class="cooperative-partner-bottom">
            <ul class="cooperative-partner-ul">
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/7c012f8e8a9f4f82_首都师范大学.png'" alt="">
                  <span class="fr">首都师范大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/e9693e7165784503_哈尔滨工业大学.png'" alt="">
                  <span>哈尔滨工业大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/092f9acf512c463f_昆明理工大学.png'" alt="">
                  <span>昆明理工大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/bbd2d877c1334fbe_北京信息科技大学.png'" alt="">
                  <span>北京信息科技大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/dc38e9159dcd4b53_辽宁工程技术大学.png'" alt="">
                  <span>辽宁工程技术大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/ec95e64fff9b4358_上海汉邦京泰数码 技术有限公司.png'"
                       alt="">
                  <span>上海汉邦京泰数码技术有限公司</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/f53ea889741a4c48_北京大学.png'" alt="">
                  <span>北京大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/666140d675ea43e5_清华大学.png'" alt="">
                  <span>清华大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/13bcdc06039746e2_湘潭大学.png'" alt="">
                  <span>湘潭大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/3feac5d4a1a543a1_北京中机科海科技发展有限公司.png'"
                       alt="">
                  <span>北京中机科海科技发展有限公司</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/1359de6f39cb4c13_中科院软件所.png'" alt="">
                  <span>中科院软件所</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/b83bf46acae04975_神州数码信息 系统有限公司.png'"
                       alt="">
                  <span>神州数码信息系统有限公司</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/85a8507d22f646fb_金陵科技学院.png'" alt="">
                  <span>金陵科技学院</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/1e55299d07214f27_北京路客驿站科技有限公司.png'"
                       alt="">
                  <span>北京路客驿站科技有限公司</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/bd37296049fb4a3e_北京航空航天大学.png'" alt="">
                  <span>北京航空航天大学</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/06545467f4d94256_同方知网.png'" alt="">
                  <span>同方知网</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/7520064a12f54554_中国科学院文献情报中心.png'" alt="">
                  <span>中国科学院文献情报中心</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/2cbc5ea3c2224472_清华大学出版社有限公司.png'" alt="">
                  <span>清华大学出版社有限公司</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/0e77db88be7e43ac_华智数创(北京) 科技发展有限责任公司.png'"
                       alt="">
                  <span>华智数创(北京)科技发展有限责任公司</span>
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <img v-lazy="'https://stsc-fwkj.oss-cn-beijing.aliyuncs.com/1f8f11f1ae9d4c65_陕西省科技资源统筹中心.png'"
                       alt="">
                  <span>陕西省科技资源统筹中心</span>
                </li>
              </a>
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
import axios from 'axios'
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
      value: 4,
      pindex: 1,
      sindex: 1,
      categoryList: [],
      chartDataList: [],
      successfulCaseList: [],
      indexData: {},
      demandSelectList:[],
      serviceSelectList:[],
      commonSelectList:[],
      threeSuccessCases:[]
    }
  },
  components: {
    InfoListItem,
    Swiper,
    SwiperSlide,
    ScrollingNumbers
  },
  async created() {
    await this.getCategoryList()
  },
  async mounted() {
    this.getxxxx()
    await this.getIndexData()
    await this.drawInit()
    await this.getHotData()
    await this.getSuccessfulCase()
  },
  methods: {
    getxxxx(){
      var self = this
      axios.get('http://www.114cxy.com/orders/successCases')
          .then(function (response) {
            self.threeSuccessCases = response.data.data.successCases
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    getRandomArrayElements(arr, count) {
      let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    async getHotData() {
      const servciceBaseResult = await this.$axios.serveControllerList.getServesByCondition({
        page: 1,
        limit: 15
      }, {
        status: 1
      })
      const demandBaseResult = await this.$axios.requirementControllerList.getRequireSubRequire({
        page: 1,
        limit: 15
      }, {})
      const demandBaseResultNotNull = demandBaseResult.data.list.filter((item,index) => {
        return item.image !== null
      })
      const servciceBaseResultNotNull = servciceBaseResult.data.serveList.records.filter((item,index) => {
        return item.image !== null
      })
      this.demandSelectList = this.getRandomArrayElements(demandBaseResultNotNull,5)

      this.serviceSelectList= this.getRandomArrayElements(servciceBaseResultNotNull,5)

      this.commonSelectList = this.getRandomArrayElements([...servciceBaseResultNotNull,...demandBaseResultNotNull],5)

    },
    async getIndexData() {
      let result = await this.$axios.mainController.getIndexData()
      this.indexData = result.data.data
      this.indexData.dataTotal /= 10000000
    },
    async getSuccessfulCase() {
      let result = await this.$axios.mainController.getSuccessfulCase()
      if (result.code === 20000) {
        this.successfulCaseList.push(result.data.caseList.slice(0, 1))
        this.successfulCaseList.push(result.data.caseList.slice(1))
      }
    },
    popularrecommendation(index) {
      this.pindex = index
    },
    servicecategory(index) {
      this.sindex = index
    },
    async getCategoryList() {
      let result = await this.$axios.categoryControllerList.getCategory()
      if (result.code === 20000) {
        this.categoryList = result.data.firstCategoryList
      }
    },
    async drawInit() {
      let chartData = await this.$axios.mainController.getChartData()
      if (chartData.code === 20000) {
        this.chartDataList = chartData.data.platForms
      }
      // 自定义颜色
      let colorList = [
        {
          startColor: '#0093E9',
          endColor: '#80D0C7'
        }, {
          startColor: '#8EC5FC',
          endColor: '#E0C3FC'
        }, {
          startColor: '#00DBDE',
          endColor: '#FC00FF'
        }, {
          startColor: '#85FFBD',
          endColor: '#FFFB7D'
        }, {
          startColor: '#8BC6EC',
          endColor: '#9599E2'
        }, {
          startColor: '#FFE53B',
          endColor: '#FF2525'
        }, {
          startColor: '#21D4FD',
          endColor: '#B721FF'
        }, {
          startColor: '#3EECAC',
          endColor: '#EE74E1'
        }, {
          startColor: '#FBDA61',
          endColor: '#FF5ACD'
        }]

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('resource-space-main'));
      let option = {
        // color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        color: [],
        title: {
          text: '科技服务协同平台资源空间'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: []
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['用户', '需求', '服务', '订单']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      };
      // 指定图表的配置项和数据
      for (let i = 0; i < this.chartDataList.length; i++) {
        option.color.push(colorList[i].endColor)
        option.legend.data.push(this.chartDataList[i].platFormName)
        option.series.push({
          name: this.chartDataList[i].platFormName,
          type: 'line',
          stack: '总量',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: colorList[i].startColor
            }, {
              offset: 1,
              color: colorList[i].endColor
            }])
          },
          emphasis: {
            focus: 'series'
          },
          data: [this.chartDataList[i].userCount, this.chartDataList[i].requireCount, this.chartDataList[i].serviceCount, this.chartDataList[i].orderCount]
        })
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  computed:{

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

  .video-main {
    position: relative;
    top: -70px;
    z-index: -20;
    width: 100%;

    video {
      display: inline-block;
      width: 100%;
      height: 600px;
      object-fit: fill;
    }

    .video-title {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      color: white;
      transform: translate(-50%, -50%);

      h1 {
        font-size: 55px;
        margin-bottom: 30px;
      }

      h2 {
        font-weight: 400;
      }
    }
  }

  .main-wapper {
    .data-presentation {
      margin-top: -70px;
      height: 110px;

      .container {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .data-presentation-item {
          width: 20%;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;

          .data-presentation-item-left {
            width: 34px;
            height: 34px;
            margin-right: 24px;

            img {
              width: 100%;
              height: auto;
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
      height: 490px;

      .service-category-top {
        height: 240px;
        text-align: center;

        .service-category-title {
          margin: 36px 0 70px 0;
          font-size: 30px;
          font-weight: 500;
          color: #333333;
        }

        .service-category-tab {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;

          .service-category-tab-item {
            box-sizing: border-box;
            text-align: center;
            width: 220px;
            padding-bottom: 10px;

            a {
              img {
                display: block;
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
        padding: 0 0 30px 0;
        width: 100%;
        background: #F6F6F6;

        .container {
          .service-category-info {
            height: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .service-category-bottom-item {
              flex: 1;

              dl {
                dt {
                  margin: 30px 0;
                  font-size: 16px;
                  font-weight: 400;
                  color: #333333;
                }

                dd {
                  float: left;
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
          display: flex;
          justify-content: flex-start;
        }
      }
    }

    .successful-cases {
      .public-switch {
        height: 100px !important;
      }

      .successful-cases-main {
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;

          .successful-cases-main-left {
            width: 70%;
            height: 500px;

            .sucess-left-img {
              overflow: hidden;

              img {
                display: block;
                height: 400px;
                width: 100%;
                transition: transform .3s ease;
              }
            }

            .sucess-left-info {
              color: white;
              box-sizing: border-box;
              height: 100px;
              padding: 14px 20px 7px;
              background-color: #FEE140;
              background-image: linear-gradient(90deg, #FEE140 0%, #FA709A 100%);

              h3 {
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #fff;
                letter-spacing: 0;
                margin-bottom: 10px;
              }

              p {
                width: 100%;
                font-size: 13px;
                color: #fff;
                letter-spacing: 0;
                line-height: 20px;
                height: 40px;
                overflow: hidden;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
              }
            }

            &:hover img {
              transform: scale(1.1)
            }
          }

          .successful-cases-main-right {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .successful-cases-main-right-item {
              overflow: hidden;
              width: 50%;
              height: 50%;
              position: relative;

              .success-right-img {
                img {
                  display: block;
                  width: 100%;
                  height: 250px;
                  transition: transform .3s ease;
                  //opacity: .7;
                }
              }

              .success-right-info {
                color: #fff;
                width: auto;
                height: 90px;
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 0 14px 15px 20px;
                background: rgba(153, 153, 153, 0.5);

                h3 {
                  font-family: PingFangSC-Medium;
                  font-size: 16px;
                  letter-spacing: 0;
                  margin-bottom: 20px;
                }

                p {
                  width: 100%;
                  font-size: 13px;
                  letter-spacing: 0;
                  line-height: 20px;
                  height: 40px;
                  overflow: hidden;
                  word-break: break-all;
                  text-overflow: ellipsis;
                  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                  -webkit-line-clamp: 2; /** 显示的行数 **/
                }
              }

              &:hover img {
                //opacity: 1;
                transform: scale(1.1)
              }
            }
          }
        }
      }
    }

    //.successful-cases {
    //  .public-switch {
    //    height: 100px !important;
    //  }
    //  .successful-cases-main {
    //    height: 330px;
    //    .container {
    //      height: 100%;
    //      display: flex;
    //      justify-content: space-between;
    //      .successful-cases-main-left {
    //        box-sizing: border-box;
    //        height: 100%;
    //        width: 730px;
    //        padding: 69px 60px;
    //        box-shadow: -1px 0px 9px 2px rgba(224, 224, 224, 0.5);
    //        border-radius: 1px;
    //
    //        .title {
    //          width: 100%;
    //          margin-bottom: 27px;
    //
    //          h1 {
    //            font-size: 16px;
    //            font-weight: 500;
    //            color: #111111;
    //            word-break: break-all;
    //            text-overflow: ellipsis;
    //            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    //            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    //            -webkit-line-clamp: 2; /** 显示的行数 **/
    //            overflow: hidden; /** 隐藏超出的内容 **/
    //          }
    //        }
    //
    //        .keywords {
    //          font-size: 14px;
    //          font-weight: 400;
    //          color: #FF7C12;
    //        }
    //
    //        .rate {
    //          margin: 20px 0;
    //          font-size: 14px;
    //          font-weight: 400;
    //          color: #999999;
    //
    //          /deep/ .el-rate {
    //            display: inline-block;
    //          }
    //        }
    //
    //        .introduce {
    //          font-size: 12px;
    //          font-weight: 400;
    //          color: #999999;
    //          word-break: break-all;
    //          text-overflow: ellipsis;
    //          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    //          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    //          -webkit-line-clamp: 3; /** 显示的行数 **/
    //          overflow: hidden; /** 隐藏超出的内容 **/
    //        }
    //      }
    //
    //      .successful-cases-main-right {
    //        height: 100%;
    //        width: 470px;
    //
    //        .successful-cases-main-right-swiper {
    //          height: 100%;
    //          width: 100%;
    //
    //          .swiper {
    //            height: 100%;
    //            width: 100%;
    //
    //            img {
    //              height: 100%;
    //              width: 100%;
    //            }
    //          }
    //        }
    //      }
    //    }
    //  }
    //}

    .platform-news {
      .public-switch {
        height: 100px !important;
      }

      .container {
        .platform-news-main {
          height: 355px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .platform-news-main-item {
            height: 100%;
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
              padding: 16px;

              h1 {
                height:44px;
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
                height: 34px;
                margin-top: 10px;
                font-size: 12px;
                font-weight: 400;
                color: #999999;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
                overflow: hidden; /** 隐藏超出的内容 **/
              }

              a {
                display: inline-block;
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
      height: 100%;
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
        @include flex(flex-start, "", wrap);

        a {
          color: #000;

          li {
            background: #FFFFFF;
            border-radius: 2px;
            margin-right: 20px;
            margin-bottom: 20px;
            position: relative;
            @include wh(280px, 75px);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

            img {
              margin-left: 18px;
              width: 65px;
              height: 65px;
            }

            span {
              margin-left: 20px;
              font-weight: normal;
              font-size: 17px;
            }
          }
        }
      }
    }

    .resource-space {
      .public-switch {
        height: 100px !important;
      }

      .resource-space-main {
        height: 300px;
        width: 100%;
      }
    }
  }
}

.public-switch {
  height: 185px;
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
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        color: #1794FF;


        span {
          margin-left: 10px;
        }
      }
    }

    .public-switch-tab {
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      display: flex;
      justify-content: center;

      .public-switch-tab-item {
        height: 35px;
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
