/* eslint-disable */
<template>
	<el-upload
      drag
		class="upload-demo"
		action="/bh/stcsp/fileoss/upload"
		:show-file-list="true"
		:before-upload="beforeUpload"
    :auto-upload="true"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :file-list="fileList"
    list-type="text"
    :limit="1"
    :on-change="changeAttachment"
    :on-exceed="handleExceed"
    multiple
	>
	<i class="el-icon-upload"></i>
	<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不能大于10MB</div>
	</el-upload>

	
</template>

<script>
export default {
  name: "fileUpload",
  // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  data() {
    return {
      attachment:"",
      fileList:[],
      filerReadyUploadList: [],
      fileRemoveList:[],

    }
  },

  methods: {
    beforeUpload(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      if (file?.status !== 'ready'){
        this.fileRemoveList.push(file)
      }
      this.fileList = fileList
    },
    // handlePreview(file) {
    //   console.log(file);
    // },
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
    changeAttachment(file,fileList){
      console.log(file);
      let options = {
        fileType:['pdf'],
        fileSize:10
      }
      let fileResult = this.fileLimit(file,options);
      if (fileResult) {
        if(file.status === "ready") {
          this.filerReadyUploadList.push(file)
        }
      }else {
        this.fileList = [];
      }


      // var data ={
      //   url:''
      // };
      //
      // data['url'] = this.fileList[0]["url"];
      // console.log(data);
      // this.$emit('showUrl',data);
    },
    handleSuccess(response,list,fileList){
      console.log('in handlesuccess');
      var sendData = {
        url:''
      };
      if (response.code === 20000 && response.data.url !== "") {
        this.attachment = response.data.url;
        sendData.url=this.attachment;
        this.$emit('sendAttachmentUrl',sendData);
      }


      console.log(response.data);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
  }
}
</script>