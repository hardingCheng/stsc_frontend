<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-top">
        <el-form ref="loginForm" :model="form" label-width="60px" label-position="left">
          <h3 class="login-title">欢迎登录</h3>
          <div class="login-verificationInfo">{{ errors.errorlogin }}</div>
          <el-form-item label="账号">
            <el-input type="text" placeholder="请输入账号" @input="errors.username =''" v-model="form.username"/>
            <div class="el-form-item__error">{{ errors.username }}</div>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" placeholder="请输入密码" @input="errors.password =''" v-model="form.password"/>
            <div class="el-form-item__error">{{ errors.password }}</div>
          </el-form-item>
          <el-form-item label="验证码">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-input type="text" placeholder="验证码" @input="errors.verificationCode =''"
                          v-model="form.verificationCode"/>
              </el-col>
              <el-col :span="12">
                <div @click="getNewCode">
<!--                  <SIdentify ref="sidentify"></SIdentify>-->
                  <img :src="verificationCodeImage" alt="">
                </div>
              </el-col>
              <div class="el-form-item__error">{{ errors.verificationCode }}</div>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isValid" v-on:click="loginForm">登录</el-button>
            <el-button type="primary" v-on:click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="login-other-action">
          <span><router-link to="/signup">注册</router-link></span>
          <span><router-link to="/index">忘记密码？</router-link></span>
        </div>
      </div>
      <div class="login-box-bottom">
        <span>第三方登录</span>
        <div class="third-party-login">
          <div class="third-party-item">
            <img src="../assets/images/shanxi.png" alt="" @click="third1(source1)">
            <span>陕西</span>
          </div>
          <div class="third-party-item">
            <img  src="../assets/images/114.png" alt=""  style="background-color: #89b000" @click="third1(source2)">
            <span>114产学研</span>
          </div>
          <div class="third-party-item">
            <img  src="../assets/images/hachang.png" alt=""  style="background-color: #89b000" @click="third1(source3)">
            <span>哈长城市群</span>
          </div>
          <div class="third-party-item">
            <img  src="../assets/images/jingjinji.png" alt=""  style="background-color: #89b000" @click="third1(source4)">
            <span>京津冀</span>
          </div>

<!--          <div class="third-party-item">-->
<!--            <img src="http://www.114cxy.com/app/images/PC/logo.png" alt="">-->
<!--            <span>114产学研</span>-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <div class="login-welcome">
      <h1>Hi</h1>
      <h1>Welcome</h1>
      <h3>您好，欢迎登录!</h3>
      <img src="../assets/images/loginwave.png" alt="">
    </div>
    <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import SIdentify from "../components/SIdentify";
import {validatorInput} from "../tools/verification/validata"

export default {
  name: "Login",
  // components: {SIdentify},
  data() {
    return {
      form: {
        username: '',
        password: '',
        verificationCode: ''
      },
      // 对话框显示和隐藏
      dialogVisible: false,
      errors: {
        errorlogin:''
      },
      isValid: false,
      jumpRouting: '',
      source1:"陕西中小企业科技服务平台",
      source2:"上海114产学研",
      source3:"哈长城市群科技云平台",
      source4:"京津冀综合科技服务平台",
      verificationCodeImage:""
    }
  },
  // 根据没登录前的点击的路由  登陆后跳转到相关页面
  mounted() {
    this.getCode()
    // 查看是否是从其他页面跳转到登录页面。登录后跳转回去
    if (Object.keys(this.$route.query).length !== 0) {
      this.jumpRouting = this.$route.query
    }
  },
  methods: {
    async getCode(){
      const verTime = new Date().getTime() + ""
      this.$store.commit("modVerTime",{
        verTime
      })
      let result = await this.$axios.userControllerList.getCode({
        time:verTime
      });
      if(result.code === 20000){
        this.verificationCodeImage = result.data.code;
      }
    },
    // 提交登录表单
    async loginForm() {
      let { errors, isValid } = validatorInput(this.form)
      if (isValid) {
        const loading = this.$loading.service({
          lock: true,
          text: '登录中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let resultLogin = await this.$axios.userControllerList.login({
          username: this.form.username,
          password: this.form.password,
          verifyCode: this.form.verificationCode,
          time:this.$store.getters.getVerTime
        })
        if (resultLogin.code === 20000) {
          setTimeout(async () => {
            await loading.close();
            await this.setLoginInfo(resultLogin)
          }, 1000);
        }else if (resultLogin.code === 20001) {
          loading.close()
          this.$set(this.errors, "errorlogin",  resultLogin.message)
          this.form.verificationCode = ''
          await this.getCode()
        }
      } else {
        this.form.verificationCode = ''
        await this.getCode()
        this.errors = errors
      }
    },
    // 获取验证码
    getNewCode() {
      this.getCode()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //模拟第三方登录
    third1(source) {
      this.$router.push({name:`third1`,query:{source:source}})
    },

    async setLoginInfo(resultLogin){
      // 保存用户信息
      let { user,token } = resultLogin.data
      this.$store.commit("modTokenLogin", {
        userInfo: user,
        token: token,
        isLogin: true
      });
      // 设置实名认证信息
      let resultAuthInfo = await this.$axios.userControllerList.getAuthInfo()
      let resultRealAuthInfo = await this.$axios.userControllerList.getRealInfo()
      if (resultRealAuthInfo.data.realInfoVo.isRealNameCertification === 1) {
        let { realName,idCard } = resultRealAuthInfo.data.realInfoVo
        this.$store.commit('modRealNameCertification', {
          realNameCertificationInfo: {
            realName,
            idCard
          },
          isRealNameCertification:1
        })
      }else {
        this.$store.commit('modRealNameCertification', {
          realNameCertificationInfo: {
            realName:'',
            idCard:''
          },
          isRealNameCertification:0
        })
      }
      // 设置资质认证信息
      if (resultAuthInfo.code === 20000 && resultAuthInfo.data.authInfo.qualificationStatus === 1) {
        let {address,businessScope,companyName,qualificationUrl} = resultAuthInfo.data.authInfo
        this.$store.commit('modQualification', {
          qualificationInfo: {
            address,
            businessScope,
            companyName,
            qualificationUrl
          },
          isQualification:1
        })
      }else {
        this.$store.commit('modQualification', {
          qualificationInfo: {
            address:'',
            businessScope:'',
            companyName:'',
            qualificationUrl:''
          },
          isQualification:0
        })
      }
      // 点击需要登录查看的页面   登录之后跳转
      if (this.jumpRouting) {
        await this.$router.push(this.jumpRouting?.url)
      } else {
        await this.$router.push('/index')
      }
    }
  },
  watch: {
    formValue:{
      deep:true,
      handler(newValue,oldValue){
        this.errors={}
      }
    }
  },
  computed:{
    formValue(){
      let {username,password} = this.form
      return {
        username,
        password
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-image: url("../assets/images/loginbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;

  .login-box {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translateY(-50%);
    background: #fff;
    border: 1px solid #DCDFE6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    box-shadow: 0 0 25px #909399;

    .login-box-top {
      position: relative;

      .login-title {
        text-align: center;
        margin: 0 auto 20px auto;
        color: #303133;
      }

      .login-verificationInfo {
        text-align: center;
        color: #F56C6C;
        font-size: 14px;
        line-height: 1;
        margin-bottom: 10px;
      }

      .login-other-action {
        position: absolute;
        bottom: 50px;
        right: -20px;

        span {
          margin-left: 10px;
          font-size: 14px;
          font-weight: 400;
          color: #1794FF;
        }
      }
    }

    .login-box-bottom {
      margin-top: 40px;
      text-align: center;

      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }

      .third-party-login {
        width: 100%;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        .third-party-item {
          img {
            width: 54px;
            height: 54px;
            display: block;
            border-radius: 100%;
            background: #F4F4F4;
          }

          span {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
      }
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 155px;
      width: 100%;
      height: 1px;
      background: #E7E7E7;
    }
  }

  .login-welcome {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translateY(-50%);

    h1 {
      margin: 15px 0;
      font-size: 56px;
      font-weight: 600;
      color: #FFFFFF;
    }

    h3 {
      font-size: 36px;
      font-weight: 600;
      color: #FFFFFF;
      margin: 15px 0;
    }

    img {
      width: 68px;
      height: 34px;
    }
  }
}
</style>
