<template>
<div class="success_case container">
  <bread-crumb :info="info"></bread-crumb>
  <div class="title ">成功案例</div>
  <div class="row">
  <div class="case_div" >
      <div class="img_div"><img src="../assets/logo.png"></div>
      <div class="other_inner">
        <span>标题</span>
        <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
        <a @click="seeDetail">了解更多</a>
    </div>
  </div>
    <div class="case_div" >
    <div class="img_div"><img src="../assets/logo.png"></div>
    <div class="other_inner">
      <span>标题</span>
      <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
      <a @click="seeDetail">了解更多</a>
    </div>
  </div>
    <div class="case_div" >
      <div class="img_div"><img src="../assets/logo.png"></div>
      <div class="other_inner">
        <span>标题</span>
        <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
        <a @click="seeDetail">了解更多</a>
      </div>
    </div>
    <div class="case_div" >
      <div class="img_div"><img src="../assets/logo.png"></div>
      <div class="other_inner">
        <span>标题</span>
        <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
        <a>了解更多</a>
      </div>
    </div>
    <div class="case_div" >
      <div class="img_div"><img src="../assets/logo.png"></div>
      <div class="other_inner">
        <span>标题</span>
        <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
        <a>了解更多</a>
      </div>
    </div>
    <div class="case_div" >
    <div class="img_div"><img src="../assets/logo.png"></div>
    <div class="other_inner">
      <span>标题</span>
      <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
      <a>了解更多</a>
    </div>
  </div>
    <div class="case_div" >
      <div class="img_div"><img src="../assets/logo.png"></div>
      <div class="other_inner">
        <span>标题</span>
        <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
        <a>了解更多</a>
      </div>
    </div>
    <div class="case_div" >
    <div class="img_div"><img src="../assets/logo.png"></div>
    <div class="other_inner">
      <span>标题</span>
      <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
      <a>了解更多</a>
    </div>
  </div>
    <div class="case_div" >
      <div class="img_div"><img src="../assets/logo.png"></div>
      <div class="other_inner">
        <span>标题</span>
        <p style="height: 110px">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
        <a>了解更多</a>
      </div>
    </div>
  </div>
  <div class="pagination">
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="15"
        layout="total, prev, pager, next"
        :total="10">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb";

export default {
  name: "SuccessCase",
  components:{BreadCrumb},
 data(){
    return{
      currentPage:1,
      info:[{
        title:'成功案例',
        path:''
      }],
    }
 },
  methods:{
    seeDetail(){
      this.$router.push(`/successCaseDetail`)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // await this.getData(val)
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
    height: 650px;
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
          }
        }

    }

  }

}
</style>
