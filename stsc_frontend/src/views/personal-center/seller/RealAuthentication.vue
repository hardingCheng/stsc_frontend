<template>
  <div class="real-auth">
   <h3>资质证明</h3>
    <div class="qualification-certificate-not-certified" v-if="isQualification === 0">
      <p>请上传相应资质证明！可以上传多个资质证明扫描高清图片！仅供审核！</p>
<!--      <div class="qualification-certificate-form">-->
<!--        <el-form  :rules="rules" label-width="200px" :model="form" ref="certificateForm">-->
<!--          <el-form-item label="	营业执照全称:" prop="busiName">-->
<!--            <el-input v-model="form.busiName"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="营业执照注册号:" prop="noBusi">-->
<!--            <el-input v-model="form.noBusi"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="对公账户名:" prop="acctName">-->
<!--            <el-input v-model="form.acctName"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="对公账号:" prop="acctNo">-->
<!--            <el-input v-model="form.acctNo"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="清算联行号:" prop="bankNo">-->
<!--            <el-input v-model="form.bankNo"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
      <div class="qualification-certificate-upload">
        <h3>上传相关资质图片！</h3>
        <el-upload
            action="/ph/stcsp/fileoss/upload"
            ref="upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :file-list="fileList"
            multiple
            :limit="1"
            :on-exceed="handleExceed1"
          >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过3M。</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div class="certificate-info">
          <h3> {{certificateIinfo}}</h3>
        </div>
        <div class="authentication-operation">
          <el-button @click="submitCertificate" type="primary">提交</el-button>
        </div>
      </div>
    </div>
    <div class="qualification-certificate-yes-certified" v-else>
      <div class="qualification-certificate-info">
        <ul>
          <li>企业名称: <span>{{qualificationInfo.address}}</span></li>
          <li>企业地址: <span>{{qualificationInfo.companyName}}</span></li>
          <li>营业范围: <span>{{qualificationInfo.businessScope}}</span></li>
        </ul>
      </div>
      <div class="qualification-certificate-img">
        <h3>相关资质图片！</h3>
        <div class="qualification-certificate-item-img">
          <a @click="handlePictureCardPreview(qualificationInfo.qualificationUrl)">
            <img :src="qualificationInfo.qualificationUrl" alt="" >
          </a>
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RealAuthentication",
  data(){
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      cerUrlNum:0,
      certificateIinfo:'',
      cerUrl:''
    }
  },
  watch:{
    cerUrlNum:{
      async handler(newValue,oldValue) {
        if (newValue === this.fileList.length){
          await this.submit()
        }
      }
    }
  },
  methods: {
    // 获取文件后缀
    getFileType(name) {
      let startIndex = name.lastIndexOf('.')
      if (startIndex !== -1) {
        return name.slice(startIndex + 1).toLowerCase()
      } else {
        return ''
      }
    },
    // 文件信息判断
    fileLimit(file,options){
      let isFileSize = true,isFileType = true;
      if (file.size / (1024 * 1024) > options.fileSize) {   // 限制文件大小
        this.$message.warning(`当前限制文件大小不能大于${options.fileSize}M`)
        isFileSize = false
      }
      let suffix = this.getFileType(file.name) //获取文件后缀名
      let suffixArray = options.fileType  //限制的文件类型，根据情况自己定义
      if (suffixArray.indexOf(suffix) === -1) {
        this.$message({
          message: '文件格式错误',
          type: 'error',
          duration: 2000
        })
        isFileType = false
      }
      return isFileSize && isFileType
    },
    handleExceed1(files, fileList){
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      let options = {
        fileType:['jpg','png','jpeg'],
        fileSize:3
      }
      let fileResult = this.fileLimit(file,options)
      if (!fileResult) {
        this.fileList = []
      }else {
        this.fileList = fileList
      }
    },
    async handleSuccess(response, file, fileList){
      if (response.code === 20000 && response.data.url !== ""){
        return new Promise(resolve => {
          this.cerUrlNum++
          if (this.fileList.length === 1) {
            this.cerUrl = this.cerUrl+response.data.url
          }else {
            this.cerUrl = this.cerUrl+response.data.url+','
          }
          resolve(this.cerUrl)
        })
      }
    },
    async submitCertificate(formName) {
      if (this.fileList.length === 0){
        this.$message({
          type:'error',
          message:'请您上传资质认证相关证明图片！'
        })
      }else {
        this.loading = this.$loading.service({
          lock: true,
          text: '资质认证中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        await this.$refs.upload.submit()
      }
    },
    async submit(){
      if (this.cerUrlNum === this.fileList.length){
        let result = await this.$axios.companyRealInfoController.enterpriseCertification({
          cerUrl:this.cerUrl
        })
        if(result.code === 20000){
          this.loading.close();
          let result1 = await this.$axios.userControllerList.getAuthInfo()
          this.certificateIinfo = "资质认证成功"
          this.cerUrl =result1.qualificationUrl
          await this.getAuthInfo()
        }
      }
    },
    async getAuthInfo(){
      let result = await this.$axios.userControllerList.getAuthInfo()
      if (result.code === 20000 && result.data){
        this.$store.commit('modQualification',{
          qualificationInfo:{
            address:result.data.address,
            businessScope:result.data.businessScope,
            companyName:result.data.companyName,
            qualificationUrl:result.data.qualificationUrl,
          },
          isQualification:1
        })
      }
    },
  },
  async mounted(){

  },
  computed:{
    isQualification(){
      return this.$store.getters.getUserInfo.isQualification
    },
    qualificationInfo(){
      return this.$store.getters.getRealauth.qualificationInfo;
    }
  }
}
</script>

<style scoped lang="scss">
.real-auth{
  width: 100%;
  min-height:500px;
  h3 {
    margin-bottom: 30px;
  }
  p {
    margin-bottom:40px;
  }
  .qualification-certificate-form {
    width: 70%;
  }
  .authentication-operation {
    width: 100%;
    margin-top: 30px;
    text-align: center;
  }
  .certificate-info {
    color: #6DBA14;
  }
  .qualification-certificate-yes-certified {
    .qualification-certificate-info {
      li {
        margin-bottom:30px;
        span {
          margin-left: 30px;
        }
      }
    }
    .qualification-certificate-item-img {
      display: flex;
      justify-content: flex-start;
      flex-width: wrap;
      img {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        cursor: pointer;
        line-height: 146px;
        vertical-align: top;
        margin-right: 10px;
      }
    }
  }
}

</style>
