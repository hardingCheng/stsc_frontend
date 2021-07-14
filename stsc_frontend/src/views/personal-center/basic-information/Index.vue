s<template>
  <div class="basic-information">
    <div class="basic-information-main">
      <div class="basic-information-main-top">
        <div class="title">
          <h3>基本信息</h3>
          <span><a @click="centerDialogVisible = true">编辑</a></span>
        </div>
        <div class="info">
          <div class="info-left">
            <div class="user-avr">
              <img :src="userInfo.avatar?userInfo.avatar:'https://tenfei02.cfp.cn/creative/vcg/veer/800water/veer-317742976.jpg'" alt="">
            </div>
            <div class="user-name">
              <span>您好</span>
              <span>{{userInfo.realname}}</span>
            </div>
          </div>
          <div class="info-right">
           <ul>
             <li>账户昵称：<span>{{userInfo.username}}</span></li>
             <li>联系方式：<span>{{userInfo.telephone}}</span></li>
             <li>性别：<span>{{userInfo.gender === 1?'男':'女'}}</span></li>
             <li>邮箱：<span>{{userInfo.email?userInfo.email:'暂无信息'}}</span></li>
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
              <div class="check" v-cloak>
                <p v-if="userInfo.isRealNameCertification === 1"><i class="el-icon-circle-check"></i><span>您已经成功的完成实名认证</span></p>
                <p v-else><i class="el-icon-circle-close"></i><span><router-link to="/pc/buyer/realauth">您未完成完成实名认证</router-link></span></p>
                <p>技术加密，保障您的账号信息安全。</p>
              </div>
              <div class="check" v-cloak>
                <p v-if="userInfo.isQualification === 1"><i class="el-icon-circle-check"></i><span>您已经成功的完成实名认证</span></p>
                <p v-else><i class="el-icon-circle-close"></i><span><router-link to="/pc/seller/realauth">您未完成资质认证</router-link></span></p>
              </div>
            </div>
          </div>
          <div class="basic-information-main-bf-bottom">
            <div class="title">
              <h3>其他信息</h3>
            </div>
            <div class="other-info">
              <ul>
                <li>职称：<span>{{userInfo.title?userInfo.title:'暂无信息'}}</span></li>
                <li>单位：<span>{{userInfo.company || qualificationInfo.companyName ?userInfo.company || qualificationInfo.companyName:'暂无信息'}}</span></li>
                <li>个人介绍：<span class="order-info-introduction">{{userInfo.introduction?userInfo.introduction:'暂无信息'}}</span></li>
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
              <li>手机绑定：<span>{{userInfo.telephone?userInfo.telephone:'进行绑定'}}</span></li>
              <li>邮箱绑定：<span>{{userInfo.email?userInfo.email:'请进行绑定'}}</span></li>
              <li>登录密码：<span>已设置</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="basic-information-dialog">
      <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
        <el-form  label-width="80px" :model="userInfo">
<!--          <el-form-item label="用户名">-->
<!--            <el-input v-model="userInfo.username"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="头像">
            <el-upload
                ref="avatarUpload"
                class="avatar-uploader"
                action="/ph/stcsp/fileoss/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="beforeAvatarUpload"
                :auto-upload="false"
                :file-list="fileList"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userInfo.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="userInfo.introduction">
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="userInfo.title"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      centerDialogVisible: false,
      imageUrl: '',
      fileList: [],
    }
  },
  async mounted(){

  },
  methods: {
    async handleAvatarSuccess(response, file) {
      if (response.code === 20000){
        this.userInfo.avatar = response.data.url
        let result = await this.$axios.userControllerList.updateInfo(this.userInfo)
        if (result.code === 20000){
          let result = await this.$axios.userControllerList.getUserInfo()
          this.$store.commit("modUserInfo",{
            userInfo:result.data.user,
          });
        }
      }
      //this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file,fileList) {
      if (file.status === 'ready'){
        this.fileList = []
        this.fileList.push(file)
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    async updateInfo(){
      this.centerDialogVisible = false
      if(this.fileList.length === 0){
        this.userInfo.avatar = this.$store.getters.getUserInfo.avatar
        let result = await this.$axios.userControllerList.updateInfo(this.userInfo)
        if (result.code === 20000){
          let result = await this.$axios.userControllerList.getUserInfo()
          this.$store.commit("modUserInfo",{
            userInfo:result.data.user,
          });
        }
      }else {
        await this.$refs.avatarUpload.submit()
      }
    }
  },
  computed:{
    userInfo(){
      this.imageUrl = this.$store.getters.getUserInfo.avatar
      return this.$store.getters.getUserInfo
    },
    qualificationInfo(){
      return this.$store.getters.getRealauth.qualificationInfo;
    }
  }
}
</script>

<style lang="scss" scoped>

  [v-cloak] {
    display: none !important;
  }
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
              display: flex;
              .check {
                flex: 1;
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
                    .el-icon-circle-close {
                      font-size:30px;
                      color: red;
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
                margin-bottom:10px;
                font-size: 14px;
                font-weight: 400;
                color: #666666;
              }
            }
            .order-info-introduction {
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
              -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
              -webkit-line-clamp: 1; /** 显示的行数 **/
              overflow: hidden;  /** 隐藏超出的内容 **/
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
    .basic-information-dialog {
      /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 100%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
</style>
