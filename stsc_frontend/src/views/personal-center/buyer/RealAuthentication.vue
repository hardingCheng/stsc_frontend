<template>
  <div class="real-auth">
    <div class="real-auth-main">
      <el-form :label-position="labelPosition" ref="authForm" label-width="100px" :model="formLabelAlign" :rules="rules">
        <el-form-item label="真实姓名:" prop="_name">
          <el-input v-model="formLabelAlign._name" ></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="_id">
          <el-input v-model="formLabelAlign._id" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAuthForm('authForm')">立即验证</el-button>
          <el-button @click="resetForm('authForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="real-auth-success">
      实名认证成功! 仅可实名认证一次！
    </div>
  </div>
</template>

<script>
import userControllerList from "../../../api/request/userControllerList";

export default {
  name: "RealAuthentication",
  data(){
    return{
      labelPosition: 'left',
      formLabelAlign: {
        _name: '',
        _id: '',
      },
      rules: {
        _name: [
          { required: true, message: '请填写姓名', trigger: 'change' }
        ],
        _id: [
          { required: true, message: '请填写身份证号', trigger: 'change' }
        ],
      }
    }
  },
  methods:{
    async submitAuthForm(formName){
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
         let result = await this.$axios.userControllerList.authAccount({
           currentUserId: this.$store.getters.getUserInfo.id,
           idCard: this.formLabelAlign._id,
           realName: this.formLabelAlign._name
         })
          if (result.code === 20000){

          }else {
            this.$message({
              type:'error',
              message:'实名认证失败，请检查信息是否正确！'
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.real-auth {
  width:50%;
  box-sizing: border-box;
  height:500px;
  padding:30px;
  .real-auth-success {
    color: #6DBA14;
  }
}
</style>
