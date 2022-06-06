<template>
  <div class="my-order">
    <div class="public-order-info" v-if="orderList.length !== 0" :class="[orderList.length<3 ?'public-order-info-null':'']">
      <div class="public-order-info-item" v-for="(item,index) in orderList" :key="index">
        <div class="public-order-info-item-top">
          <ul class="public-order-info-item-top-detail">
            <li>订单创建时间：{{item.createTime}}</li>
            <li>订单号：<span>{{item.orderId}}</span></li>
            <li>需求方：<span>{{item.sellerName}}</span></li>
          </ul>
        </div>
        <div class="public-order-info-item-bottom">
          <div class="info-image">
            <img v-lazy="item.imageUrl" alt="">
          </div>
          <div class="info-detail">
            <h2>{{item.orderName}}</h2>
            <p>{{item.description}}</p>
            <el-tag v-for="(itemde,index) in item.keywords === null?[]:item.keywords.split(',')" :key="index">{{itemde}}</el-tag>
          </div>
          <div class="info-price-status">
            <span>{{item.price | modPrice}}</span>
            <span>{{item.orderStatus | modStatus}}</span>
          </div>
          <div class="info-menu">
            <ul>
              <li v-if="item.orderStatus !== 7"><a @click="getOrderDetail(item.id,item.orderType,item.orderStatus)">订单详情</a></li>
            </ul>
          </div>
          <div class="info-evaluate">
            <a v-if="item.orderStatus !== 7" style="color:red;" @click="getCancelOrder(item.id,item.orderType)">撤销订单</a>
            <a v-else style="color:red;">订单已撤销</a>
          </div>
        </div>
      </div>
    </div>
    <div class="public-order-info-null" v-else>
      当前暂无数据，请刷新重试。
    </div>
    <div class="common-pagination" v-if="orderList.length !== 0">
      <div class="pagination">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="4"
            layout="total, prev, pager, next"
            :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data(){
    return {
      currentPage1:1,
      orderList:[],
      pageInfo:{
        total:0,
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      let result = await this.$axios.orderControllerList.getOrderListForSeller({
        page: val
      })
      this.pageInfo.total = result?.data?.total
      this.orderList = result?.data?.orderList
    },
    getOrderDetail(id, orderType, orderStatus) {
      switch (orderStatus) {
        case 1:
          this.$router.push(`/pc/sellerorderdetail/waitingcommunication/${id}/${orderType}`)
          break
        case 2:
          this.$router.push(`/pc/sellerorderdetail/inprogress/${id}/${orderType}`)
          break
        case 3:
          this.$router.push(`/pc/sellerorderdetail/serviceacceptance/${id}/${orderType}`)
          break
        default:
          this.$router.push(`/pc/sellerorderdetail/serviceacceptance/${id}/${orderType}`)
          break
      }
    },
    getCancelOrder(id, orderType){
      this.$prompt('订单撤销', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType:'textarea',
        inputPlaceholder:'请输入订单撤销原因',
        inputValidator:(messages) => {
          if (messages !== null && messages.trim().length >0){
            return true
          }else {
            return "请输入订单撤销原因"
          }
        }
      }).then(async (messages) => {
        const cancelOrderResult =  await this.$axios.orderControllerList.setCancelOrderForSeller({
          message:messages.value,
          orderType:orderType,
          orderId:id
        })
        if (cancelOrderResult.code === 20000){
          this.$message({
            type: 'success',
            message: '撤销订单成功！',
            duration:1000,
            onClose: async () => {
              await this.getOrderListForSeller()
            }
          });
        } else {
          this.$message({
            type: 'error',
            message: '撤销订单失败！',
            duration:1000,
            onClose: async () => {
              await this.getOrderListForSeller()
            }
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消撤销订单'
        });
      });
    },
    async getOrderListForSeller(){
      let result = await this.$axios.orderControllerList.getOrderListForSeller({
        page: 1
      })
      if (result.data?.total) {
        this.pageInfo.total = result.data?.total
      }
      if (result.data?.orderList) {
        this.orderList = result.data?.orderList
      }
    }
  },
  async mounted() {
    await this.getOrderListForSeller()
  },
  filters: {
    modStatus(value) {
      switch (parseInt(value)) {
        case 1:
          return '待沟通'
        case 2:
          return '进行中'
        case 3:
          return '已验收'
        case 4:
          return '已验收'
        case 5:
          return '已完成'
        case 6:
          return '验收失败'
        case 7:
          return '已撤销'
        case 8:
          return '订单异常'
        default:
          return '待沟通'
      }
    },
    modPrice(value) {
      if (value) {
        if (value === '保密' || value === '暂无价格') {
          return '价格：' + value
        } else {
          return '价格：￥' + (value) + '万'
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-order{
  width:100%;
  .public-order-info {
    .public-order-info-item {
      height:240px;
      margin-bottom: 20px;
      border: 1px solid #E7E7E7;
      .public-order-info-item-top {
        height:48px;
        line-height: 48px;
        background: #FAFAFA;
        border-bottom: 1px solid #E7E7E7;
        .public-order-info-item-top-detail {
          box-sizing: border-box;
          display:flex;
          justify-content:space-between;
          align-items: center;
          padding:0 40px;
          li {
            font-size: 16px;
            font-weight: 400;
            color: #111111;
          }
        }
      }
      .public-order-info-item-bottom {
        box-sizing: border-box;
        padding:12px 0 12px 20px;
        height:192px;
        display:flex;
        text-align: center;
        .info-image {
          height:100%;
          width: 168px;
          img {
            height:100%;
            width: 168px;
          }
        }
        .info-detail {
          flex: 4;
          margin-left:20px;
          text-align: left;
          h2{
            height:44px;
            margin-bottom: 25px;
            font-size: 16px;
            font-weight: 400;
            color: #111111;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2; /** 显示的行数 **/
            overflow: hidden;  /** 隐藏超出的内容 **/
          }
          p {
            height:40px;
            margin-bottom: 25px;
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2; /** 显示的行数 **/
            overflow: hidden;  /** 隐藏超出的内容 **/
          }
          ::v-deep .el-tag {
            margin-right: 15px;
          }
        }
        .info-price-status {
          flex: 1;
          color: #FF3617;
          display:flex;
          flex-direction: column;
          justify-content: space-around;
          span {
            display:inline-block;
            width:100%;
          }
        }
        .info-menu {
          flex: 1;
          height:100%;
          position:relative;
          ul {
            height:100%;
            display:flex;
            flex-direction: column;
            justify-content:space-around;
            align-items: center;
            li {
              a {
                cursor: pointer;
                color:#000;
              }
            }
          }
          &:after {
            content:"";
            height:192px;
            width:1px;
            background:#E7E7E7;
            position:absolute;
            top: -12px;
            right:0;
          }
        }
        .info-evaluate {
          flex: 1;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #1794FF;
          font-weight: 500;
        }
      }
    }
  }
}
.public-order-info-null {
  height:500px;
}
.common-pagination {
  height: 60px;
  position: relative;

  .pagination {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
a {
  cursor: pointer !important;
}
</style>
