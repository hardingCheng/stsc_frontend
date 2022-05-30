<template>
  <div style="height: 800px;width: 100%">
    <div style="float: left;width: 50%;">
      <img :src="detailData.imgurl" style="width: 90%;height: 400px;margin-left: 10px;">
    </div>
    <div style="float: left;width: 50%;">
      <ul>
        <li>实验室名称：{{detailData.name}}</li>
      </ul>
      <div style="margin-top: 20px;">
        <li>实验室简介：<span>{{detailData.introduction}}</span></li>
      </div>
      <div style="height: 100px;margin-top: 20px;">
        <li>相关附件：<a :href="detailData.attachments">{{getAttachmentName}}</a></li>
      </div>
      <h2>任务列表</h2>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="value"
            label="服务"
            width="160"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="addService(scope.$index, tableData)">邀请</el-button>
            <el-drawer
                title="服务邀请"
                :append-to-body="true"
                :visible.sync="drawer"
                :before-close="handleClose">
              <el-input
                  placeholder="请输入内容"
                  style="float: left;width: 50%;margin-right: 20px;margin-left: 20px;"
                  v-model="keyWord"
                  clearable>
              </el-input>
              <el-button type="primary" @click="searchService()">搜索</el-button>
              <br/>
              <div class="services" v-for="i in serviceData" :key="i.id" >
                <img :src="i.avatar" style="width: 200px;height: 200px"/>
                <br><br>
                <span class="headName">{{i.username}}</span>
                <el-button style="margin-bottom: 20px;float: right" size="mini" type="primary" @click="inviteService(i.username)">邀请</el-button>
              </div>
            </el-drawer>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;">
        <el-button type="primary" @click="deleteVirtualLab">删除虚拟实验室</el-button>
        <el-button type="primary" style="float: right" @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "@/api/api";
  import store from "../../../store";
  import Axios from "axios" //原生axios
export default {
  name: "LabDetail",
  props: ['virtualLabName'],
  data() {
    return {
      keyWord: '',
      tableData: [],
      drawer: false,
      detailData: '',
      serviceData: '',
      saveLabName: '',//保存点击的虚拟实验室名称
      currentRow: '',//当前点击行的数据
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    //获取虚拟实验室详情
    getDetailData(virtualLabName){
      return axios({
        url:`/ph/stcsp/virtuallab/virtualLabInfo/${virtualLabName}`,
        method:'get'
      })
    },
    //表格-邀请服务
    addService(index, rows){
      this.drawer = true
      this.currentRow = rows[index]
      //console.log(this.currentRow)
    },
    //返回上一级
    goBack() {
      this.$router.back()
    },
    //查询服务商
    searchService() {
      let keyword = this.keyWord
      return axios({
        url:`/ph/stcsp/virtuallab/search/kw=${keyword}`,
        method:'get'
      }).then( response => {
        console.log(response.data);
        this.serviceData = response.data.vo
      }).catch(function (error){
        console.log(error);
      })
    },
    //邀请服务
    inviteService(invitedUsername) {
      let data = "virtualLabname=" + this.saveLabName + '&' + "invitedUsername=" + invitedUsername
      return Axios({   //原生axios，加上token
        url:`/ph/stcsp/virtuallab/invite`,
        method:'post',
        data,
        headers:{token: store.state.token},
      }).then( response => {
        let responseWord = ''
        if(response.data.success) {
          responseWord = response.data.message
          /*let i
          for (i in this.tableData){ //邀请成功后更新表格数据
            if(this.tableData[i].value == this.currentRow.value){
              this.tableData[i].service = invitedUsername
            }
          }*/
          //console.log(this.tableData)
        }else {
          responseWord = response.data.message
        }
        this.openMessageBox(responseWord)
      }).catch(function (error){
        console.log(error);
      })
    },
    //操作结果提醒
    openMessageBox(responseWord) {
      this.$alert(responseWord, '操作结果提示', {
        confirmButtonText: '确定',
        callback: action => {}
      });
    },
    //删除虚拟实验室
    deleteVirtualLab() {
      axios({
        url:`/ph/stcsp/virtuallab/del/${this.saveLabName}`,
        method:'delete'
      })
      this.$alert("删除成功", '操作结果提示', {
        confirmButtonText: '确定',
        callback: action => { location.reload() }
      });
    }
  },
  computed: {
    getAttachmentName() {
      let nameArr
      if(this.detailData.attachments){
        nameArr = this.detailData.attachments.split("_")
        return nameArr[1]
      }else {
        return "无"
      }
    }
  },
  mounted() {
    this.saveLabName = this.virtualLabName;
    // console.log(this.saveLabName);
    this.getDetailData(this.virtualLabName).then( response => {
      //console.log(response.data)
      this.detailData = response.data.virtualLab
      let returnTableData = JSON.parse(this.detailData.missions)
      let i
      for (i in returnTableData){
        this.tableData.push({value: returnTableData[i].value})
      }
      //console.log(this.tableData)
    }).catch(function (error){
      console.log(error);
    })
  }
}
</script>

<style scoped>
.services{
  margin-top: 40px;
  margin-left: 20px;
  float: left;
}
</style>