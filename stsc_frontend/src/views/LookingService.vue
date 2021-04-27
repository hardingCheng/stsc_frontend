<template>
  <div class="looking-service container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发服务</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="common-head-classification">
        <div class="common-head-classification-top">
          <div class="common-head-classification-tab fl">
            <a href="#">找服务</a>
          </div>
          <div class="common-head-classification-serach fr">
            <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="input2">
            </el-input>
          </div>
        </div>
        <div class="common-head-classification-bottom">
          <div class="primary-classification">
            <dl>
              <dt>服务分类：</dt>
              <dd>全部</dd>
              <dd>研究开发</dd>
              <dd>技术转移</dd>
              <dd>检验检测</dd>
              <dd>创业孵化</dd>
              <dd>检验检测</dd>
              <dd>知识产权</dd>
              <dd>科技咨询</dd>
              <dd>科技金融</dd>
              <dd>科学普及</dd>
            </dl>
          </div>
          <div class="secondary-classification">
            <dl>
              <dd>二级菜单</dd>
              <dd>二级菜单</dd>
              <dd>二级菜单</dd>
              <dd>二级菜单</dd>
              <dd>二级菜单</dd>
              <dd>二级菜单</dd>
              <dd>二级菜单</dd>
              <dd>二级菜单</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="info-list">
        <div class="info-list-main">
          <div class="container">
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-list-main">
          <div class="container">
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-list-main">
          <div class="container">
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-list-main">
          <div class="container">
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
            <div class="info-list-item">
              <img src="../assets/images/hotbg.png" alt="">
              <div class="enterprise-name">
                <h1>企业名称企业名称企业名称企 业名称企业名称企业名称</h1>
              </div>
              <div class="enterprise-bottom">
                <span>摩擦片、模具</span>
                <div class="enterprise-bottom-operation">
                  <span>西安 - 制造业</span>
                  <span><a href="#">立即下单</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-pagination">
        <div class="pagination">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {resolve} from "vue-count-to";
import {reject} from "lodash";

export default {
  name: "LookingService",
  data(){
    return{
     input2:''
    }
  },
  async mounted() {

  },
};
</script>

<style scoped lang="scss">
@import '../styles/mixin';
.looking-service{
  .breadcrumb {
    /deep/ .el-breadcrumb {
      height:57px;
      line-height:57px;
    }
  }
  .common-head-classification {
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    margin-bottom: 20px;
    .common-head-classification-top {
      height: 50px;
      background: #F1F1F1;
      .common-head-classification-tab {
        text-align: center;
        line-height:50px;
        a {
          height:48px;
          width: 120px;
          display:block;
          font-size: 18px;
          font-weight: 500;
          color: #1794FF;
          background: #FFFFFF;
          border-top: 2px solid #1794FF;
        }
      }
      .common-head-classification-serach {
        margin-right: 10px;
        line-height:50px;
      }
    }
    .common-head-classification-bottom {
      box-sizing: border-box;
      height: 135px;
      padding:30px 24px;
      .primary-classification {
        dt,dd{
          margin-right:28px;
          float:left;
        }
        dd {
          &:first-child {
            font-size: 14px;
            font-weight: 400;
            color: #1794FF;
          }
        }
      }
      .secondary-classification {
        dl {
          margin-top: 40px;
          margin-left: 90px;
          height:36px;
          line-height:36px;
          width: 90%;
          background: #F8F8F8;
          border-radius: 2px;
          overflow: hidden;
        }
        dd {
          margin:0 20px;
          float:left;
          font-size: 14px;
          font-weight: 400;
          color: #111111;
        }
      }
    }
  }
  .info-list-main {
    .container {
      display:flex;
      justify-content: space-between;
      .info-list-item {
        box-sizing: border-box;
        width:225px;
        height: 330px;
        border: 1px solid #E7E7E7;
        padding: 16px 22px;
        margin-bottom: 20px;
        &:hover {
          border: 1px solid #1794FF;
        }
        img {
          width:100%;
          height:auto;
        }
        .enterprise-name {
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
        .enterprise-bottom {
          span {
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
            float: left;
            font-size: 12px;
            font-weight: 400;
            color: #666666;
          }
          span:last-child {
            float: right;
            font-size: 16px;
            font-weight: 500;
            a {
              color: #1794FF;
            }
          }
        }
      }
    }
  }
  .common-pagination{
    height:60px;
    position:relative;
    .pagination {
      position:absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%,-50%);
    }
  }
}
</style>
