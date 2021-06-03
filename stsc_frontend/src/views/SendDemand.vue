<template>
<!--  发服务有BUG   就是那个监听的form修改导致自动提交-->
  <div class="send-demand">
    <div class="container">
     <bread-crumb :info="info"></bread-crumb>
      <div class="send-demand-title">
        <h1>免费发布需求</h1>
      </div>
      <div class="send-demand-form">
        <el-form ref="demandform" :model="form" :rules="rules"  label-position="right" label-width="100px" @submit.native.prevent >
        <div class="form-main">
          <span class="form-group-title">需求基本信息</span>
          <el-form-item label="需求名称：" prop="name">
            <el-input v-model="form.name" placeholder="请填写需求名称"></el-input>
          </el-form-item>
          <el-form-item label="需求单位：" prop="company">
            <el-input v-model="form.company" placeholder="请填写需求单位"></el-input>
          </el-form-item>
          <span class="form-group-title">联系人信息</span>
          <el-form-item label="联系人：" prop="contact">
            <el-input v-model="form.contact" placeholder="请填写联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="telephone">
            <el-input v-model="form.telephone" placeholder="请填写联系方式"></el-input>
          </el-form-item>
          <el-form-item label="联系地址：" prop="address">
            <el-input v-model="form.address" placeholder="请填写联系地址"></el-input>
          </el-form-item>
          <span class="form-group-title">需求预算及背景</span>
<!--          需要修改 文件大小和类型-->
          <el-form-item label="上传图片：">
            <el-upload
                class="upload-demo"
                ref="uploadimage"
                action="/ph/stcsp/fileoss/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove1"
                :on-success="handleSuccess1"
                :file-list="fileList1"
                :auto-upload="false"
                list-type="picture"
                :on-change = "changeUpload1"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
              <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
          </el-form-item>
          <el-form-item label="预算价格：" prop="budget">
            <el-input-number v-model="form.budget" :precision="2" :step="0.1" :max="1000"></el-input-number>  万
          </el-form-item>
          <el-form-item label="项目背景：" prop="projectBackground">
            <el-input type="textarea" v-model="form.projectBackground" placeholder="请填写项目背景"></el-input>
          </el-form-item>
          <el-form-item label="需求内容：" prop="content">
            <el-input type="textarea" v-model="form.content" placeholder="请填写需求内容"></el-input>
          </el-form-item>
          <el-form-item label="验收指标：" prop="standard">
            <el-input type="textarea" v-model="form.standard" placeholder="请填写验收指标"></el-input>
          </el-form-item>
          <el-form-item label="需求时间：" prop="deadline">
            <el-date-picker
                v-model="form.deadline"
                placeholder="选择需求结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format ="yyyy-MM-dd ">
            </el-date-picker>
          </el-form-item>
          <!--            要进行修改的-->
          <el-form-item label="上传附件：">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="/ph/stcsp/fileoss/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="fileList"
                :auto-upload="false"
                :on-change = "changeUpload"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="disabled" @click="onSubmit" v-if="!id">立即发布</el-button>
            <el-button type="primary" :disabled="disabled" @click="onUpdate" v-else>立即更新</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb";
export default {
  props:['id'],
  name: "SendDemand",
  components: {BreadCrumb},
  data() {
    return {
      form: {
        name: '4',
        company: '4',
        budget: 4,
        projectBackground: '4',
        content: '4',
        contact: '4',
        telephone: '4',
        address: '4',
        standard: '4',
        deadline: '',
        attachments: '',
        image: ''
      },
      deadlinetiem:'',
      disabled:false,
      rules: {
        name: [
          {required: true, message: '请输入需求名称', trigger: 'blur'}
        ],
        company: [
          {required: true, message: '请输入需求单位', trigger: 'blur'}
        ],
        budget: [
          {required: true, message: '请输入预算价格', trigger: 'blur'}
        ],
        projectBackground: [
          {required: true, message: '请输入项目背景', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入需求内容', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入联系方式', trigger: 'blur'}
        ],
        standard: [
          {required: true, message: '请输入验收指标', trigger: 'blur'}
        ],
        deadline: [
          {required: true, message: '请输入需求期限', trigger: 'blur'}
        ],
      },
      fileList: [],
      fileList1: [],
      info:[{
        title:'发需求',
        path:''
      }],
      fileRemoveList:[],
      filerReadyUploadList: [],
      filerReadyUploadList1: [],
      updateStatus:false,
    }
  },
  computed:{
  },
  watch: {
    form:{
      async handler (newValue, oldName) {
       if(!this.updateStatus){
         if (this.filerReadyUploadList1.length!==0&&this.filerReadyUploadList.length!==0){
           if (newValue.image!==''&&newValue.attachments!==''){
             await this.releaseRequire()
           }
         }else if (this.filerReadyUploadList.length!==0&&this.filerReadyUploadList1.length===0){
           if (newValue.attachments!==''){
             await this.releaseRequire()
           }
         }else if(this.filerReadyUploadList.length===0&&this.filerReadyUploadList1.length!==0){
           if (newValue.image!==''){
             await this.releaseRequire()
           }
         }
       }else {
         if (this.filerReadyUploadList1.length!==0&&this.filerReadyUploadList.length!==0){
           if (newValue.image!==''&&newValue.attachments!==''){
             await this.releaseRequire()
           }
         }else if (this.filerReadyUploadList.length!==0&&this.filerReadyUploadList1.length===0){
           if (newValue.attachments!==''){
              await this.releaseRequire()
           }
         }else if(this.filerReadyUploadList.length===0&&this.filerReadyUploadList1.length!==0){
           if (newValue.image!==''){
              await this.releaseRequire()
           }
         }
       }
      },
      deep: true //对于对象设置为深度 监听
    },
    $route(to,from){
      if(to.path === '/sd'){
        this.form = {
          name: '4',
          company: '4',
          budget: 4,
          projectBackground: '4',
          content: '4',
          contact: '4',
          telephone: '4',
          address: '4',
          standard: '4',
          deadline: '',
          attachments: '',
          image: ''
        }
        this.fileList = []
        this.fileList1 = []
      }
    },
  },
  methods: {
    async onSubmit() {
      await this.$refs['demandform'].validate(async (valid) => {
        if (valid) {
          // this.disabled = true
          // this.getDays(this.deadlinetiem[0],this.deadlinetiem[1])
          if(this.filerReadyUploadList1.length !== 0){
            await this.$refs.uploadimage.submit();
          }
          if(this.filerReadyUploadList.length !== 0){
            await this.$refs.upload.submit();
          }
          if(this.filerReadyUploadList1.length === 0 && this.filerReadyUploadList.length === 0){
            await this.releaseRequire()
          }
        }
      });
    },
    // 发布需求
    async releaseRequire(){
      let result =  await this.$axios.requirementControllerList.releaseRequire(this.form)
      if (result.code === 20000){
        this.$message({
          message: '修改需求成功,请前往个人中心查看！',
          type: 'success'
        });
        await this.$router.push("/buyer/mydemand")
      }
    },
    async handleSuccess(response, file, fileList) {
      if (response.code === 20000 && response.data.url !== "") {
        this.form.attachments = response.data.url
      }
    },
    async handleSuccess1(response, file, fileList) {
      if (response.code === 20000 && response.data.url !== "") {
        this.form.image = response.data.url
      }
    },
    async handleRemove1(file, fileList) {
      if (file?.status !== 'ready'){
        this.fileRemoveList.push(file)
      }
      this.fileList1 = fileList
    },
    async handleRemove(file, fileList) {
      if (file?.status !== 'ready'){
        this.fileRemoveList.push(file)
      }
      this.fileList = fileList
    },
    async onUpdate(){
      this.updateStatus = true
      if (this.fileRemoveList.length !== 0){
        await this.fileRemoveList.map(async(item)=>{
          let result = await this.$axios.ossControllerList.delFile({
            filename:item.name
          })
        })
      }
      if(this.filerReadyUploadList1.length !== 0){
        await this.$refs.uploadimage.submit();
      }
      if(this.filerReadyUploadList.length !== 0){
        await this.$refs.upload.submit();
      }
      if (this.filerReadyUploadList1.length === 0 && this.filerReadyUploadList.length === 0){
        let result =  await this.$axios.requirementControllerList.updateRequireById(this.form)
        if (result.code === 20000){
          await this.$router.push("/buyer/mydemand")
        }
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    changeUpload(file,fileList){
      if(file.status === "ready") {
        this.filerReadyUploadList.push(file)
      }
    },
    changeUpload1(file,fileList){
      if(file.status === "ready") {
        this.filerReadyUploadList1.push(file)
      }
    },
    // 获取更新数据
    async getUpdateRequirement(){
      let result = await this.$axios.requirementControllerList.getRequireDetailById({
        id:this.id
      })
      this.form = result.data.requirement
      if (result.data.requirement.attachments){
        let urlArr = result.data.requirement.attachments.split('/').slice(-1)[0]
        this.fileList.push({
          name:urlArr,
          url:result.data.requirement.attachments
        })
      }
      if (result.data.requirement.image){
        let urlArr = result.data.requirement.image.split('/').slice(-1)[0]
        this.fileList1.push({
          name:urlArr,
          url:result.data.requirement.image
        })
      }
    }
  },
  async mounted(){
    // 修改需求的情况
    if (this.id) {
      await this.getUpdateRequirement()
    }
  }
}
</script>

<style lang="scss" scoped>
.send-demand {
  .container {
    .send-demand-title {
      position:relative;
      height: 50px;
      line-height: 50px;
      background: #F1F1F1;
      margin-bottom: 40px;
      h1 {
        font-size: 18px;
        font-weight: 500;
        color: #333333;
        margin-left:20px;
      }
      &::after {
        content: "";
        position:absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 4px;
        height: 18px;
        background: #1794FF;
      }
    }
    .send-demand-form {
      .form-main {
        width:60%;
        .form-group-title {
          display:inline-block;
          margin-bottom: 20px;
        }
        .line {
          margin-left:10px;
        }
        /deep/ .el-date-editor--daterange.el-input__inner{
          width:480px;
        }
        /deep/ .el-textarea .el-textarea__inner {
          height:127px;
        }
      }
    }
  }
}
</style>
