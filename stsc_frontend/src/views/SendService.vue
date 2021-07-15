<template>
  <div class="send-service">
    <div class="container">
     <bread-crumb :info="info"></bread-crumb>
      <div class="send-service-title">
        <h1>{{id ? '更新发布服务':'免费发布服务'}}</h1>
      </div>
      <div class="send-service-form">
        <el-form ref="serviceform" :model="form" :rules="rules" label-position="right" label-width="100px" @submit.native.prevent >
          <div class="form-main">
            <span class="form-group-title">服务基本信息</span>
            <el-form-item label="服务名称：" prop="name">
              <el-input v-model="form.name" placeholder="请填写服务名称"></el-input>
            </el-form-item>
            <el-form-item label="单位名称：" prop="company">
              <span>{{ form.company }}</span>
            </el-form-item>
            <el-form-item label="单位地址：" prop="address">
              <span>{{ form.address }}</span>
            </el-form-item>
            <span class="form-group-title">联系人信息</span>
            <el-form-item label="联系人：" prop="contact">
              <el-input style="width:300px" v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="telephone">
              <el-input style="width:300px" v-model="form.telephone"></el-input>
            </el-form-item>
            <span class="form-group-title">服务价格及介绍</span>
            <el-form-item label="上传图片：">
              <el-upload
                  class="upload-demo"
                  ref="uploadimage"
                  action="/bh/stcsp/fileoss/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove1"
                  :on-success="handleSuccess1"
                  :file-list="fileList1"
                  :auto-upload="false"
                  list-type="picture"
                  :limit="1"
                  :on-change = "changeUpload1"
                  :on-exceed="handleExceed1"
                  multiple
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过10M。</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="服务价格：" prop="price">
              <el-select v-model="priceType.type" placeholder="请选择" >
                <el-option
                    v-for="item in priceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <template v-if="priceType.type === 2" >
                <el-input-number style="margin-left: 10px;" v-model="form.price" :precision="2" :step="0.1" :max="10000"></el-input-number> 万
              </template>
              <template v-if="priceType.type === 3" >
                <el-input-number style="margin-left: 10px;" v-model="price.startPrice" :precision="2" :step="0.1" :max="10000"></el-input-number> -
                <el-input-number  v-model="price.endPrice":precision="2" :step="0.1" :max="10000"></el-input-number> 万
              </template>
              <div class="el-form-item__error" v-if="errors.priceError">{{errors.priceError}}</div>
            </el-form-item>
            <el-form-item label="服务工期：" prop="deadline">
              <el-input style="width:200px" v-model="form.deadline"></el-input> 天
            </el-form-item>
            <el-form-item label="所属分类：" prop="categoryId" >
              <el-cascader :options="options"  v-model="category" :props="{ checkStrictly: true }" clearable ></el-cascader>
            </el-form-item>
            <!--            要进行修改的-->

            <el-form-item label="关键词：" prop="keywords">
<!--              <el-input v-model="form.keywords"></el-input>-->
              <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 关键字</el-button>
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
                <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过10M。</div>
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
  name: "SendService",
  components: {BreadCrumb},
  data() {
    return {
      form: {
        name: '',
        company: this.$store.getters.getRealauth.qualificationInfo.companyName,
        address: this.$store.getters.getRealauth.qualificationInfo.address,
        contact:'',
        telephone:'',
        price:0,
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
        // company: [
        //   {required: true, message: '请输入单位名称', trigger: 'blur'},
        // ],
        // address: [
        //   {required: true, message: '请输入单位地址', trigger: 'blur'},
        // ],
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
        // keywords: [
        //   {required: true, message: '请输入关键词', trigger: 'blur'},
        // ],
        categoryId: [
          {required: true, message: '请输入所属分类', trigger: 'blur'},
        ],
      },
      fileList: [],
      fileList1: [],
      disabled:false,
      options: [],
      priceOptions:[{
        value: 1,
        label: '面议'
      },{
        value: 2,
        label: '服务价格确定'
      },{
        value: 3,
        label: '服务价格范围'
      }],
      category:[],
      info:[{
        title:'发服务',
        path:''
      }],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      fileRemoveList:[],
      filerReadyUploadList: [],
      filerReadyUploadList1: [],
      updateStatus:false,
      loading:{},
      priceType:{
        type: 1,
      },
      price:{
        startPrice:0,
        endPrice:0
      },
      errors:{
        priceError:""
      }
    }
  },
  async mounted() {
    if (this.userInfo.isQualification === 1) {
      // 获取服务分类
      await this.getCategory()
      // 修改服务信息
      if (this.id) {
        await this.getServesDetailById()
      }
    }else {
      this.$message({
        message: '请先进行资质认证！才可以进行发服务。',
        type: 'error'
      })
      await this.$router.push('/pc/seller/realauth')
    }
  },
  watch: {
    form:{
      deep: true,//对于对象设置为深度 监听
      // 用来监听我们上传文件的url返回来
      async handler (newValue, oldName) {
        if(!this.updateStatus){
          if (this.filerReadyUploadList1.length!==0&&this.filerReadyUploadList.length!==0){
            if (newValue.image!==''&&newValue.attachment!==''){
              await this.releaseServe()
            }
          }else if (this.filerReadyUploadList.length!==0&&this.filerReadyUploadList1.length===0){
            if (newValue.attachment!==''){
              await this.releaseServe()
            }
          }else if(this.filerReadyUploadList.length===0&&this.filerReadyUploadList1.length!==0){
            if (newValue.image!==''){
              await this.releaseServe()
            }
          }
        }else {
          if (this.filerReadyUploadList1.length!==0&&this.filerReadyUploadList.length!==0){
            if (newValue.image!==''&&newValue.attachment!==''){
              await this.updateServe()
            }
          }else if (this.filerReadyUploadList.length!==0&&this.filerReadyUploadList1.length===0){
            if (newValue.attachment!==''){
              await this.updateServe()
            }
          }else if(this.filerReadyUploadList.length===0&&this.filerReadyUploadList1.length!==0){
            if (newValue.image!==''){
                await this.updateServe()
            }
          }
        }
      },
    },
    priceType:{
      deep:true,
      handler(newValue,oldValue){
        if(newValue.type === 1) {
          this.form.price = '面议'
        }else if (newValue.type === 2) {
          // this.form.price = '面议'
        }else {
          // el-form-item__error
          this.form.price =`${this.price.startPrice},${this.price.endPrice}`
        }
      }
    },
    price:{
      deep:true,
      handler(newValue,oldValue){
        if (newValue.startPrice >=  newValue.endPrice){
          this.errors.priceError = "价格区间错误"
        }else {
          this.form.price =`${this.price.startPrice},${this.price.endPrice}`
          this.errors.priceError = ""
        }
      }
    }
  },
  computed: {
    formUrlObj(){
      return {
        attachment:this.form.attachment,
        image:this.form.image
      }
    },
    userInfo(){
      return this.$store.getters.getUserInfo
    },
  },
  methods:{
    //  获取修改数据
    async getServesDetailById(){
      let servesDetailResult = await this.$axios.serveControllerList.getServesDetailById({
        id:this.id
      })
      this.form = servesDetailResult.data.serve
      const {categoryId,keywords,attachment,image} = servesDetailResult.data.serve
      this.category = categoryId.split(',')
      this.dynamicTags = keywords.split(',')
      if (attachment){
        let urlArr = attachment.split('/').slice(-1)[0]
        this.fileList.push({
          name:urlArr,
          url:attachment
        })
      }
      if (image){
        let urlArr = image.split('/').slice(-1)[0]
        this.fileList1.push({
          name:urlArr,
          url:image
        })
      }
    },
    // 获取三级分类处理
    async getCategory(){
      let categoryResult = await this.$axios.categoryControllerList.getCategory({})
      this.options = categoryResult.data.firstCategoryList
      this.options= JSON.parse(JSON.stringify(this.options).replace(/id/g,"value").replace(/name/g,"label"))
    },
    // 提交服务
    async onSubmit() {
      if (this.$store.getters.getUserInfo.isQualification === 0) {
        this.$message({
          message: '请先进行资质认证。',
          type: 'error',
        });
        await this.$router.push({name:"sellerrealauth"})
      }else {
        this.form.categoryId = this.category.toString();
        await this.$refs['serviceform'].validate(async (valid) => {
          if (valid && this.errors.priceError === '') {
            this.loading = this.$loading.service({
              lock: true,
              text: '发布服务中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.disable = true
            if(this.filerReadyUploadList1.length !== 0){
              this.$refs.uploadimage.submit();
            }
            if(this.filerReadyUploadList.length !== 0){
              this.$refs.upload.submit();
            }
            if(this.filerReadyUploadList1.length === 0 && this.filerReadyUploadList.length === 0){
              await this.releaseServe()
            }
          } else {
            this.$message({
              message: '填写信息有错误！请进行处理。',
              type: 'error',
            });
            return false;
          }
        });
      }
    },
    // 发布服务
    async releaseServe(){
      let releaseResult = await this.$axios.serveControllerList.releaseServe(this.form)
      if (releaseResult.code === 20000){
        this.loading.close()
        this.disable = false
        this.$message({
          message: '发布服务成功,请前往个人中心查看！',
          type: 'success'
        });
        await this.$router.push({name:"sellermyservice"})
      }else {
        this.loading.close()
        this.disable = false
        this.$message({
          message: '发布服务失败！',
          type: 'danger'
        });
      }
    },
    // 更新服务
    async updateServe(){
      let updateResult =  await this.$axios.serveControllerList.updateServeById(this.form)
      if (updateResult.code === 20000){
        this.loading.close()
        this.disable = false
        this.$message({
          message: '修改服务成功,请前往个人中心查看！',
          type: 'success'
        });
        await this.$router.push({name:"sellermyservice"})
      }
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
      if (file?.status !== 'ready'){
        this.fileRemoveList.push(file)
      }
      this.fileList = fileList
    },
    handleRemove1(file, fileList) {
      if (file?.status !== 'ready'){
        this.fileRemoveList.push(file)
      }
      this.fileList1 = fileList
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
    changeUpload(file,fileList){
      let options = {
        fileType:['pdf'],
        fileSize:10
      }
      let fileResult = this.fileLimit(file,options)
      if (fileResult) {
        if(file.status === "ready") {
          this.filerReadyUploadList.push(file)
        }
      }else {
        this.fileList = []
      }
    },
    changeUpload1(file,fileList){
      let options = {
        fileType:['jpg','png','jpeg'],
        fileSize:10
      }
      let fileResult = this.fileLimit(file,options)
      if (fileResult) {
        if(file.status === "ready") {
          this.filerReadyUploadList1.push(file)
        }
      }else {
        this.fileList1 = []
      }
    },
    handleExceed1(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 处理发服务的关键字
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 处理发服务的关键字
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        this.form.keywords = this.dynamicTags.toString()
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 点击更新服务
    async onUpdate(){
      this.disable = true
      this.updateStatus = true
      this.loading = this.$loading.service({
        lock: true,
        text: '修改服务中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if (this.fileRemoveList.length !== 0){
        await this.fileRemoveList.map(async(item)=>{
          let delResult = await this.$axios.ossControllerList.delFile({
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
        let updateServeResult =  await this.$axios.serveControllerList.updateServeById(this.form)
        if (updateServeResult.code === 20000){
          this.loading.close();
          this.$message({
            message: '修改服务成功。',
            type: 'success'
          });
          await this.$router.push("/pc/seller/myservice")
        }
      }

    },
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
        width:65%;
        .form-group-title {
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
///deep/ .el-tag {
//  margin-bottom: 0;
//}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  //vertical-align: bottom;
}
</style>
