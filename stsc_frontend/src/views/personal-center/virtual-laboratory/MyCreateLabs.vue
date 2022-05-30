<template>
<div>
  <div class="public-info-list-item" v-for="(item) in myLabDatas" :key="item.id">
      <div class="info-img fl">
        <img :src="item.imgurl || 'http://n.sinaimg.cn/news/crawl/117/w550h367/20210311/8edb-kmeeius6993674.jpg'" alt="">
      </div>
      <div class="info-details fl">
        <ul class="details">
          <li>实验室名称：<span>{{item.name}}</span></li>
        </ul>
        <el-button type="primary" size="small" plain @click="sendvirtualLabName(item.name)">详细信息</el-button>
      </div>

  </div>
</div>

</template>

<script>
import axios from "@/api/api";

export default {
  name: "MyCreateLabs",
  data() {
    return {
      drawer: false,
      innerDrawer: false,
      myLabDatas: '',
      virtualLabName: '',

      labsKey: 0
    }
  },
  components:{
  },
  methods:{
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getmyLabDatas(){
      return axios({
        url:'/ph/stcsp/virtuallab/listForVirtual/1/100',
        method:'post',
        // data
      })
    },
    async sendvirtualLabName(virtualLabName){
      this.virtualLabName = virtualLabName;
      ++this.labsKey;
      await this.$router.push(`/pc/virtuallaboratory/mycreatelabs/${virtualLabName}`);
    },
    setMyLabDatas(response)
    {
      this.myLabDatas = response.data.virtualLabList;
    }
  },
  mounted() {
    this.getmyLabDatas().then((response) => {
      this.setMyLabDatas(response);
      console.log('myLabDatas: ',this.myLabDatas);
    }).catch(function (error){
      console.log(error);
    })
  }
}
</script>

<style scoped lang="scss">
.public-info-list-item {
  position: relative;
  box-sizing: border-box;
  padding:20px 0;
  height:180px;
  border-bottom:1px solid #E7E7E7;
  .info-img {
    height:100%;
    img {
      width: 180px;
      height: 100%;
    }
  }
  .info-details {
    margin-left:20px;
    .details {
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      li {
        margin-bottom: 10px;
        span {
          color: #000000;
        }
        &:last-child {
          margin-bottom: 25px;
        }
        &:last-child span{
          color: #000000;
        }
      }
    }
  }
  .info-operation {
    position:absolute;
    right:0;
    bottom:25px;
  }

}
</style>