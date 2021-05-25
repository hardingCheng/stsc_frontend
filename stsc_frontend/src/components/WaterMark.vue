<template>
  <div>
    <el-upload
        action="/ph/stcsp/fileoss/upload"
        ref="upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :auto-upload="false"
        :on-change="handleChange"
        :file-list="fileList"
        :http-request="getUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
    <div class="authentication-operation">
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaterMark",
  data(){
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      imgUrl: ''
    }
  },
  mounted() {

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      console.log(fileList)
      let a;
      this.$nextTick(function () {
        a= this.$refs.upload.$children[0].$el.getElementsByClassName('el-upload-list__item-thumbnail')[0]
        console.log(a)
      })
      return new Promise((resolve) => {
        const fileName = file.name
        const reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = () => {
          this.getImgUrl({
            url: reader.result,
            cb: (base64) => {
              this.imgUrl = base64
              a.src = base64
              const file = this.base64ToFile(base64, fileName)
            }
          })
        }
      })
    },
    base64ToFile (urlData, fileName) {
      const arr = urlData.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bytes = atob(arr[1]) // 解码base64
      let n = bytes.length
      const ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      return new File([ia], fileName, { type: mime })
    },
    getImgUrl ({
                 url = '',
                 textAlign = 'center',
                 textBaseline = 'center',
                 fillStyle = 'rgba(238, 10, 36, 0.5)',
                 content = '此文件仅供资质审核使用！',
                 font = '40px Arial',
                 cb = null,
                 textX = 100,
                 textY = 70
               }) {
      const img = new Image()
      img.src = url
      img.crossOrigin = 'anonymous'
      img.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        ctx.textAlign = textAlign
        ctx.textBaseline = textBaseline
        ctx.font = font
        ctx.fillStyle = fillStyle
        ctx.translate((img.width + textX) / 2, (img.height + textY) / 2)
        ctx.rotate((Math.PI / 180) * -30)
        ctx.translate(-(img.width + textX) / 2, -(img.height + textY) / 2)
        // 单独绘制水印
        ctx.fillText(content, img.width / 2, img.height / 2)
        //循环绘制水印
        // for (let i = 0; i < img.height / 120; i++) {
        //   for (let j = 0; j < img.width / 30; j++) {
        //     ctx.fillText(content, i * 200, j * 100, img.width)
        //   }
        // }
        // 将绘制完成的canvas转换为base64的地址
        const base64Url = canvas.toDataURL()
        // return base64Url
        cb && cb(base64Url)
      }
    },
    getUpload(op){
      console.log(op)
    }
  }
}
</script>

<style scoped>

</style>
