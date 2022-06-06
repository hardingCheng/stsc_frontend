<template>

  <div>
    <div class="public-info-list-item" v-for="(item) in invitedLabDatas" :key="item.id">
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
  name: "MyJoinLabs",
  data() {
    return {
      drawer: false,
      innerDrawer: false,
      invitedLabDatas:'',
      virtualLabName: '',
      activeName: 'first',
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
    getInvitedLabDatas(){
      return axios({
        url:'/ph/stcsp/virtuallab/listForVirtual2',
        method:'post',

      });
    },
    async sendvirtualLabName(virtualLabName){
      this.virtualLabName = virtualLabName;
      ++this.labsKey;
      await this.$router.push(`/pc/virtuallaboratory/myjoinlabs/${virtualLabName}`);
    },
    setInvitedLabDatas(response)
    {
      console.log(response.data);
      this.invitedLabDatas = response.data.virtualLabList2;
    }
  },
  mounted() {
    this.getInvitedLabDatas().then((response) => {
      // console.log(response);
      this.setInvitedLabDatas(response);
      // this.invitedLabDatas = response.data.virtualLabList;
      console.log('invitedLabdatas: ',this.invitedLabDatas);
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