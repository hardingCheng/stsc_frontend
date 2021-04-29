<template>
  <div class="basic-information">
    <div class="basic-information-main">
      <div class="basic-information-main-top">
        <div class="title">
          <h3>基本信息</h3>
          <span><a href="#">编辑</a></span>
        </div>
        <div class="info">
          <div class="info-left">
            <div class="user-avr">
              <img src="https://tenfei02.cfp.cn/creative/vcg/veer/800water/veer-317742976.jpg" alt="">
            </div>
            <div class="user-name">
              <span>您好</span>
              <span>刘欣欣</span>
            </div>
          </div>
          <div class="info-right">
           <ul>
             <li>账户昵称：<span>你猜我叫什么</span></li>
             <li>联系方式：<span>18500570001</span></li>
             <li>性别：<span>男</span></li>
             <li>邮箱：<span>19500570001@163.com</span></li>
           </ul>
          </div>
        </div>
      </div>
      <div class="basic-information-main-bottom">
        <div class="basic-information-main-bf">
          <div class="basic-information-main-bf-top">
            <div class="title">
              <h3>实名认证</h3>
            </div>
            <div class="authentication-info">
              <div class="check">
                <p><i class="el-icon-circle-check"></i><span>您已经成功的完成实名认证</span></p>
                <p>技术加密，保障您的账号信息安全，查看<a href="#">个人信息</a></p>
              </div>
            </div>
          </div>
          <div class="basic-information-main-bf-bottom">
            <div class="title">
              <h3>其他信息</h3>
            </div>
            <div class="other-info">
              <ul>
                <li>职称：<span>你猜我叫什么</span></li>
                <li>单位：<span>单位名称单位名称</span></li>
                <li>个人介绍：<span>单位名称单位名称</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="basic-information-main-br">
          <div class="title">
            <h3>安全信息</h3>
          </div>
          <div class="safe-info">
            <ul>
              <li>账号安全等级：<span></span><span>较高</span></li>
              <li>手机绑定：<span>165****7365</span><span><a href="#">编辑</a></span></li>
              <li>邮箱绑定：<span>195****0001@163.com</span><span><a href="#">编辑</a></span></li>
              <li>登录密码：<span>已设置</span><span><a href="#">编辑</a></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style lang="scss" scoped>
  .basic-information {
    box-sizing: border-box;
    width:100%;
    padding:0 20px;
    margin-bottom: 20px;
    .basic-information-main {
      .basic-information-main-top {
        box-sizing: border-box;
        height: 185px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 3px rgba(225, 225, 225, 0.5);
        border-radius: 4px;
        margin-bottom: 20px;
        padding:30px;
        .info {
          display:flex;
          justify-content:flex-start;
          align-items: center;
          .info-left {
            display:flex;
            justify-content:flex-start;
            align-items: center;
            margin-right: 160px;
            .user-avr {
              img {
                width: 70px;
                height: 70px;
                display:inline-block;
                background: #F7F7F7;
                border: 1px solid #E7E7E7;
                border-radius: 100%;
                margin-right:20px;
              }
            }
            .user-name {
              height: 55px;
              display:flex;
              flex-direction: column;
              justify-content:space-between;
              span {
                display:inline-block;
                font-size: 14px;
                font-weight: 400;
                color: #111111;
                &:first-child {
                  margin-bottom:10px;
                }
              }
            }
          }
          .info-right {
            ul {
              width:700px;
              height: 55px;
              overflow:hidden;
              li {
                width:270px;
                float:left;
                margin-right: 40px;
                font-size: 14px;
                font-weight: 400;
                color: #666666;
                span {
                  margin-left:40px;
                }
                &:nth-child(-n+2){
                  margin-bottom: 15px;
                }
              }
            }
          }
        }
      }
      .basic-information-main-bottom {
        height: 400px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        .basic-information-main-bf {
          width: 680px;
          height: 100%;
          display: flex;
          flex-direction:column;
          justify-content:space-between;
          .basic-information-main-bf-top {
            box-sizing: border-box;
            padding: 30px;
            height:170px;
            background: #FFFFFF;
            box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
            border-radius: 4px;
            .authentication-info {
              .check {
                p{
                  margin-bottom: 15px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #333333;
                  a {
                    color:#1794FF;
                  }
                  &:first-child {
                    position:relative;
                    font-size: 16px;
                    font-weight: 400;
                    color: #333333;
                    .el-icon-circle-check {
                      font-size:30px;
                      color: #6DBA14;
                    }
                    span {
                      position:absolute;
                      top: 5px;
                      left: 40px;
                    }
                  }
                }
              }

            }
          }
          .basic-information-main-bf-bottom {
            box-sizing: border-box;
            padding: 30px;
            height:210px;
            background: #FFFFFF;
            box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
            border-radius: 4px;
            ul {
              li {
                margin-bottom:25px;
                font-size: 14px;
                font-weight: 400;
                color: #666666;
                span {
                  margin-left:50px;
                }
              }
            }
          }
        }
        .basic-information-main-br {
          box-sizing: border-box;
          width: 455px;
          height: 100%;
          background: #FFFFFF;
          box-shadow: 0 2px 4px 3px rgba(225, 225, 225, 0.5);
          border-radius: 4px;
          padding:30px;
          .safe-info {
            margin-top: 30px;
            ul {
              li {
                margin-bottom: 25px;
                font-size: 14px;
                font-weight: 400;
                color: #666666;
                span {
                  margin-left:50px;
                  a{
                    color:#1794FF;
                  }
                }
                &:first-child {
                  position:relative;
                }
                &:first-child>span:last-child{
                  margin-left:170px;
                }
                &:first-child>span:first-child{
                  position:absolute;
                  display:inline-block;
                  width: 164px;
                  height: 20px;
                  background: #6DBA14;
                  margin-left:0px;
                }
                &:nth-child(n+2) span:last-child {
                  margin-left:0px;
                  float:right;
                }
                &:last-child>span:last-child{
                  margin-left:0px;
                }
                &:last-child>span:first-child{
                  color: #6DBA14;
                }
              }
            }
          }
        }
      }
    }

    .title {
      height:25px;
      line-height:25px;
      margin-bottom: 20px;
      h3 {
        float: left;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }
      span {
        float: right;
        a {
          font-size: 18px;
          font-weight: 400;
          color: #1794FF;
        }
      }
    }
  }
</style>
