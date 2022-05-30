<template>
  <div>
<el-upload
	class="upload-demo"
	action="/bh/stcsp/fileoss/upload"
  :auto-upload="true"
	:on-preview="handlePreview"
	:on-remove="handleRemove"
  :on-success="handleSuccess"
	:file-list="fileList"
	list-type="picture"
  :limit="1"
  :on-change="changeImage"
  :on-exceed="handleExceed"
  multiple
>
	<el-button size="small" type="primary" >点击上传</el-button>
	<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
</template>
<script>
	export default {
		name:'uploadImg',
		data() {
      return {
        image:"",
        fileList:[],
        filerReadyUploadList: [],
        fileRemoveList:[],

      }
		},

		methods: {
      handleRemove(file, fileList) {
        if (file?.status !== 'ready'){
          this.fileRemoveList.push(file)
        }
        this.fileList = fileList
      },
      handlePreview(file) {
        console.log(file);
      },
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
      changeImage(file,fileList){
        console.log(file);
        let options = {
          fileType:['jpg','png','jpeg'],
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
          this.image = response.data.url;
          sendData.url=this.image;
          this.$emit('sendImageUrl',sendData);
        }


        console.log(response.data);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
		}
	}
</script>