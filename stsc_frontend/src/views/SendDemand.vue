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
        <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="100px" @submit.native.prevent >
        <div class="form-main">
          <div class="form-main-left">
            <el-form-item label="需求名称：" prop="name">
              <el-input v-model="form.name" placeholder="请填写需求名称"></el-input>
            </el-form-item>
            <el-form-item label="需求单位：">
              <el-input v-model="form.name" placeholder="请填写需求单位"></el-input>
            </el-form-item>
            <el-form-item label="预算价格：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目背景：">
              <el-input type="textarea" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="需求内容：">
              <el-input type="textarea" v-model="form.name"></el-input>
            </el-form-item>
<!--            要进行修改的-->
            <el-form-item label="上传附件：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即发布</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </div>
          <div class="form-main-right">
            <el-form-item label="联系人：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系地址：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="验收指标：">
              <el-input type="textarea" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="需求时间：">
              <el-date-picker
                  v-model="form.desc"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
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
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入需求名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
};
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
