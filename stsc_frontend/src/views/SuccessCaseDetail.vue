<template>
  <div class="success container">
    <bread-crumb :info="info"></bread-crumb>
    <div class="title">
      <img :src=successDetail.imageUrl />
      <h3>{{ successDetail.title }}</h3>
    </div>
    <div class="sub_title">
      <div class="sub_title_top">
        <img src="../assets/images/icon_list.png" />
        <span>需求方/需求描述</span>
      </div>
      <p>需求方：<span>哈萨克斯坦</span></p>
      <p>所属平台：<span>{{ successDetail.source }}</span></p>
      <p>创建时间：<span>{{ successDetail.createTime }}</span></p>
      <p style="line-height: 25px">需求描述：<span>{{ successDetail.reqDescription }}</span></p>
    </div>
    <div class="other">
      <div class="other_title"><h3>其他成功案例</h3></div>
      <div class="other_success">
        <div class="other_success_div" v-for="(item,index) in successList">
          <div class="img_div"><img :src=item.imageUrl></div>
          <div class="other_inner">
            <span>{{ item.title }}</span>
            <p>{{ item.reqDescription }}</p>
            <a @click="seeOther(item.id)">了解更多</a>
          </div>
        </div>

      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb";
import orderControllerList from "../api/request/orderControllerList";
export default {
  name: "SuccessCaseDetail",
  props:["id"],
  components:{BreadCrumb},
  data(){
    return{
      info:["ddd"],
      successDetail:[],
      successList:[],
    }
  },
  created() {
    this.getSuccessDetailInfo()
    this.getSuccessAllInfo()
  },
  methods:{
    getSuccessDetailInfo(){
      orderControllerList.getSuccessDetailInfo({
        id:this.id
      })
      .then(response =>{
          this.successDetail =response.data.successCase
        console.log(this.successDetail)
      }).catch(error =>{
        console.log(error)
      })
    },
    getSuccessAllInfo(){
      orderControllerList.getSuccessAllInfo({
        page:1,
        limit:3
      })
          .then(response => {
            this.successList=response.data.pageInfo.records
            console.log(this.successList,this.total)
          })
          .catch(error =>{
            console.log(error)
          })
    },
    seeOther(val){
      console.log(val)
       this.$router.push(`/successCaseDetail/${val}`)
        this.$router.go(0)

    }
  }
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
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid #F3F3F3;
        cursor : pointer;
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
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 5; /** 显示的行数 **/
            overflow: hidden; /** 隐藏超出的内容 **/
          }
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
          p{
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 5; /** 显示的行数 **/
            //overflow: hidden; /** 隐藏超出的内容 **/
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
    margin-top: 20px;
    border: 1px solid #F3F3F3;
    p{
      line-height: 40px;
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
