<template>
  <div class="chat-wrapper">
    <div id="btn_open" class="chat-support-btn" v-show="isShowChat"  @click="openChat"><!-- 聊天窗口缩小后的头像图标 -->
      <img src='../../assets/chat_image/chat.png'>
    </div>
    <div class="chat-main" v-show="!isShowChat">
      <div class="chat-header">
        <div class="chat-service-info">
          <img class="chat-service-img" src="../../assets/chat_image/avator.png"/>
          <div class="chat-service-title">
            <h3 class="chat-service-name">科技咨询</h3>
          </div>
          <span id="btn_close" class="chat-close" @click='closeChat'>></span>
        </div>
      </div>
      <div id="chat_contain" ref="chatContain" class="chat-contain"  >
        <div v-for="(item, index) in chatArr" :key="index" :class="'chat-'+item.name+'-contain'" >
          <p class="chat-time" >{{ item.time  }}</p>
          <span :class='"chat-text chat-"+item.name+"-text"' v-html="item.value"></span>
        </div>
      </div>
      <div class="chat-submit">
        <transition name="hint">
          <p id='chatHint' class="chat-hint"  v-show="showChatHint">
              <span class="chat-hint-icon">!</span>
              <span class="chat-hint-text">发送内容不能为空</span>
          </p>
        </transition>
        <textarea id="chat_input"
                  class="chat-input-text"
                  v-model="chatContent"
                  @keyup.enter="sendByEnter"
                  autofocus placeholder="请输入您想对我说的话，按Enter键发送（shift+Enter换行）。">
        </textarea>
        <div class="chat-input-tools">
          <button class="chat-input-button" @click="sendByButton">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from "@/api/api"
  export default {
    name: 'Chat',
    data() {
      return {
        isShowChat:true,
        chatArr:[],
        chatContent:'',
        showChatHint: false,
        shiftDown: false, // 判断是否按住shift键
        serviceData:{
          robot:{
            chat:['张启明','王神明', '李自成','赵顺利']
          }
        }
      }
    },
    created() {
      this.createInfo("service","欢迎来到科技服务协同平台，请问有什么可以帮您")
    },
    methods: {
      openChat(){
        this.isShowChat = false
		  },
      closeChat(){
        this.isShowChat = true
      },
      /*创建新消息框*/
      createInfo(name,value) {
        let chatTime=new Date();
          chatTime=chatTime.toLocaleTimeString();
        let content = '';
          if(value instanceof Array) {
            for(let i = 0;i < value.length;i++) {
              content +="<a href='http://"+value[i]+"' class='chat-address' target='view_window' style='color:#6666cc '>"+value[i]+'</a>'
            }
          }else{
            content=value.replace(/(((ht|f)tps?):\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)/g,function(content) {
              return "<a href='http://"+content+"' class='chat-address' target='view_window' style='color:#6666cc '>"+content+'</a>'
            })
          }
        let node = {
          name:name,
          time:chatTime,
          value:content
        }
        this.chatArr.push(node)
        this.$nextTick(() => {
          let chatContain = this.$refs.chatContain
          chatContain.scrollTop = chatContain.scrollHeight;
        })
      },
      chatHintNull(){//空输入提示
        this.showChatHint = !this.showChatHint
        let _this = this
        setTimeout(function() {
          _this.showChatHint = false
        }, 3000);
      },
      isEnter(chatContent,Hint,type,e) {
        e = e||window.event;
        if (e.keyCode == 16) {//按住shift键
          this.shiftDown = true;
        }
        if(e.keyCode==13) {
          if(this.shiftDown==true) {
            this.shiftDown=false;
            return true;
          }
          else if(this.shiftDown == false && chatContent === '\n') {
            Hint();
            return true;
          }
          else {
            e.preventDefault();
            this.createInfo(type,chatContent);
            this.submityouText(chatContent);
            this.chatContent = "";
            document.getElementById('chat_input').focus();
          }
        }
      },
      sendByEnter() {
        this.isEnter(this.chatContent,this.chatHintNull,'you',window.event);
      },
      sendByButton() {
        if(this.chatContent!='') {
          this.createInfo('you',this.chatContent);
          this.submityouText(this.chatContent);
          this.chatContent = "";
          document.getElementById('chat_input').focus();
        }
        else {
          this.chatHintNull();
        }
      },
      submityouText(question) {
        return axios({
          url:`/ph/qa/${question}`,
          method:'get'
        }).then((response)=>{
          let answer = response.data.data
          let type = JSON.parse(answer).Messages[0].AnswerType
          console.log(JSON.parse(answer).Messages[0])
          if(type == "Text") {
              console.log(JSON.parse(answer).Messages[0].Text.Content)
              this.getServiceText(JSON.parse(answer).Messages[0].Text.Content)
              if(JSON.parse(answer).Messages[0].Text.AnswerSource == "NO_ANSWER") { //表示知识库中没有相应的答案
                this.getServiceText(this.serviceData.robot.chat)
              }
          }
          if(type == "Knowledge") {
            console.log(JSON.parse(answer).Messages[0].Knowledge.Content)
            this.getServiceText(JSON.parse(answer).Messages[0].Knowledge.Content)
          }
        })
        // 模拟后端回复
        // let num = Math.random() * 10;
        // if (num <= 7) {
        //     this.getServiceText(this.serviceData);
        // }
      },
      getServiceText(data) {/*已定义后台消息框*/
        // let serviceText = data.robot.chat,
        // i = Math.floor(Math.random() * serviceText.length);
        this.createInfo('service',data);
      }
    }
  }
  </script>
  
  <style scoped>
    @import url(chat.scss);
  </style>
  