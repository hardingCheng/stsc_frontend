<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-top">
        <el-form ref="loginForm" :model="form"  label-width="60px" label-position="left">
          <h3 class="login-title">{{ this.$route.query.source }}</h3>
          <div class="login-verificationInfo">{{errors.errorlogin}}</div>
          <el-form-item label="账号" >
            <el-input type="text" placeholder="请输入账号" @input="errors.username =''" v-model="form.username"/>
            <div class="el-form-item__error">{{errors.username}}</div>
          </el-form-item>
          <el-form-item label="密码" >
            <el-input type="password" placeholder="请输入密码" @input="errors.password =''" v-model="form.password"/>
            <div class="el-form-item__error">{{errors.password}}</div>
          </el-form-item>
<!--          <el-form-item label="验证码"  class="verifivcation">-->
<!--            <el-row :gutter="10">-->
<!--              <el-col :span="10"><el-input type="text" placeholder="验证码"  @input="errors.verificationCode =''" v-model="form.verificationCode"/></el-col>-->
<!--              <el-col :span="12"><div  @click="getNewCode"><SIdentify ref="sidentify"></SIdentify></div></el-col>-->
<!--              <div class="el-form-item__error" >{{errors.verificationCode}}</div>-->
<!--            </el-row>-->
<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary"  :disabled="isValid"  v-on:click="loginForm">登录</el-button>
            <el-button type="primary" v-on:click="loginForm1">重置</el-button>
          </el-form-item>
        </el-form>
<!--        <div class="login-other-action">-->
<!--          <span><router-link to="/signup">注册</router-link></span>-->
<!--          <span><router-link to="/index">忘记密码？</router-link></span>-->
<!--        </div>-->
      </div>

    </div>
    <div class="login-welcome">
      <h1>Hi</h1>
      <h1>Welcome</h1>
      <h3>您好，欢迎登录!</h3>
      <img src="../../assets/images/loginwave.png" alt="">
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
import SIdentify from "../../components/SIdentify";
import { validatorInput } from "../../tools/verification/validata"
export default {
  name: "Third",
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
      errors:{},
      isValid:false,
      jumpRouting:''
    }
  },
  // 根据没登录前的点击的路由  登陆后跳转到相关页面
  mounted() {
    if (Object.keys(this.$route.query).length !== 0){
      this.jumpRouting = this.$route.query
    }
  },
  methods: {
    // 提交登录表单
    async loginForm() {

      const { errors, isValid } = validatorInput(this.form)
        let result = await this.$axios.userControllerList.thirdLogin(
          this.jumpRouting
        ,{
              username:this.form.username,
              password:this.form.password
            })
        if (result.code === 20000) {
          this.$store.commit("modTokenLogin",{
            userInfo:result.data.user,
            token:result.data.token,
            isLogin:true
          });
          this.$message({
            type: 'success',
            message: '登录成功!'
          })
          if (this.jumpRouting) {
            await this.$router.push('/index')
          }else {
          }
        }else{
          this.$message({
            type: 'error',
            message: '登录失败'
          })
        }

    },
    //获取验证码
    // getNewCode(){
    //   this.$refs.sidentify.getCode()
    // },
    loginForm1(){
    }
  }
}
</script>

<style scoped lang="scss">
.login{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  min-width: 1000px;
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background-image: url("../../assets/images/loginbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  .login-box {
    box-sizing: border-box;
    position:absolute;
    top: 50%;
    left: 60%;
    transform: translateY(-50%);
    background:#fff;
    border: 1px solid #DCDFE6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    box-shadow: 0 0 25px #909399;
    .login-box-top {
      position:relative;
      .verifivcation{
        height: 140px;
      }
      .login-title {
        text-align: center;
        margin: 0 auto 30px auto;
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
        bottom:50px;
        right:-20px;
        span {
          margin-left: 10px;
          font-size: 14px;
          font-weight: 400;
          color: #1794FF;
        }
      }
    }
    .login-box-bottom{
      margin-top:40px;
      text-align: center;
      span{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .third-party-login{
        width:100%;
        margin-top: 30px;
        display:flex;
        justify-content:space-between;
        .third-party-item{
          img{
            width:54px;
            height:54px;
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
      content:"";
      position: absolute;
      left: 0;

      width:100%;
      background: #E7E7E7;
    }
  }
  .login-welcome {
    position: absolute;
    top: 50%;
    left:30%;
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
      width:68px;
      height:34px;
    }
  }
}
</style>
