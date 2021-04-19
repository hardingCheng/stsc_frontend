<template>
  <div>
    <el-form ref="loginForm" :model="form"  label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <div class="login-verificationInfo">{{errors.errorlogin}}</div>
      <el-form-item label="账号" >
        <el-input type="text" placeholder="请输入账号" @input="errors.username =''" v-model="form.username"/>
        <div class="el-form-item__error">{{errors.username}}</div>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" placeholder="请输入密码" @input="errors.password =''" v-model="form.password"/>
        <div class="el-form-item__error">{{errors.password}}</div>
      </el-form-item>
     <el-form-item label="验证码" >
        <el-row :gutter="10">
          <el-col :span="10"><el-input type="password" placeholder="验证码"  @input="errors.verificationCode =''" v-model="form.verificationCode"/></el-col>
          <el-col :span="12"><div  @click="getNewCode"><SIdentify ref="sidentify"></SIdentify></div></el-col>
          <div class="el-form-item__error" >{{errors.verificationCode}}</div>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="isValid"  v-on:click="loginForm">登录</el-button>
        <el-button type="primary" v-on:click="loginForm1">重置</el-button>
      </el-form-item>
    </el-form>

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
import SIdentify from "../components/SIdentify";
import { validatorInput } from "../tools/verification/validata"
export default {
  name: "Login",
  components: {SIdentify},
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
      isValid:false
    }
  },
  methods: {
    loginForm() {
      const { errors, isValid } = validatorInput(this.form)
      if(isValid){
        // 发起请求
        this.$store.commit("modTokenLogin",{})
        this.$router.push("/index")
      }else {
        this.errors = errors
      }
    },
    getNewCode(){
      this.$refs.sidentify.getCode()
    },
    loginForm1(){
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

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
</style>
