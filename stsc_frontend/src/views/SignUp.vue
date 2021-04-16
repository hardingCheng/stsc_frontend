<template>
  <div class="sign-up">
    <el-form ref="signUpForm" :model="form"  label-width="80px" class="signup-box">
      <h3 class="signup-title">欢迎注册</h3>
      <el-form-item label="手机号" prop="username">
        <el-input type="text" placeholder="请输入账号" @input="errors.username =''" v-model="form.username"/>
        <div class="el-form-item__error">{{errors.username}}</div>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" @input="errors.password =''" v-model="form.password"/>
        <div class="el-form-item__error">{{errors.password}}</div>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordConfirm">
        <el-input type="password" placeholder="请输入再次密码" @input="errors.passwordConfirm =''" v-model="form.passwordConfirm"/>
        <div class="el-form-item__error">{{errors.passwordConfirm}}</div>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-row :gutter="10">
          <el-col :span="10"><el-input type="password" placeholder="验证码" @input="errors.verificationCode =''" v-model="form.verificationCode"/></el-col>
          <el-col :span="12"><div  @click="getNewCode"><SIdentify ref="sidentify"></SIdentify></div></el-col>
          <div class="el-form-item__error">{{errors.verificationCode}}</div>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registerForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {validatePass2,validatePass,validateCode,validateUserNamePhone} from "../tools/verification/validata"
import { Message } from "element-ui"; // 全局错误弹窗
import SIdentify from "../components/SIdentify";
import {validatorSignUpInput} from "../tools/verification/validata"
export default {
  name: "SignUp",
  components: {SIdentify},
  data() {
    return {
      form: {
        username: '',
        password: '',
        passwordConfirm: '',
        verificationCode: '',
      },
      errors:{},
      isValid:false
    }
  },
  methods: {
    getNewCode(){
      this.$refs.sidentify.getCode()
    },
    async registerForm(){
      const { errors,isValid } = validatorSignUpInput(this.form)
      if(isValid) {
        const result = await this.$axios.userApiList.register({
          username:this.form.username,
          password:this.form.password,
        });
        if (result.code === 20000) {
          await this.$router.push("/login")
        }else {
          Message.error({
            message:"注册失败"
          })
        }
      }else {
        this.errors = errors
      }
    }
  }
};
</script>s

<style scoped lang="scss">
.signup-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}s

.signup-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
