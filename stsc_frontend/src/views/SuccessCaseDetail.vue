<template>
  <div class="success container">
    <bread-crumb :info="info"></bread-crumb>
    <div class="title">
      <img src="../assets/logo.png"/>
      <h3>谢谢谢谢谢详情</h3>
    </div>
    <div class="sub_title">
      <div class="sub_title_top">
        <img src="../assets/images/icon_list.png" />
        <span>需求方/需求描述</span>
      </div>
      <p>需求方：<span>哈萨克斯坦</span></p>
      <p>所属平台：<span>哈萨克斯坦</span></p>
      <p>创建时间：<span>哈萨克斯坦</span></p>
      <p>需求描述：</p>
    </div>
    <div class="other">
      <div class="other_title"><h3>其他成功案例</h3></div>
      <div class="other_success">
        <div class="other_success_div">
          <div class="img_div"><img src="../assets/logo.png"></div>
          <div class="other_inner">
            <span>标题</span>
            <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
            <a>了解更多</a>
          </div>
        </div>
        <div class="success_div">
          <div class="img_div"><img src="../assets/logo.png"></div>
          <div class="other_inner">
            <span>标题</span>
            <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
            <a>了解更多</a>
          </div>
        </div>
        <div class="other_success_div">
          <div class="img_div"><img src="../assets/logo.png"></div>
          <div class="other_inner">
            <span>标题</span>
            <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊</p>
            <a>了解更多</a>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb";

export default {
  name: "SuccessCaseDetail",
  components:{BreadCrumb},
}
</script>

<style scoped lang="scss">
.success{
  .other{
    .other_title{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    .other_success{
      display: flex;
      justify-content: center;
      .other_success_div{
        display: flex;
        height: 200px;
        width: 400px;
        border: 1px solid #F3F3F3;
        cursor : pointer;
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
      .success_div{
        display: flex;
        height: 200px;
        width: 400px;
        margin-left: 20px;
        margin-right: 20px;
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
  .title{
    display: flex;
    align-items: center;
    img{
      height: 250px;
    }
    h3{
      margin-left: 50px;
    }
  }
  .sub_title{
    border-bottom: 1px solid #F3F3F3;
    p{
      line-height: 25px;
    }
    .sub_title_top{
      display: flex;
      align-items: center;
      height: 48px;
      background: #f5f5f6;
      img{
        height: 100%;
        width: 48px;
        background: #007aff;
      }
      span{
        font-size: 16px;
        margin-left: 15px;
      }
    }
  }
}
</style>
