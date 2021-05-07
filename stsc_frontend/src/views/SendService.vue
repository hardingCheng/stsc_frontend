<template>
  <div class="send-service">
    <div class="container">
     <bread-crumb title="发服务"></bread-crumb>
      <div class="send-service-title">
        <h1>免费发布服务</h1>
      </div>
      <div class="send-service-form">
        <el-form ref="serviceform" :model="form" :rules="rules" label-position="right" label-width="100px" @submit.native.prevent >
          <div class="form-main">
            <span>服务基本信息</span>
            <el-form-item label="服务名称：" prop="name">
              <el-input v-model="form.name" placeholder="请填写需求名称"></el-input>
            </el-form-item>
            <el-form-item label="单位名称：" prop="company">
              <el-input v-model="form.company" placeholder="请填写需求单位"></el-input>
            </el-form-item>
            <el-form-item label="单位地址：" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <span>联系人信息</span>
            <el-form-item label="联系人：" prop="contact">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="telephone">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <span>服务价格及介绍</span>
            <el-form-item label="上传图片：">
              <el-upload
                  class="upload-demo"
                  ref="uploadimage"
                  action="/bh/stcsp/fileoss/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
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
            <el-form-item label="服务价格：" prop="price">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="服务工期：" prop="deadline">
              <el-input v-model="form.deadline"></el-input>
            </el-form-item>
            <el-form-item label="所属分类：" prop="categoryId" >
              <el-cascader :options="options"  v-model="category" :props="{ checkStrictly: true }" clearable ></el-cascader>
            </el-form-item>
            <!--            要进行修改的-->

            <el-form-item label="关键词：" prop="keywords">
              <el-input v-model="form.keywords"></el-input>
            </el-form-item>
            <el-form-item label="企业简介：" prop="companyIntroduction">
              <el-input type="textarea" v-model="form.companyIntroduction"></el-input>
            </el-form-item>
            <el-form-item label="服务简介：" prop="serviceDescription">
              <el-input type="textarea" v-model="form.serviceDescription"></el-input>
            </el-form-item>
            <el-form-item label="专家简介：" prop="expertIntroduction">
              <el-input type="textarea" v-model="form.expertIntroduction"></el-input>
            </el-form-item>
            <el-form-item label="上传附件：">
              <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="/bh/stcsp/fileoss/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :on-change = "changeUpload"
                  :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即发布</el-button>
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
  name: "SendService",
  components: {BreadCrumb},
  data() {
    return {
      form: {
        name: '',
        company: '',
        address:'',
        contact:'',
        telephone:'',
        price:'',
        deadline:'',
        companyIntroduction:'',
        serviceDescription:'',
        expertIntroduction:'',
        keywords:'',
        categoryId:'',
        attachment:'',
        image:''
      },
      rules: {
        name: [
          {required: true, message: '请输入服务名称', trigger: 'blur'},
        ],
        company: [
          {required: true, message: '请输入单位名称', trigger: 'blur'},
        ],
        address: [
          {required: true, message: '请输入单位地址', trigger: 'blur'},
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'},
        ],
        telephone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'},
        ],
        price: [
          {required: true, message: '请输入服务价格', trigger: 'blur'},
        ],
        deadline: [
          {required: true, message: '请输入服务工期', trigger: 'blur'},
        ],
        companyIntroduction: [
          {required: true, message: '请输入企业简介', trigger: 'blur'},
        ],
        serviceDescription: [
          {required: true, message: '请输入服务简介', trigger: 'blur'},
        ],
        expertIntroduction: [
          {required: true, message: '请输入专家简介', trigger: 'blur'},
        ],
        keywords: [
          {required: true, message: '请输入关键词', trigger: 'blur'},
        ],
        categoryId: [
          {required: true, message: '请输入所属分类', trigger: 'blur'},
        ],
      },
      fileList: [],
      fileList1: [],
      disabled:false,
      options: [],
      category:[]
    }
  },
  async mounted() {
     let result = await this.$axios.categoryControllerList.getCategory({})
     this.options = result.data.firstCategoryList
     this.options= JSON.parse(JSON.stringify(this.options).replace(/id/g,"value").replace(/name/g,"label"))
  },
  watch: {
    form:{
      async handler (newValue, oldName) {
        if (this.fileList.length!==0&&this.fileList1.length!==0){
          if (newValue.image!==''&&newValue.attachments!==''){
            let result = await this.$axios.serveControllerList.releaseServe(this.form)
            if (result.code === 20000){
              this.$message({
                message: '发布服务成功,请前往个人中心查看！',
                type: 'success'
              });
              await this.$router.push("/index")
            }
          }
        }else if (this.fileList.length!==0&&this.fileList1.length===0){
          if (newValue.attachments!==''){
            let result = await this.$axios.serveControllerList.releaseServe(this.form)
            if (result.code === 20000){
              this.$message({
                message: '发布服务成功,请前往个人中心查看！',
                type: 'success'
              });
              await this.$router.push("/index")
            }
          }
        }else if(this.fileList.length===0&&this.fileList1.length!==0){
          if (newValue.image!==''){
            let result = await this.$axios.serveControllerList.releaseServe(this.form)
            if (result.code === 20000){
              this.$message({
                message: '发布服务成功,请前往个人中心查看！',
                type: 'success'
              });
              await this.$router.push("/index")
            }
          }
        }
      },
      deep: true //对于对象设置为深度 监听
    }
  },
  methods: {
    async onSubmit() {
      this.form.categoryId = this.category.toString();
      await this.$refs['serviceform'].validate(async (valid) => {
        if (valid) {
          // this.disabled = true
          if(this.fileList1.length !== 0){
            this.$refs.uploadimage.submit();
          }
          if(this.fileList.length !== 0){
            this.$refs.upload.submit();
          }
          if(this.fileList.length === 0 && this.fileList1.length === 0){
            let result = await this.$axios.serveControllerList.releaseServe(this.form)
            if (result.code === 20000){
              this.$message({
                message: '发布服务成功,请前往个人中心查看！',
                type: 'success'
              });
              await this.$router.push("/index")
            }
          }
        } else {
          return false;
        }
      });
    },
    async handleSuccess(response, file, fileList) {
      if (response.code === 20000 && response.data.url !== "") {
        this.form.attachment = response.data.url
      }
    },
    async handleSuccess1(response, file, fileList) {
      if (response.code === 20000 && response.data.url !== "") {
        this.form.image = response.data.url
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    changeUpload(file,fileList){
      this.fileList = fileList;
    },
    changeUpload1(file,fileList){
      this.fileList1 = fileList;
    }
  }
};
</script>

<style lang="scss" scoped>
.send-service {
  .container {
    .send-service-title {
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
    .send-service-form {
      .form-main {
        width:60%;
        span {
          display:inline-block;
          margin-bottom: 20px;
        }
        .line {
          margin-left:10px;
        }
        /deep/ .el-textarea .el-textarea__inner {
          height:127px;
        }
        /deep/ .el-cascader {
          width:200px;
        }
      }
    }
  }
}
</style>
