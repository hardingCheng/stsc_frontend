<template>
		<div class="demo-drawer__content">

		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="名称"
                    prop="name"
                    :rules="{
        required: true, message: '实验室名称不能为空', trigger: 'blur'
      }">
			<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="简介"
                    prop="introduction"
                    :rules="{required: true, message: '简介不能为空', trigger: 'blur' }">
			<el-input v-model="form.introduction"></el-input>
			</el-form-item>
			
			<el-form-item label="图片"
                    prop="imgurl"
                    :rules="{required: true, message: '图片不能为空', trigger: 'blur' }">
			<upload-img @sendImageUrl="updateImageUrl" ></upload-img>
			</el-form-item>
			
			<el-form-item label="分类"
                    prop="category"
                    :rules="{
        required: true, message: '简介不能为空', trigger: 'blur'
      }">
			<el-select v-model="form.category" placeholder="请选择分类">
			<el-option label="知识产权" value="1"></el-option>
			<el-option label="检验检测" value="2"></el-option>
        <el-option label="研究开发" value="3"></el-option>
        <el-option label="技术转移" value="4"></el-option>
			</el-select>
			</el-form-item>

      <el-form-item label="添加服务" ><el-button @click="addMission">添加服务</el-button></el-form-item>

      <el-form-item
            v-for="(mission, index) in form.missions"
            :label="'服务' + (index+1)"
            :key="mission.key"
            :prop="'missions.' + index+'.value'"
            :rules="{
      required: true, message: '服务不能为空', trigger: 'blur'
    }"
        >
        <el-input v-model="mission.value" ></el-input>

        <el-button @click.prevent="removeMission(mission)">删除服务</el-button>
      </el-form-item>

			<el-form-item label="上传附件"
                    prop="attachments"
                    :rules="{
        required: true, message: '简介不能为空', trigger: 'blur'
      }">
      <file-upload @sendAttachmentUrl="updateAttachmentUrl">file</file-upload>

      </el-form-item>
		</el-form>

		<div class="demo-drawer__footer">
		<el-button @click="resetForm('form')">重置</el-button>
		<el-button type="primary" @click="submitForm('form')">创建虚拟实验室</el-button>
		</div>

	</div>
</template>

<script>
	import UploadImg from './UploadImg.vue'
	import FileUpload from './FileUpload.vue'
  import axios from "../../../api/api";
	export default {
		name:'CreateLab',
		components:{
			UploadImg,
			FileUpload
		},
		data() {
		return {
			onSubmit:false,
			form: {
				name: '',
        missions:[{
          value:''
        }],
				introduction :'',
        invitedId:"",
        leaderId:"",
        memberId:"",
        imgurl:"",
				category:'',
        id:"",
        attachments:"",
			}
		}
		},
		methods: {
			updateImageUrl(recieveImage)
      {
        this.form.imgurl = recieveImage.url;
        // this.showLog();
			},
      updateAttachmentUrl(recieveAttachment)
      {
        this.form.attachments=recieveAttachment.url;
        console.log("in updateAttachment: "+this.form.attachments);
      },
			showLog(){

				console.log(this.form)
			},

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeMission(item) {
        var index = this.form.missions.indexOf(item)
        if (index !== -1) {
          this.form.missions.splice(index, 1)
        }
      },
      addMission() {
        this.form.missions.push({
              value:"",
              // key: Date.now()
        }
        );
        console.log(this.form.missions)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
              if (valid) {

                var temForm = {
                  name: this.form.name,
                  missions: JSON.stringify(this.form.missions),
                  introduction: this.form.introduction,
                  invitedId: this.form.invitedId,
                  leaderId: this.form.leaderId,
                  memberId: this.form.memberId,
                  imgurl: this.form.imgurl,
                  category: this.form.category,
                  id: this.form.id,
                  attachments: this.form.attachments,
                };
                console.log(temForm);
                this.sendData(temForm).then((response) => {
                  console.log(response.code);
                  if(response.code==20000)
                  {
                    alert(response.message);
                  }
                  else {
                    alert(response.message);
                  }

                });
              } else {
                alert('请将表单填写完整')
                console.log('error submit!!');
                return false;
              }
        });

      }
      ,
      sendData(data)
      {
        return axios({
          url: "/ph/stcsp/virtuallab/create",
          method: "post",
          data
        });
      }
		}
	}
</script>

<style>
.demo-drawer__footer{text-align: center;}
</style>
