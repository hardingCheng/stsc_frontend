<template slot-scope="scope">
  <div>
    <el-table
        :data="virtualLabList">
      <el-table-column prop="leaderId" label="发起者" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="introduction" label="简介"></el-table-column>
      <el-table-column>
        <template v-slot="scope">
          <el-button @click="acceptInvited(scope.$index, scope.row)">接受</el-button>
          <el-button @click="rejectInvited(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "@/api/api";

export default {
  name: "MyMessages",
    data() {
      return {
        table: false,
        dialog: false,
        loading: false,
        virtualLabList: []
      };
    },

    methods: {
      resetForm()
      {
        this.virtualLabList=[];
      },
      getInvitedMessage() {
        this.table = true;

        this.getMessage().then((response)=>{
          console.log(response.data.virtualLabList);
          if(response.data.virtualLabList==undefined)
          {
            this.virtualLabList=[];
            return;
          }
          //将virtualLabList中一部分属性拿出来放到recieveInviteData中
          response.data.virtualLabList.map(((item,index)=>{
            this.virtualLabList.push(Object.assign({},{leaderId:item.leaderId,name:item.name,introduction:item.introduction,labId:item.id}))
          }));
        });
        console.log('recieveInviteData: '+this.virtualLabList);
      },
      getMessage() {
        return axios({
          url: '/ph/stcsp/virtuallab/virtualLabInvitedOrNot',
          method: 'get'
        });
      },
      acceptInvited(index,row)
      {
        console.log(index,row);
        this.acceptOrRejectInvited(row['labId'],'1').then((response)=>{
          console.log(response)
        });
      }
      ,
      rejectInvited(index,row)
      {
        console.log(index,row);
        this.acceptOrRejectInvited(row['labId'],'0').then((response)=>{
          console.log(response)
        });
      }
      ,
      acceptOrRejectInvited(id,acceptOrReject)
      {
        return axios({
          url : `/ph/stcsp/virtuallab/virtualLabInfo/${id}/${acceptOrReject}`,
          method:'post'
        });
      }
    }
}
</script>

<style scoped>

</style>