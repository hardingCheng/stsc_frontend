<template>
  <div>
    <div class="public-info-list-item" v-for="(item) in infoList" :key="item.id">
      <div class="info-img fl">
        <img :src="item.image || 'http://n.sinaimg.cn/news/crawl/117/w550h367/20210311/8edb-kmeeius6993674.jpg'" alt="">
      </div>
      <div class="info-details fl">
        <ul class="details" v-if="type === 1">
          <li>需求名称：<span>{{item.name}}</span></li>
          <li>截止时间：<span>{{item.deadline}}</span></li>
          <li>需求状态：<span class="audit-status">{{ item.status | modStatus }}</span></li>
        </ul>
        <ul class="details" v-else>
          <li>服务名称：<span>{{item.name}}</span></li>
          <li>服务类别：<span>{{item.categoryName}}</span></li>
          <li>服务状态：<span class="audit-status">{{ item.status | modStatus }}</span></li>
        </ul>
        <el-button type="primary" size="small"  plain @click="infoDetail(item.id)">详细信息</el-button>
      </div>
      <div class="info-operation">
        <el-button type="primary" v-if="item.status < 6" @click="modInfo(item.id)">修改</el-button>
        <el-button type="primary" @click="deleteInfo(item.id)">撤销</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['infoList','type'],
  name: "MyPublicInfoList",
  data(){
    return {

    }
  },
  filters:{
    modStatus(value){
      switch(parseInt(value)) {
        case 0:
          return '未审核'
        case 1:
          return '审核通过'
        case 2:
          return '审核未通过'
        case 3:
          return '已分发'
        case 4:
          return '已拆分'
        case 8:
          return '服务商匹配完成'
        case 9:
          return '生成订单'
        default:
          return '待匹配'
      }
    }
  },
  methods: {
    async modInfo(id){
      this.$emit('modInfo',id);
    },
    async deleteInfo(id){
      this.$emit('deleteInfo',id);
    },
    async infoDetail(id){
      this.$emit('infoDetail',id);
    },
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
      color: #666666;
      li {
        margin-bottom: 10px;
        span {
          color: #111111;
        }
        &:last-child {
          margin-bottom: 25px;
        }
        &:last-child span{
          color: #F7B500;
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
