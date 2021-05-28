<template>
  <div class="message-notification">
    <div class="message-notification-tab">
      <ul class="message-notification-tab-ul">
        <li @click="liswitch(1)" :class="[isTabActive === 1 ? 'active' :'']">买家({{ messageObj.notice}})</li>
        <li @click="liswitch(2)" :class="[isTabActive === 2 ? 'active' :'']">卖家({{ messageObj.handle}})</li>
<!--        <li @click="liswitch(3)" :class="[isTabActive === 3 ? 'active' :'']">其他({{ messageObj.other}})</li>-->
      </ul>
    </div>
    <div class="message-notification-tab-content">
      <div class="message-notification-tab-content-item" v-if="isTabActive === 1">
        <div class="message-notification-tab-content-item-main">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
            <div v-for="(item,index) in message_text" :key="index" class="message-notification-tab-content-item-detail">
              <el-row type="flex" align="middle" :gutter="10">
                <el-col :span="4">
<!--                  <div class="message-notification-tab-content-item-left">-->
<!--                    <img src="../assets/logo.png" alt="">-->
<!--                  </div>-->
                </el-col>
                <el-col :span="20">
                  <div class="message-notification-tab-content-item-right" @click="inBuyerMessage">
                    <h4>{{ item.title }} </h4>
                    <p>{{ item.createTime }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
<!--          <div class="message-status">-->
<!--            <p v-if="loading">加载中...</p>-->
<!--            <p v-if="noMore">没有更多了...</p>-->
<!--          </div>-->
        </div>
        <div class="message-notification-tab-content-item-footer">
          <div class="message-clear">
<!--            <a @click="messageClear(isTabActive,$event)">消息通知</a>-->

          </div>
        </div>
      </div>
      <div class="message-notification-tab-content-item" v-if="isTabActive === 2">
        <div class="message-notification-tab-content-item-main">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
            <div v-for="(item,index) in message_text_seller" :key="index" class="message-notification-tab-content-item-detail">
              <el-row type="flex" align="middle" :gutter="10">
                <el-col :span="4">
<!--                  <div class="message-notification-tab-content-item-left">-->
<!--                    <img src="../assets/logo.png" alt="">-->
<!--                  </div>-->
                </el-col>
                <el-col :span="20">
                  <div class="message-notification-tab-content-item-right" @click="inSellerMessage">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.createTime }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
<!--          <div class="message-status">-->
<!--            <p v-if="loading">加载中...</p>-->
<!--            <p v-if="noMore">没有更多了...</p>-->
<!--          </div>-->
        </div>
        <div class="message-notification-tab-content-item-footer">
          <div class="message-clear">
<!--            <a @click="messageClear(isTabActive,$event)">消息通知</a>-->
          </div>
        </div>
      </div>

      <div class="message-notification-tab-content-item" v-if="isTabActive === 3">
        <div class="message-notification-tab-content-item-main">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
            <div v-for="item in data" :key="item.index" class="message-notification-tab-content-item-detail">
              <el-row type="flex" align="middle" :gutter="10">
                <el-col :span="4">
                  <div class="message-notification-tab-content-item-left">
                    <img src="../assets/logo.png" alt="">
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="message-notification-tab-content-item-right">
                    <h4>{{ message_text[item.index].title }}</h4>
                    <p>2019-05-08 14:33:18</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="message-status">
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了...</p>
          </div>
        </div>
        <div class="message-notification-tab-content-item-footer">
          <div class="message-clear">
            <a @click="messageClear(isTabActive,$event)">清空通知</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageNotification",
  props:["message_text","total","message_text_seller","total_seller"],
  data () {
    return {
      count: 0,
      data: ['s','x'],
      busy: false,
      isTabActive:1,
      loading: false,
      message_active:"",
      messageObj:{
        notice:this.total,
        handle:this.total_seller,
        other:0
      }
    }
  },
  mounted() {

  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    inBuyerMessage(){
      this.$router.push(`/buyer/mynews`,)
      this.state.message_active="second"
      // this.message_active="second"
      // this.$emit("active",this.message_active)
    },

    inSellerMessage(){
      this.$router.push(`/seller/mynews`)
    },
    loadMore: function() {
      this.loading = true
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({name: this.count++ })
        }
        this.loading = false
      }, 1000)
    },
    liswitch(num){
      this.isTabActive = num
    },
    messageClear(clearTab,e){
      e.preventDefault()
      switch (clearTab){
        case 1:
          this.messageObj.notice = 0
          break
        case 2:
          this.messageObj.handle = 0
          break
        case 3:
          this.messageObj.other = 0
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message-notification {
  width: 300px;
  height: 450px;
  background:#FFFFFF;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .message-notification-tab {
    height:40px;
    text-align: center;
    .message-notification-tab-ul {
      display: flex;
      li {
        height:39px;
        line-height: 39px;
        flex: 1;
        cursor: pointer;
      }
      .active {
        color: #2d8cf0;
        border-bottom:1px solid #2d8cf0;
      }
    }
  }
  .message-notification-tab-content{
    height:410px;
    overflow: auto;
    .message-notification-tab-content-item {
      .message-notification-tab-content-item-main {
        position: relative;
        .message-notification-tab-content-item-detail{
          box-sizing: border-box;
          padding: 12px 0px;
          border-bottom: 1px solid #e8eaec;
          cursor: pointer;
          .message-notification-tab-content-item-left {
            height:100%;
            img {
              display: block;
              height:auto;
              width: 100%;
            }
          }
          .message-notification-tab-content-item-right{
            h4 {
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
              color: #515a6e;
            }
            p {
              font-size: 12px;
              color: #808695;
            }
          }
          &:hover {
            background:rgb(242, 250, 254);
          }
        }
        .message-status {
          margin-bottom: 40px;
          p {
            text-align: center;
            font-size: 14px;
            color: #5e6d82;
            line-height: 1.5em;
          }
        }
      }
      .message-notification-tab-content-item-footer {
        position: absolute;
        bottom:0;
        width: 100%;
        .message-clear {
          height: 20px;
          cursor: pointer;
          border-top: 1px solid #e8eaec;
          background:#FFF;
          a {
            text-align: center;
            display: block;
            height:100%;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
