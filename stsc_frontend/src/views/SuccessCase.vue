<template>
<div class="success_case container">
  <bread-crumb :info="info"></bread-crumb>
  <div class="title ">成功案例</div>
  <div class="row">
  <div class="case_div"  v-for="(item,index) in successList">
      <div class="img_div"><img :src=item.imageUrl></div>
      <div class="other_inner">
        <span>{{ item.title }}</span>
        <p>{{item.reqDescription}}</p>
        <a @click="seeDetail(item.id)">了解更多</a>
    </div>
  </div>
  <p v-if="total===0">暂无数据</p>
  </div>
  <div class="pagination">
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="6"
        layout="total, prev, pager, next"
        :total=this.total>
    </el-pagination>
  </div>
  </div>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb";
import orderControllerList from "../api/request/orderControllerList";
export default {
  name: "SuccessCase",
  components:{BreadCrumb},
 data(){
    return{
      currentPage:1,
      successList:[],//成功案例列表
      total:0,
      info:[{
        title:'成功案例',
        path:''
      }],
    }
 },
  created() {
    this.getSuccessAllInfo()
  },
  methods:{
    //获取全部成功案例
    getSuccessAllInfo(){
      orderControllerList.getSuccessAllInfo({
        page:this.currentPage
      })
      .then(response => {
            this.successList=response.data.list
            this.total = response.data.total
      })
      .catch(error =>{
        console.log(error)
      })
    },
    //跳转成功案例详情
    seeDetail(val){
      this.$router.push(`/successCaseDetail/${val}`)
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);

    },
    async handleCurrentChange(val) {
   //   console.log(`当前页: ${val}`);
      this.getSuccessAllInfo()
    },
  }
}
</script>

<style scoped lang="scss">
.success_case{
  .pagination{
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
  .title{
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .row{
    display: flex;
    margin-bottom: 20px;
    flex-wrap: wrap;
    height: 450px;
    .case_div{
      display: flex;
      width: calc((100% - 48px) / 3);
      height: 200px;
      box-sizing: border-box;
      margin-left: 8px;
      margin-right: 8px;
      margin-bottom: 20px;
        border: 1px solid #F3F3F3;
        .other_inner{
          margin-top: 20px;
          margin-left: 10px;
          margin-bottom: 20px;
          padding-left: 5px;
          border-left:1px solid #F3F3F3 ;
          span{
            font-weight: bold;

          }
          p{
            height: 105px;
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 5; /** 显示的行数 **/
            overflow: hidden; /** 隐藏超出的内容 **/
          }
          a{
            font-size: 14px;
            line-height: 30px;
            color: #007aff;
            cursor : pointer;
          }
        }
        .img_div{
          display: flex;
          align-items: center;
          img{
            height: 100px;
            width: 100px;
          }
        }

    }

  }

}
</style>
