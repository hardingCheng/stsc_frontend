<template>
  <div class="pdf">
    <el-dialog
        :visible.sync="dialogVisible"
        fullscreen
        :modal="false"
        @close="dialogVisible = false"
    >
      <div class="showPdf">
        <iframe :src="src" frameborder="0" width="100%" height="100%"></iframe>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false"> 关闭 </el-button>
			</span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ComPdfShow',
  data() {
    return {
      src: '', // pdf文件地址
      dialogVisible: false,
    };
  },
  watch: {
    dialogVisible() {
      if (!this.dialogVisible) {
        this.src = '';
      }
    },
  },
  methods: {
    /**
     * 预览PDF
     * @file {Object/File} pdf文件流或本地文件，文件流转换url后传入pdfJs展示；本地文件则转换成url直接iframe展示
     * @type {String} 文件类型，值为：01（文件流，可不传，不传默认为文件流）/02（本地文件）；标记传过来的是文件流还是本地文件
     **/
    previewPDF(file, type) {
      console.log(file)
      this.dialogVisible = true;
      const viewPage = 'static/pdfJs/web/viewer.html?file='
      if (type && type === '02') {
        this.src = this.getObjectURL(file)
      } else {
        const urlSrc = this.getObjectURL(file)
        const fileUrl = viewPage + encodeURIComponent(urlSrc);
        if (fileUrl) {
          this.src = fileUrl
        } else {
          console.log('转换失败');
          this.dialogVisible = false;
        }
      }

    },
    /**
     * 将流文件转换成url
     * @file {Object} pdf文件流
     **/
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        try {
          url = window.webkitURL.createObjectURL(file)
        } catch (error) {
          console.log("urlError=>", error)
        }
      } else if (window.URL !== undefined) {
        try {
          url = window.URL.createObjectURL(file)
        } catch (error) {
          console.log("urlError=>", error)
        }
      }
      return url;
    },
  },
};
</script>
<style lang="scss" scoped>
.showPdf {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.showPdf > span {
  width: 100%;
  height: calc(100% - 35px);
  overflow: hidden;
  overflow-y: auto;
}
.arrow {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #eee;
.page {
    margin: 0 10px;
  }
}
.el-input {
  width: 20px;
}
.el-button--mini {
  padding: 5px;
}
.el-icon--right {
  margin-left: 0;
}
</style>
