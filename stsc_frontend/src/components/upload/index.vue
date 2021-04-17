<template>
  <div class="footer">
    <div class="title">
      <el-upload
          multiple
          :limit="3"
          list-type="picture-card"
          :on-progress="onProcess"
          action="https://jsonplaceholder.typicode.com/posts/"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :on-success="onSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="file">
        <div  v-for="(item,index) in fileArr" :key="index">
          <span><i class="bg"></i>{{item.name}}</span>
          <div  v-if="item.progressFlag">
            <el-progress :percentage="item.progressPercent"></el-progress>
          </div>
          <span v-else-if="item.successFlag">上传成功!</span>
          <span v-else>上传失败!</span>
          <span>{{item.size}}</span>
          <div v-if="item.progressFlag">
            <span>[删除]</span>
            <span>[下载]</span>
          </div>
          <div v-else>
            <span @click="removeFile(item,index)">[删除]</span>
            <span @click="downLoadFile(item,index)">[下载]</span>
          </div>
        </div>
      </div>
      <com-pdf-show ref="comPdfShowRef"></com-pdf-show>
    </div>
  </div>
</template>

<script>
import comPdfShow from '../../components/comPdfShow';
export default {
  name: "VueUpload",
  props: {
    multiple: { // 是否可以上传多个，默认true，非必传
      type: Boolean,
      default: true,
    },
    drag: { // 是否可拖拽，默认false，非必传
      type: Boolean,
      default: false,
    },
    accept: { // 上传文件的格式限制，默认不限制，非必传
      type: String,
      default: 'image/jpg,image/jpeg,image/png,application/pdf',
    },
    accepts: { // 当drag为true时，accept设置的话拖拽无效，故加此属性限制文件格式，在上传前校验；默认不限制，非必传
      type: String,
      default: '',
    },
    acceptText: String, // 上传文件格式限制文字说明，放入提示语中用来展示；默认空，非必传。
    action: { // 上传文件地址，默认'/upload'；非必传
      type: String,
      default: '/upload',
    },
    disabled: { // 是否禁用，默认false；非必传
      type: Boolean,
      default: false,
    },
    limit: Number, // 最大允许上传个数，默认不限制，非必传
    size: Number, // 最大允许上传文件大小，单位为MB，默认不限制，非必传
    initFiles: String, // 初始化附件数据数组JSON串，默认空，非必传
    paramsData: String, // 上传文件时附带的额外参数对象JSON串，默认空，非必传
    buttons: String, // 额外按钮数组JSON串，默认空，非必传
    tips: String, // 额外需添加的提示语，默认空，非必传
  },
  data() {
    return {
      fileList: [],
      data: {},
      buttonList: [],
      fileArr:[],
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ]
    }
  },
  components:{
    comPdfShow
  },
  methods: {
    beforeUpload(file){
      console.log(file)
      const isFileFormat = ["image/jpg","image/jpeg","image/png","application/pdf"].includes(file.type);
      const isLt10M = file.size / 1024 / 1024 < 1000;
      if (!isFileFormat) {
        this.$message.error({
          message:file.name+'上传文件只能是 JPG,PNG,PDF 格式!',
          offset:40
        });
      }
      if (!isLt10M) {
        this.$message.error({
          message:file.name+'上传文件大小不能超过 20MB!',
          offset:40
        });
      }
      return isFileFormat && isLt10M;
    },
    onPreview(){

    },
    onProcess(event, file, fileList){
      this.fileArr = fileList
      this.fileArr.forEach(item=>{
        if (item.percentage === 100) {

        } else {
          item.progressFlag = true
          item.progressPercent = Math.abs(item.percentage.toFixed(0));
        }
      })
    },
    onSuccess(event, file, fileList){
      this.fileArr = fileList
      this.fileArr.forEach((item,index)=>{
        item.progressFlag = false
        if(item.status === 'success'){
          item.successFlag = true
        }else{
          item.successFlag = false
        }
      })
    },
    //删除文件(基于文件列表的数据进行操作)
    removeFile(item,index){
      this.fileArr.splice(index,1)
    },
    //下载文件(基于文件列表的数据进行操作)
    downLoadFile(item,index){

    }
  }
}
</script>

<style scoped>
  /deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100%;
    height: 100%;
  }
</style>


<!--<template>-->
<!--  <div>-->
<!--    <el-upload-->
<!--        multiple-->
<!--        :limit="3"-->
<!--        list-type="picture-card"-->
<!--        :on-progress="handleProgerss"-->
<!--        :action="uploadUrl">-->
<!--      <i slot="default" class="el-icon-plus avatar-uploader-icon"></i>-->
<!--      <div slot="file" slot-scope="{file}">-->
<!--        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">-->
<!--        <div class="el-progress el-progress-custom" v-if="file.progressPercent < 100">-->
<!--          &lt;!&ndash;自定义进度条写在这里，你喜欢加啥都行，反正进度数字在下面๑乛◡乛๑&ndash;&gt;-->

<!--          <el-progress type="circle" :percentage="file.progressPercent"></el-progress>-->
<!--        </div>-->
<!--        <span class="el-upload-list__item-actions">-->
<!--                    <span class="el-upload-list__item-preview" @click="handlePreview(file)">-->
<!--                    <i class="el-icon-zoom-in"></i>-->
<!--                    </span>-->

<!--                    <span class="el-upload-list__item-delete" @click="handleDownload(file)">-->
<!--                    <i class="el-icon-download"></i>-->
<!--                    </span>-->

<!--                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">-->
<!--                      <i class="el-icon-delete"></i>-->
<!--                    </span>-->
<!--                </span>-->
<!--      </div>-->
<!--    </el-upload>-->
<!--    &lt;!&ndash; pdf预览组件 &ndash;&gt;-->
<!--    <com-pdf-show ref="comPdfShowThis"></com-pdf-show>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import ComPdfShow from '../../components/comPdfShow'-->
<!--export default {-->
<!--  name: 'ElementUiLab',-->
<!--  data() {-->
<!--    return {-->
<!--      uploadUrl: "https://jsonplaceholder.typicode.com/posts/",-->
<!--    }-->
<!--  },-->
<!--  filters: {-->
<!--    percent(val) {-->
<!--      return Number.parseInt(val) + '%';-->
<!--    }-->
<!--  },-->
<!--  components:{-->
<!--    ComPdfShow-->
<!--  },-->
<!--  methods: {-->
<!--    handleProgerss(event, file, fileList) {-->
<!--      console.log(event, file, fileList);-->
<!--      this.fileArr = fileList-->
<!--      this.fileArr.forEach(item=>{-->
<!--        if (item.percentage === 100) {-->

<!--        } else {-->
<!--          item.progressFlag = true-->
<!--          item.progressPercent = Math.abs(item.percentage.toFixed(0));-->
<!--        }-->
<!--      })-->

<!--    },-->

<!--    handlePreview(file) {-->
<!--      this.$refs.comPdfShowThis.previewPDF(file)-->
<!--    },-->

<!--    handleDownload(file) {-->
<!--      console.log(file);-->
<!--    },-->

<!--    handleRemove(file) {-->
<!--      console.log(file);-->
<!--    },-->
<!--  },-->
<!--  created() {},-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--.avatar-uploader-icon {-->
<!--  font-size: 28px;-->
<!--  color: #8c939d;-->
<!--  width: 148px;-->
<!--  height: 148px;-->
<!--  line-height: 148px;-->
<!--  text-align: center;-->
<!--}-->

<!--.el-upload-list&#45;&#45;picture-card .el-progress-custom {-->
<!--  width: 148px;-->
<!--  height: 148px;-->
<!--  line-height: 148px;-->
<!--  text-align: center;-->
<!--  color: #818181;-->
<!--  background-color: rgba(0, 0, 0, .8);-->
<!--}-->
<!--</style>-->
