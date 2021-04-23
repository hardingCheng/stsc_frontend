<template>
  <div class="send-demand">
    <div class="container">
      <div class="send-demand-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发需求</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="send-demand-title">
        <h1>免费发布需求</h1>
      </div>
      <div class="send-demand-form">
        <el-form ref="demandform" :model="form" :rules="rules" label-position="right" label-width="100px" @submit.native.prevent >
        <div class="form-main">
          <div class="form-main-left">
            <el-form-item label="需求名称：" prop="name">
              <el-input v-model="form.name" placeholder="请填写需求名称"></el-input>
            </el-form-item>
            <el-form-item label="需求单位：" prop="company">
              <el-input v-model="form.company" placeholder="请填写需求单位"></el-input>
            </el-form-item>
            <el-form-item label="预算价格：" prop="budget">
              <el-input v-model="form.budget" placeholder="请填写预算价格(例：20万元)"></el-input>
            </el-form-item>
            <el-form-item label="项目背景：" prop="projectBackground">
              <el-input type="textarea" v-model="form.projectBackground" placeholder="请填写项目背景"></el-input>
            </el-form-item>
            <el-form-item label="需求内容：" prop="content">
              <el-input type="textarea" v-model="form.content" placeholder="请填写需求内容"></el-input>
            </el-form-item>
<!--            要进行修改的-->
            <el-form-item label="上传附件：">
              <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="/bh/stcsp/fileoss/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :auto-upload="false"
                  :on-change = "changeUpload"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
<!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="disabled" @click="onSubmit">立即发布</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </div>
          <div class="form-main-right">
            <el-form-item label="联系人：" prop="contact">
              <el-input v-model="form.contact" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="telephone">
              <el-input v-model="form.telephone" placeholder="请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="联系地址：" prop="address">
              <el-input v-model="form.address" placeholder="请填写联系地址"></el-input>
            </el-form-item>
            <el-form-item label="验收指标：" prop="standard">
              <el-input type="textarea" v-model="form.standard" placeholder="请填写验收指标"></el-input>
            </el-form-item>
            <el-form-item label="需求时间：" prop="deadline">
              <el-date-picker
                  @change="handDate"
                  v-model="deadlinetiem"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format ="yyyy-MM-dd ">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendDemand",
  data() {
    return {
      form: {
        name: '',
        company: '',
        budget: '',
        projectBackground: '',
        content: '',
        contact: '',
        telephone: '',
        address: '',
        standard: '',
        deadline: '',
        attachments: '',
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
      fileList: []
    }
  },
  watch: {
    'form.attachments': {
      async handler (newName, oldName) {
        if (newName!==''){
          let result = await this.$axios.requirementControllerList.releaseRequire(this.form)
          if (result.code === 20000){
            console.log(result)
            this.$message({
              message: '发布需求成功,请前往个人中心查看！',
              type: 'success'
            });
            await this.$router.push("/index")
          }
        }
      }
    }
  },
  methods: {
    async onSubmit() {
      await this.$refs['demandform'].validate(async (valid) => {
        if (valid) {
          // this.disabled = true
          this.getDays(this.deadlinetiem[0],this.deadlinetiem[1])
          if(this.fileList.length !== 0){
            this.$refs.upload.submit();
          }else {
            let result =  await this.$axios.requirementControllerList.releaseRequire(this.form)
            if (result.code === 20000){
              console.log(result)
              this.$message({
                message: '发布需求成功,请前往个人中心查看！',
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
        this.form.attachments = response.data.url
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handDate(){
      this.getDays(this.deadlinetiem[0],this.deadlinetiem[1])
    },
    getDays(date1 , date2){
      let date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
      //根据年 . 月 . 日的值创建Date对象
      let date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
      let date2Str = date2.split("-");
      let date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
      let t1 = date1Obj.getTime();
      let t2 = date2Obj.getTime();
      let dateTime = 1000*60*60*24; //每一天的毫秒数
      let minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
      let days = Math.abs(minusDays);//取绝对值
      this.form.deadline =  days;
    },
    changeUpload(file,fileList){
      this.fileList = fileList;
    }
  }
}
</script>

<style lang="scss" scoped>
.send-demand {
  .container {
    .send-demand-breadcrumb {
      /deep/ .el-breadcrumb {
        height:57px;
        line-height:57px;
      }
    }
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
        display:flex;
        justify-content:space-between;
        .form-main-left {
          width:480px;
        }
        .form-main-right {
          width:480px;
          .line {
            margin-left:10px;
          }
          /deep/ .el-date-editor--daterange.el-input__inner{
            width:100%;
          }
        }
        /deep/ .el-textarea .el-textarea__inner {
          height:127px;
        }
      }
    }
  }
}
</style>
