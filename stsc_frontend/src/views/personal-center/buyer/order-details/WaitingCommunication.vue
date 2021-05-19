<template>
  <div class="waiting-communication">
    <div class="service-snapshot">
      <h3>服务快照</h3>
     <div class="service-snapshot-main">
       <div class="service-snapshot-item">
         <span>子服务1：</span>
         <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
       </div>
       <div class="service-snapshot-item">
         <span>子服务1：</span>
         <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
       </div>
       <div class="service-snapshot-item">
         <span>子服务1：</span>
         <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
       </div>
       <div class="service-snapshot-item">
         <span>子服务1：</span>
         <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
       </div>
       <div class="service-snapshot-item">
         <span>子服务1：</span>
         <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
       </div>
       <div class="service-snapshot-item">
         <span>子服务1：</span>
         <img src="http://n.sinaimg.cn/sports/2_img/upload/127d0b3e/107/w1024h683/20210519/0ee5-kqhwhrk1641934.jpg" alt="">
       </div>
     </div>
    </div>
    <div class="service-contract">
      <h3>服务合同</h3>
      <div class="service-contract-main">
        <div class="service-contract-item">
          <div>子服务1：</div>
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div class="service-contract-item">
          <div>子服务1：</div>
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div class="service-contract-item">
          <div>子服务1：</div>
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div class="service-contract-item">
          <div>子服务1：</div>
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div class="service-contract-item">
          <div>子服务1：</div>
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="service-operation">
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitingCommunication",
  data() {
    return {
      fileList:[]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style lang="scss" scoped>
.waiting-communication {
  width: 100%;
  .service-snapshot {
    box-sizing: border-box;
    width: 100%;
    padding: 30px;
    box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
    border-radius: 4px;
    margin-bottom: 20px;
    h3 {
      font-size: 18px;
      margin-bottom: 18px;
    }
    .service-snapshot-main {
      display:flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .service-snapshot-item {
        height: 150px;
        margin-right: 30px;
        margin-bottom: 30px;
        span {
          margin-right: 20px;
        }
        img {
          width: auto;
          height:100%;
          vertical-align:top;
        }
      }
    }
  }
  .service-contract {
    box-sizing: border-box;
    width: 100%;
    padding: 30px;
    box-shadow: 0px 2px 4px 3px rgba(225, 225, 225, 0.5);
    border-radius: 4px;
    margin-bottom: 20px;
    h3 {
      font-size: 18px;
      margin-bottom: 18px;
    }
    .service-contract-main {
      display:flex;
      flex-wrap: wrap;
      justify-content:flex-start;
      .service-contract-item {
        width: 30%;
        display:flex;
        margin-right: 20px;
        margin-bottom: 30px;
        .upload-demo {
          display:inline-block;
          width: 75%;
          margin-left: 10px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .service-operation {
    width: 100%;
    text-align: center;
    margin-bottom:10px;
  }
}
</style>
